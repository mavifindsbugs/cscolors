<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let search = "";

const dispatch = createEventDispatcher();
function updateSearch() {
    dispatch('search', {
        text: search
    });
}
</script>

<div class="relative mr-2 sm:mr-12">
    <form on:submit={updateSearch}>

    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    <span class="sr-only">Search icon</span>
    </div>
    <input type="text" id="search-navbar" class="p-1 sm:p-2 pl-8 sm:pl-8 text-base w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
    bind:value={search}
    on:input={updateSearch}>
</form>
</div>