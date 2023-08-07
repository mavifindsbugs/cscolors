<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import type {Item} from "$lib/item.ts"

    export let item : Item;

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
            case "Extraordinary":
                return "#eb3636"
            case "Exotic":
                return "#d31ee0"
            case "Remarkable":
                return "#8e44e2"
            case "High Grade":
                return "#332cf5"
            default:
                return "#ed9a15"
        }
    }

    function colorClicked(color: string){
        dispatch("color_click", {
            text: color
        });
    }
</script>


<div class="w-72 h-56 relative p-8 justify-center justify-self-center mx-auto">
    <div class="w-72 h-56 left-0 top-0 absolute bg-white dark:bg-gray-700 rounded"></div>
    <div class="w-64 h-8 left-[10px] top-[162px] absolute text-sm font-semibold" style="color: {rarityToColor(item.rarity)}">{item.rarity}</div>
    <div class="w-48 h-8 left-[10px] top-[180px] absolute text-sm font-semibold text-gray-900 rounded-lg dark:text-white">{item.name}</div>
    {#if item.price != null}
    <div class="w-32 h-8 left-[150px] top-[180px] absolute text-sm rounded-lg dark:text-green-300 text-right font-medium text-green-500">{item.price.toFixed(2)}$</div>
    {/if}
    <img class="w-55 h-40 left-[14px] top-[4px] absolute rounded transition hover:scale-110 active:scale-[2] active:z-50 duration-100" src={item.icon_url} alt="icon" />
   
    <div class="w-4 h-44 left-[268px] top-[14px] absolute flex-col justify-start items-start gap-px inline-flex">
        {#each item.colors as color, i }
        <div class="group">
            <div class="w-auto h-4 right-5 absolute text-xs font-extralight text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white hidden group-hover:block">{color.name}</div>
            <div class="w-4 h-4 shadow border dark:border-gray-700 hover:scale-110 duration-75" role="button" style="background: {color.hex}" on:click={colorClicked(color.name)}></div>
        </div>
        {/each}
    </div>
    
</div>  