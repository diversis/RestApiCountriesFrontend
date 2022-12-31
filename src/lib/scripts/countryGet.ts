import type { borderType, countryType } from './countryType';
import { countriesData, storedAllAt } from '../../routes/store';
import { get } from 'svelte/store';
import { notExpired } from './expiration';
import { getNextPage } from './pagination';
import { fetchAll, fetchCountry, fetchRegion } from './countryFetch';
import { filterCountryByName } from './countryFilter';
import { getCountryFromLocalStorage } from './countryLocalStorage';

export async function searchCountires(
	searchString: string | undefined,
	region: string | undefined
): Promise<countryType | []> {
	let searchArray: countryType[] = [];
	let fetchArray: countryType[] | [] = [];
	if (region) {
		if (notExpired(+get(storedAllAt))) {
			const regionArray: countryType[] = get(countriesData).filter(
				(country: countryType): boolean => country?.region?.toLowerCase() === region.toLowerCase()
			);
			searchArray = regionArray;
		} else {
			fetchArray = await fetchRegion(region);
		}
	} else if (notExpired(+get(storedAllAt))) {
		searchArray = get(countriesData);
	} else {
		fetchArray = await fetchAll();
	}
	if (searchString) {
		if (searchArray) {
			searchArray = filterCountryByName(searchArray, searchString);
		}
		if (fetchArray) {
			fetchArray = filterCountryByName(fetchArray, searchString);
		}
	}
	if (searchArray) {
		return getNextPage(searchArray);
	} else if (fetchArray) {
		return getNextPage(fetchArray);
	}
	return [];
}

export async function getCountry(countryCode: string): Promise<countryType | null> {
	const dataFromLocalStorage = getCountryFromLocalStorage(countryCode);
	if (dataFromLocalStorage) {
		return dataFromLocalStorage;
	}

	const countryData = await fetchCountry(countryCode);
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
