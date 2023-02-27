import type { borderType, countryType } from './countryType';
import { countriesData, currentRegion, hasNext, storedAllAt } from '../../routes/store';
import { get } from 'svelte/store';
import { expired } from './expiration';
import { getNextPage } from './pagination';
import { fetchAll, fetchCountry } from './countryFetch';
import { filterCountryByName } from './countryFilter';
import { getCountryFromLocalStorage } from './countryLocalStorage';
import debounce from 'lodash.debounce';

const debouncedFetchAll = debounce(() => fetchAll(), 1000);

export async function searchCountires(
	searchString: string | undefined
): Promise<countryType[] | []> {
	if (!get(hasNext)) {
		return [];
	}
	const storedDate: number = +get(storedAllAt);

	if (!storedDate || expired(storedDate)) {
		let fetchArray: countryType[] | [] | undefined = await debouncedFetchAll();
		// console.log('outside ', fetchArray);
		if (Array.isArray(fetchArray) && fetchArray.length > 1) {
			countriesData.set([...fetchArray]);

			storedAllAt.set(Date.now());
		} else {
			console.log(fetchArray);
		}
	}
	let searchArray: countryType[] = [];
	const region: string = get(currentRegion);
	if (region) {
		const regionArray: countryType[] = get(countriesData).filter(
			(country: countryType): boolean => country?.region?.toLowerCase() === region.toLowerCase()
		);
		searchArray = regionArray;
	} else {
		searchArray = get(countriesData);
	}
	if (searchString) {
		searchArray = filterCountryByName(searchArray, searchString);
	}
	return getNextPage(searchArray);
}

export async function getCountry(countryCode: string): Promise<countryType | null> {
	const dataFromLocalStorage: countryType | null = getCountryFromLocalStorage(countryCode);
	if (dataFromLocalStorage) {
		return dataFromLocalStorage;
	}

	const countryData: countryType | null = await fetchCountry(countryCode);
	if (countryData) {
		countryData.createdAt = Date.now();
	}

	countriesData.update((data: countryType[]): countryType[] => {
		data.push(countryData as countryType);
		return data;
	});

	return countryData;
}

export async function getBorders(bordersCodes: []): Promise<borderType[]> {
	const borders: borderType[] = [];
	await Promise.all(
		bordersCodes.map(async (border): Promise<void> => {
			const borderData: countryType | null = await getCountry(border);
			if (borderData) {
				borders.push({ cca3: border, name: borderData?.name?.common as string | '' });
			}
		})
	);
	return borders;
}
