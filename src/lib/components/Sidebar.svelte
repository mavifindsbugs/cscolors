<script lang="ts">
	import Footer from "./Footer.svelte";
    import SidebarEntry from "$lib/components/SidebarEntry.svelte";
	import SkinsIcon from "$lib/icons/SkinsIcon.svelte";
	import StickerIcon from "$lib/icons/StickerIcon.svelte";
	import GraffitiIcon from "$lib/icons/GraffitiIcon.svelte";
	import AllIcon from "$lib/icons/AllIcon.svelte";
	import CasesIcon from "$lib/icons/CasesIcon.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let sidebarHidden: boolean;
    export let selection: string;
    export let selectedVariant: string;

    let casesExpanded: boolean = false;

    export let selectedSort: string;
    
    let previousSelection: string = "";
    
    $: if (selection !== "Crates") {
        casesExpanded = false;
    }
    
    $: {
        if (selection === "Crates" && previousSelection !== "Crates" && !crateSortOptions.includes(selectedSort)) {
            selectedSort = "Name";
        }
        previousSelection = selection;
    }
    
	let sortOptions = [
		'Color',
		'Price',
		'Name',
        'Color Match',
        'Rarity'
	]

    let crateSortOptions = [
        'Name',
        'Price'
    ]

    $: availableSortOptions = selection === "Crates" ? crateSortOptions : sortOptions;

    export let selectedOrder: string;
	let orderOptions = [
		'descending',
		'ascending'
	]

    let variantOptions = [
        { value: "", label: "All" },
        { value: "Case", label: "Case" },
        { value: "Patch Capsule", label: "Patch Capsule" },
        { value: "Souvenir", label: "Souvenir" },
        { value: "Autograph Capsule", label: "Autograph Capsule" },
        { value: "Graffiti", label: "Graffiti" },
        { value: "Pins", label: "Pins" },
        { value: "Souvenir Highlight", label: "Souvenir Highlight" },
        { value: "Music Kit Box", label: "Music Kit Box" },
        { value: "Sticker Capsule", label: "Sticker Capsule" }
    ]

    function toggleCasesExpanded() {
        casesExpanded = !casesExpanded;
    }

    function handleVariantClick(value: string) {
        selectedVariant = value;
        dispatch('variantSelect');
    }

</script>

<aside class="fixed top-0 left-0 z-40 w-48 h-full pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" class:-translate-x-full={sidebarHidden} class:transform-none={!sidebarHidden}>
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
            <SidebarEntry on:sidebarSelect name="All" icon={AllIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Skins" icon={SkinsIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Sticker" icon={StickerIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect name="Graffiti" icon={GraffitiIcon} selection={selection}></SidebarEntry>
            <SidebarEntry on:sidebarSelect on:toggleExpand={toggleCasesExpanded} name="Crates" icon={CasesIcon} selection={selection} expandable={true} expanded={casesExpanded}></SidebarEntry>
            
            {#if casesExpanded}
                <li class="ml-6">
                    {#each variantOptions as variant}
                        <button 
                            class="flex items-center p-2 pl-4 text-sm text-gray-700 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            class:bg-gray-200={selection === "Crates" && selectedVariant === variant.value}
                            class:dark:bg-gray-600={selection === "Crates" && selectedVariant === variant.value}
                            on:click={() => handleVariantClick(variant.value)}>
                            <span class="ml-2">{variant.label}</span>
                        </button>
                    {/each}
                </li>
            {/if}
        </ul>
        <div class="m-2 mt-8">
            <label for="sort" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Sort By</label>
            <select bind:value={selectedSort} id="sort" class="block w-full p-1 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each availableSortOptions as value}
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