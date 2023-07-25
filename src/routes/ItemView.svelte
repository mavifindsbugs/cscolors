<script lang="ts">
    import type {Item} from "$lib/item.ts"
    export let item : [Item];

    function rarityToColor(rarity: string) {
        switch(rarity){
            case "Covert":
                return "#eb3636"
            case "Classified":
                return "#d31ee0"
            case "Mil-Spec Grade":
                return "#332cf5"
            case "Restricted":
                return "#8e44e2"
            case "Industrial Grade":
                return  "#7194d9"
            case "Extraordinary":
                return "#eb3636"
            case "Exotic":
                return "#d31ee0"
            case "Remarkable":
                return "#8e44e2"
            case "High Grade":
                return "#332cf5"
            default:
                return "#ed9a15"
        }
    }
</script>

<div>
    <div class="h-96 max-w-full rounded-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img class="p-8" width="250" height="250" src={item.icon_url} alt="product" />
        <div class="ml-3">
            <h5 class="text-base font-semibold tracking-tight text-gray-900 dark:text-white" style="color: {rarityToColor(item.rarity)}">{item.name}</h5>
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
                {#if item.type === "skin"}
                    <div class="">
                        <div class="mb-1 text-base font-medium dark:text-white">Float</div>
                        <div class="relative w-full bg-gray-200 h-3.5 mb-4 dark:bg-gray-700 w-56">
                            <div class="bg-gray-600 h-3.5 dark:bg-gray-300" style="left: {item.minFloat}%; width: {item.maxFloat - item.minFloat}%">
                                <span class="absolute text-xs text-white dark:text-gray-900" style="left: {item.minFloat}%">{item.minFloat}</span>
                                <span class="absolute  text-xs text-white dark:text-gray-900" style="left: {item.maxFloat - item.minFloat - 8}%">{item.maxFloat}</span>
                                <div class="bg-gray-200 h-3.5 dark:bg-gray-700" style="width: {item.minFloat}%"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>