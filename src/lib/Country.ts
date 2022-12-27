import {
	countriesData,
	currentPage,
	currentSearchArray,
	hasMore,
	regionSearchArray,
	storedAllAt
} from '../routes/store';
import { get } from 'svelte/store';

const fields =
	'?fields=name,capital,currencies,population,region,subregion,tld,languages,borders,flags,cca2,cca3';

const expirationLimit: number = 60 ** 3 * 1000;

export async function getCountry(countryCode: string) {
	const dataFromLocalStorage = getCountryFromLocalStorage(countryCode);
	if (dataFromLocalStorage) {
		return dataFromLocalStorage;
	}

	const countryData = await fetchCountry(countryCode);
	return countryData;
}

async function fetchCountry(countryCode: string) {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/alpha/${countryCode}${fields} \n--------------------\n`
	);
	// fetch from api and save to local storage
	return await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}${fields}`)
		.then((response: Response) => response.json())
		.then((data) => {
			const now: number = Date.now();

			const newData: {} = data[0];
			if (newData) {
				newData.createdAt = now;
			}

			countriesData.update((data) => {
				data.push(newData);
				return data;
			});

			return data[0];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

function getCountryFromLocalStorage(countryCode: string) {
	const localStorage: [] = get(countriesData);
	const regexp = /\W/gi;
	// Codes are 2 or 3 letters
	if (countryCode.length < 2 || countryCode.length > 3 || regexp.test(countryCode)) {
		console.log('wrong code: ', countryCode.length);
		return [];
	}

	// check if country data is already stored in local storage and return it if it was created <{refreshLimit} ago

	let countryIndex = localStorage.findIndex(
		(country) => countryCode === country.cca3 || countryCode === country.cca2
	);

	if (countryIndex > -1) {
		const country = localStorage[countryIndex];
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

function notExpired(date: string | number, limit = expirationLimit) {
	const numLimit = limit;
	return +Date.now() - +date < numLimit;
}

export async function getBorders(bordersCodes: []) {
	const borders: object[] = [];
	await Promise.all(
		bordersCodes.map(async (border) => {
			const borderData = await getCountry(border);
			if (borderData) {
				borders.push({ cca3: border, name: borderData.name.common });
			}
		})
	);
	return borders;
}

export async function searchCountires(
	searchString: string | undefined,
	region: string | undefined,
	init = true,
	countryCode: string
) {
	if (countryCode) {
		return [];
	}
	if (region) {
		if (
			init ||
			get(regionSearchArray).length === 0 ||
			(get(regionSearchArray).length > 0 && get(regionSearchArray)[0].region !== region)
		) {
			if (notExpired(+get(storedAllAt))) {
				const regionArray = [];
				for (let country of get(countriesData)) {
					if ('' + country.region === region) {
						regionArray.push(country);
					}
				}
				regionSearchArray.set(regionArray);
				if (searchString) {
					const searchData = searchCountryByName(get(regionSearchArray), searchString);
					return arrayPick(searchData);
				}
				return arrayPick(get(regionSearchArray));
			}

			console.log(
				`\n--------------------\n fetching... https://restcountries.com/v3.1/region/${region}${fields} \n--------------------\n`
			);
			return await fetch(`https://restcountries.com/v3.1/region/${region}${fields}`)
				.then((response: Response) => response.json())
				.then((data) => {
					for (let country of data) {
						country.createdAt = Date.now();
					}
					regionSearchArray.set(data);
					if (searchString) {
						const searchData = searchCountryByName(get(regionSearchArray), searchString);
						return arrayPick(searchData);
					}
					return arrayPick(get(regionSearchArray));
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
		}
		if (searchString && notExpired(+get(storedAllAt))) {
			const searchData = searchCountryByName(get(regionSearchArray), searchString);
			return arrayPick(searchData);
		}
		return arrayPick(get(regionSearchArray));
	} else if (!searchString && notExpired(+get(storedAllAt))) {
		const pageArray = arrayPick(get(countriesData));
		return pageArray;
	} else if (searchString && notExpired(+get(storedAllAt))) {
		const searchData = searchCountryByName(get(countriesData), searchString);
		currentSearchArray.set(searchData);
		return arrayPick(get(currentSearchArray));
	}

	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/all${fields} \n--------------------\n`
	);

	return await fetch(`https://restcountries.com/v3.1/all${fields}`)
		.then((response: Response) => response.json())
		.then((data) => {
			for (let country of data) {
				country.createdAt = Date.now();
			}
			data.sort(compareCountriesByName);
			countriesData.set(data);
			storedAllAt.set(Date.now());
			if (searchString) {
				const searchData = searchCountryByName(data, searchString);
				currentSearchArray.set(searchData);
				return arrayPick(get(currentSearchArray));
			}
			return arrayPick(data);
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

function addToLocalStorage(country) {
	const countryCode: string = country.cca3 || country.cca2;

	if (getCountryFromLocalStorage(countryCode)) {
		return null;
	}
	country.createdAt = Date.now();

	countriesData.update((data) => {
		data.push(country);
		return data;
	});
}

function arrayPick(array: object[]) {
	const newArray: object[] = [];
	const page = get(currentPage);
	if (page === 0) {
		hasMore.set(true);
	}

	for (let i = 0; i < (page + 1) * 12; i++) {
		if (i >= array.length) {
			hasMore.set(false);
			return newArray;
		}
		newArray.push(array[i]);
	}
	return newArray;
}

function compareCountriesByName(a, b) {
	if (a.name.common > b.name.common) return 1;
	if (a.name.common === b.name.common) return 0;
	if (a.name.common < b.name.common) return -1;
}

function searchCountryByName(countries: object[], searchString: string) {
	const searchResult = [];
	for (let country of countries) {
		if (country.name?.common?.toLowerCase().includes(searchString.toLowerCase())) {
			searchResult.push(country);
		}
	}
	return searchResult;
}
