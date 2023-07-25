<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { browser } from '$app/environment';

    let y;
    let height;
    export let loaded;

    const dispatch = createEventDispatcher();

    $: {
        if (browser){

            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            console.log(y + " " + scrollHeight + " " + clientHeight)

            if (y + clientHeight >= scrollHeight - 400 && scrollHeight != clientHeight) {
                if(loaded){
                    dispatch("load");
                }
            }
        }
    }
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={height} />