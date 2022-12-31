import { get } from 'svelte/store';
import { hasNext, currentPage } from '../../routes/store';
import type { countryType } from './countryType';

export function getNextPage(array: countryType[]): countryType[] {
	const page: number = get(currentPage);

	hasNext.set(page * 12 + 12 < array.length);

	return array.slice(page * 12, page * 12 + 12);
}
