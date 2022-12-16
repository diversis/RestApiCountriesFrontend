import { countriesData } from '../routes/store';
import { get } from 'svelte/store';
const countriesStore = get(countriesData);

export async function getCountry(countryCode: string) {
	const regexp = /\W/gi;
	// Codes are 2 or 3 letters
	if (countryCode.length < 2 || countryCode.length > 3 || regexp.test(countryCode)) {
		console.log('wrong code, too long: ', countryCode.length);
		return [];
	}

	// check if country data is already stored in local storage and return it if it was created <24 hrs ago
	let countryStoreIndex = countriesStore.findIndex(
		(entry) => entry.cca2 === countryCode.toUpperCase()
	);
	// console.log(
	// 	'\n--------------------\ncountryStoreIndex: ',
	// 	countryStoreIndex,
	// 	'\n--------------------\n'
	// );
	if (countryStoreIndex === -1) {
		countryStoreIndex = countriesStore.findIndex(
			(entry) => entry.cca3 === countryCode.toUpperCase()
		);
	}
	if (countryStoreIndex > -1) {
		const data = countriesStore[countryStoreIndex];
		// console.log(
		// 	'\n--------------------\n createdAt-: ',
		// 	+Date.now() - +data.createdAt,
		// 	'\n--------------------\n'
		// );
		if (+Date.now() - +data.createdAt < 86400000) {
			return data;
		}
		countriesStore.splice(countryStoreIndex);
	}
	if (countryStoreIndex === -1) {
		console.log('\n--------------------\n countryCode: ', countryCode, '\n--------------------\n');

		// fetch from api and save to local storage otherwise
		console.log(`fetching... https://restcountries.com/v3.1/alpha/${countryCode}`);
		fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
			.then((response) => response.json())
			.then((data) => {
				let now = Date.now();
				// console.log('\n--------------------\nData: ', data, '\n--------------------\n');
				const newData = data[0];
				newData.createdAt = now;
				// console.log('\n--------------------\nnewData: ', newData, '\n--------------------\n');
				countriesData.update((n) => n.push(newData));
				return data[0];
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	}
}

async function getBorders(bordersCodes: []) {
	const borders: [] = [];
	await Promise.all(
		bordersCodes.map(async (border) => {
			const data = await getCountry(border);
			if (data) {
				borders.push(data);
			}
			// console.log('\n--------------------\n border data: ', data, '\n--------------------\n');
		})
	);
	console.log('\n--------------------\n borders: ', borders, '\n--------------------\n');
	return borders;
}

async function fetchCountry(countryCode: string) {
	// fetch from api and save to local storage otherwise
	console.log(`fetching... https://restcountries.com/v3.1/alpha/${countryCode}`);
	fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
		.then((response) => response.json())
		.then((data) => {
			let now = Date.now();
			// console.log('\n--------------------\nData: ', data, '\n--------------------\n');
			const newData = data[0];
			newData.createdAt = now;

			// console.log('\n--------------------\nnewData: ', newData, '\n--------------------\n');
			$countriesData.push(newData);
			$countriesData = $countriesData;
			return data[0];
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
}
