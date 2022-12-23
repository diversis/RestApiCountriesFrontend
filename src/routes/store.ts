import { writable } from 'svelte-local-storage-store';
/**
 * Using local storage library for stores
 **/
export const countriesData = writable('storedCountries', []);
export const storedAllAt = writable('storedAllAt', 0);
export const theme = writable('theme', 'dark');
export const previousPage = writable('previousPage', ['/']);
export const nextPage = writable('nextPage', ['/']);
