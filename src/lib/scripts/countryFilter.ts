import type { countryTypeLocal } from './countryType';

export function filterCountryByName(
	countries: countryTypeLocal[],
	searchString: string
): countryTypeLocal[] {
	const searchResult: countryTypeLocal[] = countries.filter(
		(country: countryTypeLocal) =>
			country?.name?.common?.toLowerCase().includes(searchString.toLowerCase()) ||
			country?.name?.official?.toLowerCase().includes(searchString.toLowerCase())
	);
	return searchResult;
}

export function filterCountryByPopulation(
	countries: countryTypeLocal[],
	population = 0,
	direction = true
): countryTypeLocal[] {
	const searchResult: countryTypeLocal[] = countries.filter((country: countryTypeLocal) =>
		direction ? country?.population > population : country?.population < population
	);
	return searchResult;
}
