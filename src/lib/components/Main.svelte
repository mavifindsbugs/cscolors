<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import ItemView from "./ItemView.svelte";
    import { browser } from '$app/environment';

    import type {Item} from "$lib/item";
    import {supabase} from "$lib/subabaseClient";
    import InfiniteScroll from "./InfiniteScroll.svelte";
	import { onMount } from "svelte";

    let items: Item[] = []
    let search: string;
    let page = 0;
    let loaded = false;
    let moreItems = true;
    let sidebarHidden = true;

    let sidebarSelection: string = "";
    let selectedSort: string = "Color"
    let selectedOrder: string = "descending"


    onMount(() => {
        handleSearch("")
    })

    function convertToType(s: string) {
        switch (s){
            case "Skins": return "skin";
            case "Sticker": return "sticker";
            case "Graffiti": return "graffiti";
            case "All": return "";
            default: return "";
        }
    }

    function selectSidebar(s: string) {
        sidebarSelection = s
        handleSearch(search);
    }

    function handleSearch(s: string, sortOrder: boolean = true) {
        search = s
        page = 0;
        moreItems = true;
        getItems(search, false, convertToType(sidebarSelection), sortOrder);
        backToTop()
    }

    function fetchMoreItems(){
        if (moreItems) {
            page++;
            loaded = false;
            getItems(search, true, convertToType(sidebarSelection));
        }
    }

    function backToTop(){
        if (browser) {
            window.scrollTo(0,0)
        }
    }

    export async function getItems(search: string, append: boolean = false, category: string = "") {
        let {data, error} = await supabase.rpc("get_item_colors_v4",
            {search: `${search}`, page: page, search_category: category.toLowerCase(), sort_order: selectedOrder == "ascending", sort: selectedSort.toLowerCase()})
        if (error) {
            //console.log(error)
        } else if (data) {
            let res: [Item] = []
            data.forEach(entry => {
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
                        price: entry.price
                    }
                    res.push(item)
                }
            );

            if (append) {
                $: items = [...items, ...res];
                if(res.length < 20){
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
        let _ = selectedOrder + selectedSort
        handleSearch(search)
    }

</script>


<Navbar on:showSidebar={(e) => {sidebarHidden = !sidebarHidden}} on:search={(e) => {handleSearch(e.detail.text)}} bind:search></Navbar>
<Sidebar selection={sidebarSelection} bind:selectedSort bind:selectedOrder bind:sidebarHidden on:sidebarSelect={(e) => {selectSidebar(e.detail.text)}}></Sidebar>

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
        <div class="grid min-[1800px]:grid-cols-5 min-[1600px]:grid-cols-4 min-[1200px]:grid-cols-3 min-[950px]:grid-cols-2 grid-cols-1 gap-4 mb-4 m-auto justify-center ">
            <InfiniteScroll loaded={loaded} on:load={fetchMoreItems}></InfiniteScroll>
                {#await items}
                    waiting...
                {:then items}
                    {#each items as item (item)}
                        <ItemView on:color_click={(e) => {handleSearch(e.detail.text)}} item={item}></ItemView>
                    {/each}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
        </div>
    </div>
    </div>
    <button on:click={backToTop} class="fixed bottom-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clip-rule="evenodd" />
        </svg>       
    </button>
</div>
