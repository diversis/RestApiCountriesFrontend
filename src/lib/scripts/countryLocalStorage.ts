import { get } from 'svelte/store';
import { countriesData } from '../../routes/store';
import type { countryTypeLocal } from './countryType';
import { notExpired } from './expiration';

export function getCountryFromLocalStorage(countryCode: string) {
	const localStorageData: countryTypeLocal[] = get(countriesData);
	const regexp = /\W/gi;
	// Codes are 2 or 3 letters
	if (countryCode.length < 2 || countryCode.length > 3 || regexp.test(countryCode)) {
		console.log('wrong code: ', countryCode.length);
		return [];
	}

	// check if country data is already stored in local storage and return it if it was created <{refreshLimit} s ago

	const countryIndex = localStorageData.findIndex(
		(country: countryTypeLocal) => countryCode === country.cca3 || countryCode === country.cca2
	);

	if (countryIndex > -1) {
		const country: countryTypeLocal = localStorageData[countryIndex];
		if (country.createdAt && notExpired(+country.createdAt)) {
			return country;
		}
		countriesData.update((data) => {
			data.splice(countryIndex, 1);
			return data;
		});
	}
	return null;
}
