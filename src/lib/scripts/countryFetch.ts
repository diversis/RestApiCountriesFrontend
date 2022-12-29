import type { countryType } from './countryType';
import { regionSearchArray } from '../../routes/store';

export async function fetchCountry(countryCode: string) {
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

			// countriesData.update((data) => {
			// 	data.push(newData);
			// 	return data;
			// });

			return data[0];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

export async function fetchRegion(region: string) {
	return await fetch(`https://restcountries.com/v3.1/region/${region}${fields}`)
		.then((response: Response) => response.json())
		.then((data: countryType[]) => {
			for (const country of data) {
				country.createdAt = Date.now();
			}
			regionSearchArray.set(data);
			return regionSearchArray;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}
