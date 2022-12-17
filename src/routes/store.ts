import { writable } from 'svelte-local-storage-store';
/**
 * Using local storage library for stores
 **/
export const countriesData = writable('storedCountries', []);
export const regionsData = writable('storedCountries', []);
export const theme = writable('theme', 'dark');
export const previousPage = writable('previousPage', ['/']);
export const nextPage = writable('nextPage', ['/']);
