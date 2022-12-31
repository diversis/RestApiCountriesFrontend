import type { countryType } from './countryType';

export function filterCountryByName(countries: countryType[], searchString: string): countryType[] {
	const searchResult: countryType[] = countries.filter(
		(country: countryType) =>
			country?.name?.common?.toLowerCase().includes(searchString.toLowerCase()) ||
			country?.name?.official?.toLowerCase().includes(searchString.toLowerCase()) ||
			false
	);
	return searchResult;
}

export function filterCountryByPopulation(
	countries: countryType[],
	population = 0,
	direction = true
): countryType[] {
	const searchResult: countryType[] = countries.filter((country: countryType) =>
		direction ? (country?.population | 0) > population : (country?.population | 0) < population
	);
	return searchResult;
}
