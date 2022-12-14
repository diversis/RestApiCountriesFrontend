<script lang="ts">
	import { onDestroy } from 'svelte';
	import { apiData } from './store';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';

	export let data;

	const slug = data.slug;
	// console.log('slug:', slug);
	$: countryStoreIndex = $apiData.findIndex((entry) => entry.slug === slug);
	$: country = $apiData[countryStoreIndex]?.countryData;

	// const getIndex = async () => {
	// 	countryStoreIndex = $apiData.findIndex((entry) => entry.name === data.name);
	// 	console.log(
	// 		'\n--------------------\ncountryStoreIndex: ',
	// 		countryStoreIndex,
	// 		'\n-------------------\n'
	// 	);
	// };

	const getMo = async () => {
		// await getIndex();
		if (countryStoreIndex === -1) {
			await tick();
			fetch(`https://restcountries.com/v3.1/name/${slug}`)
				.then((response) => response.json())
				.then((data) => {
					// console.log('\n--------------------\nData: ', data, '\n--------------------\n');
					const newData = { slug, countryData: data[0] };

					// console.log('\n--------------------\nnewData: ', newData, '\n--------------------\n');
					$apiData.push(newData);
					// console.log(
					// 	'\n--------------------\napi data add: ',
					// 	$apiData,
					// 	'\n--------------------\n'
					// );
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
			await tick();
			console.log('\n--------------------\napi data add: ', $apiData, '\n--------------------\n');
			console.log(
				'\n--------------------\n $apiData.length: ',
				$apiData.length,
				'\n--------------------\n'
			);

			// console.log(
			// 	'\n--------------------\ncountryStoreIndex: ',
			// 	countryStoreIndex,
			// 	'\n--------------------\n'
			// );

			// await getIndex();
		}
	};
	// console.log('\n--------------------\n+page apidata: ', $apiData, '\n--------------------\n');

	// $: country = $apiData[countryStoreIndex]?.countryData;

	// $: console.log('\n--------------------\ncountry: ', country, '\n--------------------\n');
</script>

<article>
	<div class="container grid">
		<button on:click={getMo}>CLICK</button>
		{#await country}
			<p>Loading...</p>
		{:then}
			{#if country}
				<img src={country?.flags.png} alt={'' + country?.name.common + ' flag'} />
				<div>
					<h1 id="country-name">{country?.name.common}</h1>
					<!-- Info -->
					<div class="grid">
						<!-- Column 1 -->
						<div class="flex">
							<p>
								<span>Native Name: </span>
								{country?.name?.nativeName[
									Object.keys(country?.name.nativeName)[
										Object.keys(country?.name.nativeName).length - 1
									]
								].common}
							</p>
							<p>
								<span>Population: </span>
								{country?.population}
							</p>
							<p>
								<span>Region: </span>
								{country?.region}
							</p>
							<p>
								<span>Sub Region: </span>
								{country?.subregion}
							</p>
							<p>
								<span>Capital: </span>
								{country?.capital}
							</p>
						</div>
						<!--  Column 2  -->
						<div class="flex">
							<p>
								<span>Top Level Domain: </span>
								{country?.tld}
							</p>
							<p>
								<span>Currencies: </span>
								{country?.name?.nativeName[
									Object.keys(country.name.nativeName)[
										Object.keys(country.name.nativeName).length - 1
									]
								].common}
							</p>
							<p>
								<span>Languages: </span>
								{#each Object.values(country?.languages) as lang}
									{lang + ' '}
								{/each}
							</p>
						</div>
						<div class="flex">
							{#each country?.borders as border}
								<a class="btn" href={'https://restcountries.com/v3.1/alpha/' + border}>{border}</a>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<p>No data :(</p>
			{/if}
		{:catch error}
			<p>{error}</p>
		{/await}
	</div>
</article>
