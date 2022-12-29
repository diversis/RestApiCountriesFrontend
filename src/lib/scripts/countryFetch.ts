import type { countryType,countryTypeLocal } from './countryType';
import { compareCountriesByName } from './countrySort';
import { fields } from './fields';

export async function fetchCountry(countryCode: string) {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/alpha/${countryCode}${fields} \n--------------------\n`
	);
	return await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}${fields}`)
		.then((response: Response):Promise<any> => response.json())
		.then((data: countryType[]): countryType => {
			return data[0];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

export async function fetchRegion(region: string) {
	console.log(
		`\n--------------------\n fetching... https://restcountries.com/v3.1/region/${region}${fields} \n--------------------\n`
	);
	return await fetch(`https://restcountries.com/v3.1/region/${region}${fields}`)
		.then((response: Response) => response.json())
		.then((data: countryType[]): countryType[] => {
			for (const country of data) {
				country.createdAt = Date.now();
			}
			return data;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

export async function fetchAll() {
	const response=await fetch(`https://restcountries.com/v3.1/all${fields}`)

    const fetchedCountries:unknown = await response.json()
    if()
		.then((response: Response):Promise<unknown> => response.json())
		.then((data: countryType[]): countryType[] | [] => {
			for (const country of data) {
				country.createdAt = Date.now();
			}
			data.sort(compareCountriesByName);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}

function isCounriesArray(object:unknown): object is countryType{
    if(object!==null && typeof object ==="object"){
        return "token" in object
    }
    return false
}
