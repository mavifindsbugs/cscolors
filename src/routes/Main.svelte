<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import SearchBar from "./SearchBar.svelte";
    import ItemView from "./ItemView.svelte";

    import type {Item} from "$lib/item";
    import {supabase} from "$lib/subabaseClient";

    let items = []

    function handleSearch(event) {
        get_items(event.detail.text);
    }

    export async function get_items(search) {
        if (search === "") {
            search = "skin"
        }
        search = search.replaceAll(" ", ":*&")
        let {data, error} = await supabase.rpc("get_item_colors_simplified",
            {search: `${search}:*`, page: 0})

        if (error) {
            console.log(error)
        } else if (data) {
            let res: [Item] = []
            data.forEach(entry => {
                    let item: Item = {
                        name: entry.name,
                        priceText: entry.priceText,
                        icon_url: entry.icon_url,
                        colors: entry.colors
                    }
                    res.push(item)
                }
            );

            items = res;
        }
    }
</script>


<Navbar></Navbar>
<Sidebar></Sidebar>

<div class="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <SearchBar on:search={handleSearch} items={items}></SearchBar>
        <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mb-4">
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
