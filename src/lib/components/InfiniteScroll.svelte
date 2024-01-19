<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { browser } from '$app/environment';

    let y: number;
    let height: number;
    let threshold: number = 600;
    export let loaded: boolean;

    const dispatch = createEventDispatcher();

    $: {
        if (browser){

            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            // console.log(y + " " + scrollHeight + " " + clientHeight)

            if (y + clientHeight >= scrollHeight - threshold && scrollHeight != clientHeight) {
                if(loaded){
                    dispatch("load");
                }
            }
        }
    }
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={height} />