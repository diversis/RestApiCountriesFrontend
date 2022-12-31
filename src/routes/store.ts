import type { countryType } from '$lib/scripts/countryType';
import { writable as localWritable } from 'svelte-local-storage-store';
import { writable, type Writable } from 'svelte/store';

/**
 * Using local storage library for stores
 **/
export const countriesData: Writable<countryType[]> = localWritable('storedCountries', []);
export const storedAllAt: Writable<number> = localWritable('storedAllAt', 0);
export const theme: Writable<string> = localWritable('theme', 'dark');
export const currentRegion: Writable<string> = localWritable('currentRegion', '');
export const currentSearchData: Writable<countryType[]> = localWritable('currentSearchData', []);

/**
 * svelte stores
 **/
export const currentPage: Writable<number> = writable(0);
export const hasNext: Writable<boolean> = writable(true);
export const scrollPosition: Writable<number> = writable(0);
export const searchInputString: Writable<string> = writable('');
export const countryCanRender: Writable<boolean> = writable(false);
