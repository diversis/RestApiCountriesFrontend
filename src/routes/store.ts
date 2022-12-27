import { writable as localWritable } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';
/**
 * Using local storage library for stores
 **/
export const countriesData = localWritable('storedCountries', []);
export const storedAllAt = localWritable('storedAllAt', 0);
export const theme = localWritable('theme', 'dark');
export const previousPage = localWritable('previousPage', ['/']);
export const nextPage = localWritable('nextPage', ['/']);

/**
 * svelte stores
 **/
export const currentPage = writable(0);
export const hasMore = writable(true);
export const currentSearchArray = writable([]);
export const scrollPosition = writable(0);
export const searchInputString = writable('');
export const regionSearchArray = writable([]);
