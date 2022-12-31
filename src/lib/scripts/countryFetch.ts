import { compareCountriesByName } from './countrySort';
import type { countryType } from './countryType';
import { fields } from './fields';

export async function fetchCountry(countryCode: string): Promise<countryType | null> {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/alpha/${countryCode}${fields} \n--------------------\n`
	);
	return await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}${fields}`)
		.then((response: Response): Promise<unknown> => response.json())
		.then((data: unknown): countryType => {
			if (Array.isArray(data) && isCountry(data[0])) {
				return data[0];
			}
			throw Error('No country found with code: ' + countryCode);
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
}

export async function fetchRegion(region: string): Promise<countryType[] | []> {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/region/${region}${fields} \n--------------------\n`
	);
	return await fetch(`https://restcountries.com/v3.1/region/${region}${fields}`)
		.then((response: Response): Promise<unknown> => response.json())
		.then((data: unknown): countryType[] => {
			if (isCounriesArray(data)) {
				for (const country of data) {
					country.createdAt = Date.now();
				}
				return data;
			}
			return [];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

export async function fetchAll(): Promise<countryType[] | []> {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/all${fields} \n--------------------\n`
	);

	return fetch(`https://restcountries.com/v3.1/all${fields}`)
		.then((response: Response): Promise<unknown> => response.json())
		.then((data: unknown): countryType[] | [] => {
			if (isCounriesArray(data)) {
				for (const country of data) {
					country.createdAt = Date.now();
				}
				data.sort(compareCountriesByName);

				return data as countryType[];
			}
			return [];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

function isCountry(object: unknown): object is countryType {
	if (object !== null && typeof object === 'object') {
		return 'cca3' in object;
	}
	return false;
}

function isCounriesArray(object: unknown): object is countryType[] {
	if (object !== null && typeof object === 'object' && Array.isArray(object)) {
		return object.every((item) => isCountry(item));
	}
	return false;
}
