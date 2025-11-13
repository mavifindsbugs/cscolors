<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let name: string = "";
    export let icon: any;
    export let selection: string = "";
    export let expandable: boolean = false;
    export let expanded: boolean = false;

    const dispatch = createEventDispatcher();
    function select() {
        if (expandable) {
            dispatch('toggleExpand');
        }
        dispatch('sidebarSelect', {
            text: name
        });
    }
</script>


<li>
    <button class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
        class:bg-gray-100={selection==name}
        class:dark:bg-gray-700={selection==name}
        on:click={select}>

        <svelte:component this={icon}/>
        <span class="flex-1 ml-3 whitespace-nowrap">{name}</span>
        {#if expandable}
            <svg class="w-4 h-4 transition-transform" class:rotate-180={expanded} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        {/if}
    </button>
</li>