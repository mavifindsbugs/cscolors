<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import ItemView from "./ItemView.svelte";
    import { browser } from '$app/environment';

    import type {Item, Crate} from "$lib/item";
    import {supabase} from "$lib/subabaseClient";
    import InfiniteScroll from "./InfiniteScroll.svelte";
	import { onMount } from "svelte";

    let items: (Item | Crate)[] = []
    let search: string;
    let page = 0;
    let loaded = false;
    let moreItems = true;
    let sidebarHidden = true;

    let sidebarSelection: string = "";
    let selectedSort: string = "Color"
    let selectedOrder: string = "descending"
    let selectedVariant: string = "";


    onMount(() => {
        handleSearch("")
    })

    function convertToType(s: string) {
        switch (s){
            case "Skins": return "skin";
            case "Sticker": return "sticker";
            case "Graffiti": return "graffiti";
            case "Crates": return "cases";
            case "All": return "";
            default: return "";
        }
    }

    function selectSidebar(s: string) {
        if (s === "Crates") {
            // Don't change selection or trigger search when just opening Crates
            return;
        }
        sidebarSelection = s
        selectedVariant = "";
        handleSearch(search);
    }

    function selectVariant() {
        sidebarSelection = "Crates";
        search = "";
        handleSearch(search);
    }

    function handleCrateClick(crate: Crate) {
        sidebarSelection = "All";
        let wasCase = selectedVariant === "Case";
        selectedVariant = "";
        // Set sort to rarity when clicking on a crate
        selectedSort = "Rarity";
        selectedOrder = "descending";
        // Remove special characters and CS:GO prefix that might break the search
        let cleanName = crate.name.replace(/CS:GO\s*/g, '').replace(/[|:&]/g, '').trim();
        if (wasCase) {
            search = cleanName + " !knives";
        } else {
            search = cleanName;
        }
    }

    function handleSearch(s: string) {
        search = s
        page = 0;
        moreItems = true;
        if (sidebarSelection === "Crates") {
            getCrates(search, false, selectedVariant);
        } else {
            getItems(search, false, convertToType(sidebarSelection));
        }
        backToTop()
    }

    function fetchMoreItems(){
        if (moreItems) {
            page++;
            loaded = false;
            if (sidebarSelection === "Crates") {
                getCrates(search, true, selectedVariant);
            } else {
                getItems(search, true, convertToType(sidebarSelection));
            }
        }
    }

    function backToTop(){
        if (browser) {
            window.scrollTo(0,0)
        }
    }

    async function getCrates(search: string, append: boolean = false, variant: string = "") {
        let {data, error} = await supabase.rpc("get_crates_v3",
            {search: `${search}`, variant_input: variant, page: page, sort_order: selectedOrder == "ascending", sort: selectedSort.toLowerCase()})
        if (error) {
            console.log(error)
        } else if (data) {
            let res: Crate[] = []
            data.forEach((entry: any) => {
                    let crate: Crate = {
                        name: entry.name,
                        icon_url: entry.icon_url,
                        variant: entry.variant,
                        price: entry.price
                    }
                    res.push(crate)
                }
            );

            if (append) {
                items = [...items, ...res];
                if(res.length < 25){
                    moreItems = false;
                }
            }
            else {
                items = res;
            }
            loaded = true;
        }
    }

    export async function getItems(search: string, append: boolean = false, category: string = "") {
        let {data, error} = await supabase.rpc("get_item_colors_v5",
            {search: `${search}`, page: page, search_category: category.toLowerCase(), sort_order: selectedOrder == "ascending", sort: selectedSort.toLowerCase()})
        if (error) {
            //console.log(error)
        } else if (data) {
            let res: Item[] = []
            data.forEach((entry: any) => {
                    let item: Item = {
                        name: entry.name,
                        priceText: entry.priceText,
                        icon_url: entry.icon_url,
                        colors: entry.colors,
                        type: entry.type,
                        category: entry.category,
                        minFloat: entry.min_float,
                        maxFloat: entry.max_float,
                        rarity: entry.rarity,
                        stattrak: entry.stattrak,
                        souvenir: entry.souvenir,
                        price: entry.price
                    }
                    res.push(item)
                }
            );

            if (append) {
                items = [...items, ...res];
                if(res.length < 25){
                    moreItems = false;
                }
            }
            else {
                items = res;
            }
            loaded = true;
        }
    }

    $:  {
        let _ = selectedOrder + selectedSort + selectedVariant + search
        if(search != undefined){
            handleSearch(search);
        }
    }

</script>


<svelte:head>
	<title>CS Colors</title>
</svelte:head>

<Navbar on:showSidebar={(e) => {sidebarHidden = !sidebarHidden}} on:search={(e) => {handleSearch(e.detail.text)}} bind:search></Navbar>
<Sidebar selection={sidebarSelection} bind:selectedSort bind:selectedOrder bind:selectedVariant bind:sidebarHidden on:sidebarSelect={(e) => {selectSidebar(e.detail.text)}} on:variantSelect={selectVariant}></Sidebar>

{#if !sidebarHidden}
    <div class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30" on:click={e => {sidebarHidden=true}}></div>
{/if}

<div class="p-4 sm:ml-48 bg-gray-100 dark:bg-gray-900">
    <div class="mt-16 w-full grid place-items-center">
        <div class="w-10/12">
        </div>
    </div>
    <div class="w-full grid place-items-center">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div class="grid min-[3400px]:grid-cols-8 min-[3000px]:grid-cols-7 min-[2600px]:grid-cols-7 min-[2200px]:grid-cols-6 min-[1800px]:grid-cols-5 min-[1600px]:grid-cols-4 min-[1200px]:grid-cols-3 min-[950px]:grid-cols-2 grid-cols-1 gap-4 mb-4 m-auto justify-center ">
            <InfiniteScroll loaded={loaded} on:load={fetchMoreItems}></InfiniteScroll>
                {#await items}
                    waiting...
                {:then items}
                    {#each items as item (item)}
                        <ItemView on:color_click={(e) => {handleSearch(e.detail.text)}} on:crate_click={(e) => {handleCrateClick(e.detail.crate)}} item={item}></ItemView>
                    {/each}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
        </div>
    </div>
        <button on:click={fetchMoreItems} class="bottom-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
            <p>LOAD MORE ... </p>
        </button>
    </div>
    <button on:click={backToTop} class="fixed bottom-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clip-rule="evenodd" />
        </svg>       
    </button>
</div>
