import { get } from 'svelte/store';
import { countriesData } from '../../routes/store';
import type { countryType } from './countryType';
import { notExpired } from './expiration';

export function getCountryFromLocalStorage(countryCode: string): countryType | null {
	const localStorageData: countryType[] = get(countriesData);
	const regexp = /\W/gi;
	// Codes are 2 or 3 letters
	if (countryCode.length < 2 || countryCode.length > 3 || regexp.test(countryCode)) {
		console.log('wrong code: ', countryCode.length);
		return null;
	}

	// check if country data is already stored in local storage and return it if it was created <{refreshLimit} s ago

	const countryIndex: number = localStorageData.findIndex(
		(country: countryType): boolean => countryCode === country.cca3 || countryCode === country.cca2
	);

	if (countryIndex > -1) {
		const country: countryType | undefined = localStorageData.find(
			(country: countryType): boolean =>
				countryCode === country.cca3 || countryCode === country.cca2
		);

		if (country && country.createdAt && notExpired(+country.createdAt)) {
			return country;
		}
		countriesData.update((data) => {
			data.splice(countryIndex, 1);
			return data;
		});
	}
	return null;
}
