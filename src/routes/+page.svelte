<script lang="ts">
import Main from "$lib/components/Main.svelte";
</script>

<style>
    :global(body) {
        background-color: rgb(243 244 246);
    }
    :global(body.dark) {
        background-color: rgb(17 24 39);
    }
</style>


<div class="bg-gray-100 dark:bg-gray-900 h-screen w-full">
    <Main></Main>
</div>