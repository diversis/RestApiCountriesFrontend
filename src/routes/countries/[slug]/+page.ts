import type { PageLoad } from './$types';
import type { ParamMatcher } from '@sveltejs/kit';

function match(param) {
	return /^\d+$/.test(param);
}

export async function load({ fetch, params }: PageLoad) {
	const res = await fetch(`https://restcountries.com/v3.1/name/${params.slug}`);
	const countryData = await res.json();
	return { countryData };
}
