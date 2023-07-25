import type { Color } from "$lib/color";

export interface Item{
    name: string;
    priceText: string;
    icon_url: string;
    colors: [Color];
}