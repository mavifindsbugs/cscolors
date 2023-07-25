<script lang="ts">
    import type {Item} from "$lib/item.ts"
    export let item : [Item];
</script>

<div>
    <div class="h-96 max-w-full rounded-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img class="p-8" width="250" height="250" src={item.icon_url} alt="product" />
        <div class="ml-3">
            <h5 class="text-base font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
            <div class="align-bottom">
                <div class="flex items-center mt-2.5 mb-5">
                    {#each item.colors as color, i }
                        <div key={i}>
                            <svg width="20" height="20">
                                <rect width="20" height="20" stroke-width="3" style="fill: {color.hex}; stroke: rgb(0,0,0)" />
                            </svg>
                            <span class="ml-1 text-xs font-bold text-gray-900 dark:text-white">{color.count}</span>
                        </div>
                    {/each}
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-gray-900 dark:text-white">$599</span>
                </div>
            </div>
        </div>
    </div>
</div>