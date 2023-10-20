<script lang="ts">
	import Footer from "./Footer.svelte";
    import SidebarEntry from "$lib/components/SidebarEntry.svelte";
	import SkinsIcon from "$lib/icons/SkinsIcon.svelte";
	import StickerIcon from "$lib/icons/StickerIcon.svelte";
	import GraffitiIcon from "$lib/icons/GraffitiIcon.svelte";
	import AllIcon from "$lib/icons/AllIcon.svelte";

    export let sidebarHidden: boolean;
    export let selection: string;

    export let selectedSort: string;
	let sortOptions = [
		'Color',
		'Price',
		'Name'
	]

    export let selectedOrder: string;
	let orderOptions = [
		'descending',
		'ascending'
	]

</script>

<aside class="fixed top-0 left-0 z-40 w-48 h-full pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" class:-translate-x-full={sidebarHidden} class:transform-none={!sidebarHidden}>
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
            <SidebarEntry on:sidebarSelect name="All" icon={AllIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Skins" icon={SkinsIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Sticker" icon={StickerIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Graffiti" icon={GraffitiIcon} selection={selection}></SidebarEntry>
        </ul>
        <div class="m-2 mt-8">
            <label for="sort" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Sort By</label>
            <select bind:value={selectedSort} id="sort" class="block w-full p-1 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each sortOptions as value}
                <option {value}>{value}</option>
            {/each}
            </select>
            <label for="order" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Order</label>
            <select bind:value={selectedOrder} id="order" class="block w-full p-1 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each orderOptions as value}
                <option {value}>{value}</option>
            {/each}
            </select>
            
        </div>
        <div class="absolute bottom-2 w-10/12">
            <Footer></Footer>
        </div>
    </div>
</aside>