<script lang="ts">
import logo from "$lib/assets/icon.png";
import { createEventDispatcher } from "svelte";
import DarkModeButton from "./DarkModeButton.svelte";
import SearchBar from "./SearchBar.svelte";

export let search;

const dispatch = createEventDispatcher();
function showSidebar() {
    dispatch('showSidebar');
}

</script>

<nav class="fixed w-full top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 data-sveltekit-reload">
    <div class="px-3 py-2 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
                <button type="button" on:click={showSidebar} class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <a href="/" class="flex ml-2 sm:mr-24 mr-10">
                    <img src={logo} class="h-6 mr-2 sm:h-8 sm:mr-3" alt="CS Colors Logo" />
                    <span class="self-center text-base font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CS Colors</span>
                </a>
            </div>
        <div class="w-full">
            <SearchBar on:search bind:search></SearchBar>
        </div>
        <div>
            <DarkModeButton></DarkModeButton>
        </div>
        </div>
    </div>
</nav>