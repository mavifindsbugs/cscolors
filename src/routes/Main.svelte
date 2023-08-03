<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import SearchBar from "./SearchBar.svelte";
    import ItemView from "./ItemView.svelte";

    import type {Item} from "$lib/item";
    import {supabase} from "$lib/subabaseClient";
    import InfiniteScroll from "./InfiniteScroll.svelte";

    let items: Item[] = []
    let search: string;
    let page = 0;
    let loaded = false;
    let moreItems = true;

    function handleSearch(event: CustomEvent) {
        search = event.detail.text;
        page = 0;
        moreItems = true;
        getItems(search);
    }

    function fetchMoreItems(){
        console.log(page)
        if (moreItems) {
            page++;
            loaded = false;
            addItems(search);
        }
    }

    export async function addItems(search: string) {
        if (search === "") {
            search = "skin"
        }
        search = search.replaceAll(" ", ":*&")
        let {data, error} = await supabase.rpc("get_item_colors_v2",
            {search: `${search}:*`, page: page})

        if (error) {
            console.log(error)
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
                        stattrak: entry.stattrak
                    }
                    res.push(item)
                }
            );

            $: items = [...items, ...res];
            if(res.length < 20){
                moreItems = false;
            }
            loaded = true;
        }
    }

    export async function getItems(search: string) {
        if (search === "") {
            search = "skin"
        }
        search = search.replaceAll(" ", ":*&")
        let {data, error} = await supabase.rpc("get_item_colors_v2",
            {search: `${search}:*`, page: page})

        if (error) {
            console.log(error)
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
                        stattrak: entry.stattrak
                    }
                    res.push(item)
                }
            );

            items = res;
            loaded = true;
        }
    }
</script>


<Navbar></Navbar>
<Sidebar></Sidebar>

<div class="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <SearchBar on:search={handleSearch} items={items}></SearchBar>
        <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mb-4">
            <InfiniteScroll loaded={loaded} on:load={fetchMoreItems}></InfiniteScroll>
            {#await items}
                waiting...
            {:then items}
                {#each items as item (item)}
                    <ItemView item={item}></ItemView>
                {/each}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    </div>
</div>
