import type { Color } from "$lib/color";

export interface Item{
    name: string;
    priceText: string;
    icon_url: string;
    colors: [Color];
    type: string;
    category: string;
    minFloat: number;
    maxFloat: number;
    rarity: string;
    stattrak: boolean;
    souvenir: boolean;
    price: number;
    prices?: Price[];
}

export interface Crate{
    name: string;
    icon_url: string;
    variant?: string;
    price?: number;
}

export interface Price{
    name: string,
    condition: string;
    souvenir: boolean;
    stattrak: boolean;
    value: number;
}