<script lang="ts">
	import '../../../index.css';
	import { get } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import { countriesData, theme } from '../../store';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';

	export let data;

	const slug = data.slug;
	// console.log('slug:', slug);
	$: dataCheck = $countriesData;
	$: countryStoreIndex = $countriesData.findIndex((entry) => entry.slug === slug);
	$: country = $countriesData[countryStoreIndex]?.countryData;

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
			console.log(`fetching... https://restcountries.com/v3.1/name/${slug}`);
			await tick();
			fetch(`https://restcountries.com/v3.1/name/${slug}`)
				.then((response) => response.json())
				.then((data) => {
					// console.log('\n--------------------\nData: ', data, '\n--------------------\n');
					const newData = { slug, countryData: data[0] };

					// console.log('\n--------------------\nnewData: ', newData, '\n--------------------\n');
					$countriesData.push(newData);
					$countriesData = $countriesData;
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
			// console.log(
			// 	'\n--------------------\napi data add: ',
			// 	$countriesData,
			// 	'\n--------------------\n'
			// );
			// console.log(
			// 	'\n--------------------\n $apiData.length: ',
			// 	$countriesData.length,
			// 	'\n--------------------\n'
			// );

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

<ThemeSwitch />
<button on:click={getMo}>CLICK</button>
<main class="">
	<article
		class="container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center mt-12 px-2 lg:px-10 gap-10 text-left relative"
	>
		{#await country}
			<p>Loading...</p>
		{:then}
			{#if country}
				<img
					src={country?.flags.png}
					alt={'' + country?.name.common + ' flag'}
					class="shadow-img-light dark:shadow-img-dark transition-colors duration-700"
				/>
				<div class="grid grid-cols-1 gap-y-6 w-full">
					<h1 id="country-name">{country?.name.common}</h1>
					<!-- Info -->
					<div class="flex flex-col lg:grid lg:grid-cols-2 gap-y-8">
						<!-- Column 1 -->
						<div class="flex flex-col">
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
						<div class="flex flex-col">
							<p>
								<span>Top Level Domain: </span>
								{country?.tld[0]}
							</p>
							<p>
								<span>Currencies: </span>
								{country?.currencies[Object.keys(country.currencies)[0]].name} ({country
									?.currencies[Object.keys(country.currencies)[0]].symbol})
							</p>
							<p>
								<span>Languages: </span>
								<!-- {#if Object.values(country?.languages).length > 1} -->
								{#if Object.values(country?.languages)}
									{#each Object.values(country?.languages) as lang, i}
										{lang}{#if i < Object.values(country?.languages).length - 1}{', '}{/if}
									{/each}
								{/if}
								<!-- {:else if Object.values(country?.languages)}
									{Object.values(country?.languages)}
								{/if} -->
							</p>
						</div>
					</div>
					<div class="flex">
						<p>
							<span>Border countries:</span>
							{#if country?.borders}
								{#each country?.borders as border}
									<a
										class="rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue px-3 py-1 mx-2"
										href={'https://restcountries.com/v3.1/alpha/' + border}>{border}</a
									>
								{/each}
							{:else}
								None
							{/if}
						</p>
					</div>
				</div>
			{:else}
				<p>Loading...</p>
			{/if}
		{:catch error}
			<p>{error}</p>
		{/await}
	</article>
</main>

<style>
	span {
		font-weight: 600;
	}
	h1 {
		font-weight: 800;
		font-size: 200%;
	}
	img {
		transition: box-shadow 700ms ease-in-out;
	}
	a {
		transition: background-color 700ms ease-in-out;
	}
</style>
