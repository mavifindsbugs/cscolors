<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let name: string = "";
    export let icon: any;
    export let selection: string = "";

    const dispatch = createEventDispatcher();
    function select() {
        dispatch('sidebarSelect', {
            text: name
        });
}
</script>


<li>
    <button href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
        class:bg-gray-100={selection==name}
        class:dark:bg-gray-700={selection==name}
        on:click={select}>

        <svelte:component this={icon}/>
        <span class="flex-1 ml-3 whitespace-nowrap">{name}</span>
    </button>
</li>