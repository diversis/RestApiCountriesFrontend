import type { PageLoad } from './$types';

export async function load({ fetch, params }: PageLoad) {
	const res = await fetch(`https://restcountries.com/v3.1/name/${params.slug}`);
	const countryData = await res.json();
	console.log(countryData[0]?.borders[0]);
	return { countryData };
}
