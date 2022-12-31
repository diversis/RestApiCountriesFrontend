import type { borderType, countryType } from './countryType';
import { countriesData, currentRegion, hasNext, storedAllAt } from '../../routes/store';
import { get } from 'svelte/store';
import { notExpired } from './expiration';
import { getNextPage } from './pagination';
import { fetchAll, fetchCountry, fetchRegion } from './countryFetch';
import { filterCountryByName } from './countryFilter';
import { getCountryFromLocalStorage } from './countryLocalStorage';

export async function searchCountires(searchString: string | undefined): Promise<countryType | []> {
	if (!get(hasNext)) {
		return [];
	}
	let searchArray: countryType[] = [];
	let fetchArray: countryType[] | [] = [];
	const region: string = get(currentRegion);
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
		countriesData.set(fetchArray);
		storedAllAt.set(Date.now());
	}
	if (searchString) {
		if (searchArray) {
			searchArray = filterCountryByName(searchArray, searchString);
		}
		if (fetchArray) {
			fetchArray = filterCountryByName(fetchArray, searchString);
		}
	}
	if (get(hasNext)) {
		if (searchArray) {
			return getNextPage(searchArray);
		} else if (fetchArray) {
			return getNextPage(fetchArray);
		}
	}
	return [];
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
