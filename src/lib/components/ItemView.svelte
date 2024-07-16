<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type {Item} from "$lib/item.ts"

    import {supabase} from "$lib/subabaseClient";
    import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';

    export let item : Item;

    let additionalInfoMode: boolean = false;

    const dispatch = createEventDispatcher();


    function rarityToColor(rarity: string) {
        switch(rarity){
            case "Covert":
                return "#eb3636"
            case "Classified":
                return "#d31ee0"
            case "Mil-Spec Grade":
                return "#332cf5"
            case "Restricted":
                return "#8e44e2"
            case "Industrial Grade":
                return  "#7194d9"
            case "Consumer Grade":
                return "#94a5b3"
            case "Extraordinary":
                return "#eb3636"
            case "Exotic":
                return "#d31ee0"
            case "Remarkable":
                return "#8e44e2"
            case "High Grade":
                return "#332cf5"
            case "Base Grade":
                return "#7194d9"
            default:
                return "#ed9a15"
        }
    }

    const conditionOrder = [
        "Factory New",
        "Minimal Wear",
        "Field-Tested",
        "Well-Worn",
        "Battle-Scarred"
    ];

    // Create a mapping from term to its position in the order array
    const orderMap = new Map(conditionOrder.map((term, index) => [term, index]));

    // Custom comparator function
    const comparator = (a, b) => {
        // Find the terms in the items
        const termA = conditionOrder.find(term => a.condition.includes(term));
        const termB = conditionOrder.find(term => b.condition.includes(term));

        // Compare the positions of the terms in the order array
        return orderMap.get(termA) - orderMap.get(termB);
    };

    function colorClicked(color: string){
        dispatch("color_click", {
            text: color
        });
    }

    function showAdditionalInfo(){
        item.prices = getPrices(item);
        additionalInfoMode = true;
    }

    function hideAdditionalInfo(){
        additionalInfoMode = false;
    }

    export async function getPrices(item: Item) {
        let name = item.name.replace("★ ", "")
        let {data, error} = await supabase.rpc("get_item_prices_v1", {search: name})
        if (error) {
            console.log(error)
        } else if (data) {
            let res: [Price] = []
            data.forEach(entry => {
                let condition = "Default";
                if(entry.name.includes("(")){
                    console.log(name)
                    condition = entry.name.split("(")[1].split(")")[0];
                }
                let price: Price = {
                    name: entry.name,
                    condition: condition,
                    souvernir: entry.name.includes("Souvenir"),
                    stattrak: entry.name.includes("StatTrak"),
                    value: entry.price
                }
                res.push(price)
              }
            );
            return res.sort(comparator);
        }
    }
</script>

{#if additionalInfoMode}
    <div class="w-72 h-56 relative p-8 justify-center justify-self-center mx-auto">
        <div class="w-72 h-56 left-0 top-0 absolute bg-white dark:bg-gray-700 rounded"></div>
        <div class="w-64 h-8 left-[10px] top-[8px] absolute text-sm font-semibold" style="color: {rarityToColor(item.rarity)}">{item.rarity}</div>
        <a href={"https://steamcommunity.com/market/search?appid=730&q=" + item.name} class="w-40 h-8 left-[10px] top-[24px] absolute text-sm font-semibold text-gray-900 rounded-lg dark:text-white">{item.name}</a>
        <img class="w-25 h-20 left-[180px] bottom-[140px] absolute rounded" src={item.icon_url} alt="icon" />

        <button type="button" on:click={hideAdditionalInfo(item.name)}>
            <MagnifyingGlass></MagnifyingGlass>
        </button>

        {#if item.type === "skin"}

            <div class="absolute left-[10px] top-[100px] bg-gray-200 h-3.5 mb-4 dark:bg-gray-300 w-20">
                    <div class="bg-green-600 border-2 h-3.5" style="left: {item.minFloat}%; width: {item.maxFloat - item.minFloat}%">
                        <span class="absolute -top-[16px] text-xs text-black dark:text-white" style="left: {item.minFloat}%">{item.minFloat}</span>
                        <span class="absolute -top-[16px] text-xs text-black dark:text-white" style="left: {item.maxFloat - item.minFloat}%">{item.maxFloat}</span>
                        <div class="bg-gray-200 h-3.5 dark:bg-gray-300" style="width: {item.minFloat}%"></div>
                    </div>
            </div>
            <!--<span class="w-16 h-8 left-[10px] top-[80px] absolute text-sm font-semibold text-black dark:text-white">Float</span>-->
        {/if}

        {#if item.type == "skin" && item.category != "Gloves"}
            {#if item.stattrak}
                <span class="w-16 h-8 left-[10px] top-[130px] absolute text-sm font-semibold text-red-600">StatTrak™</span>
            {:else}
                <span class="w-16 h-8 left-[10px] top-[130px] absolute text-sm font-semibold text-gray-400 dark:text-gray-300 line-through">StatTrak™</span>
            {/if}

            {#if item.souvenir}
                <span class="w-16 h-8 left-[10px] top-[150px] absolute text-sm font-semibold text-yellow-400 dark:text-yellow-300">Souvenir</span>
            {:else}
                <span class="w-16 h-8 left-[10px] top-[150px] absolute text-sm font-semibold text-gray-400 dark:text-gray-300 line-through">Souvenir</span>
            {/if}
        {/if}

        {#await item.prices}
            <p>awaiting...</p>
        {:then prices}
            {#each prices.filter(i => !i.souvernir && !i.stattrak) as price, i (price.name) }
                {#if i <= 4}
                    <div class="group">
                        <p>{i}</p>
                        <div class="w-48 ml-14 h-0 absolute text-sm font-semibold text-right text-gray-900 rounded-lg dark:text-white">{price.condition}:
                            <span class="rounded-lg dark:text-green-300 font-medium text-green-500">{price.value.toFixed(2)}$</span>
                        </div>
                    </div>
                {/if}
            {/each}
        {:catch error}
            <p>error</p>
        {/await}

    </div>
{:else}
    <div class="w-72 h-56 relative p-8 justify-center justify-self-center mx-auto">
        <div class="w-72 h-56 left-0 top-0 absolute bg-white dark:bg-gray-700 rounded"></div>
        <div class="w-64 h-8 left-[10px] top-[162px] absolute text-sm font-semibold" style="color: {rarityToColor(item.rarity)}">{item.rarity}</div>
        <a href={"https://steamcommunity.com/market/search?appid=730&q=" + item.name} class="w-48 h-8 left-[10px] top-[180px] absolute text-sm font-semibold text-gray-900 rounded-lg dark:text-white">{item.name}</a>
        {#if item.price != null}
            <div class="w-32 h-8 left-[155px] top-[180px] absolute text-sm rounded-lg dark:text-green-300 text-right font-medium text-green-500">
                <span>{item.price.toFixed(2)}$</span>
            </div>
        {/if}
        <img class="w-55 h-40 left-[14px] top-[4px] absolute rounded transition hover:scale-110 active:scale-[2] active:z-50 duration-100" src={item.icon_url} alt="icon" />


        <button type="button" on:click={showAdditionalInfo(item.name)}>
            <MagnifyingGlass></MagnifyingGlass>
        </button>

        <div class="w-4 h-44 left-[268px] top-[14px] absolute flex-col justify-start items-start gap-px inline-flex">
            {#each item.colors as color, i }
                <div class="group">
                    <div class="w-auto h-4 right-5 absolute text-xs font-extralight text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white hidden group-hover:block">{color.name}</div>
                    <div class="w-4 h-4 shadow border dark:border-gray-700 hover:scale-110 duration-75" role="button" style="background: {color.hex}" on:click={colorClicked(color.name)}></div>
                </div>
            {/each}
        </div>
    </div>
{/if}
