import { get } from 'svelte/store';
import { hasMore, currentPage } from '../../routes/store';
import type { countryType } from './countryType';

export function getNextPage(array: countryType[]): countryType[] {
	const page: number = get(currentPage);

	// console.log(`\n--------------------\n page ${page} \n--------------------\n `);
	hasMore.set(page + 13 < array.length);

	return array.slice(page, page + 12);
}
