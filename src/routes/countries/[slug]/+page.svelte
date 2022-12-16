<script lang="ts">
	import '../../../index.css';
	import { countriesData } from '../../store';
	import { tick } from 'svelte';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	import LoaderInline from '$lib/Loader-inline.svelte';

	export let data;

	$: slug = data?.slug;
	// console.log('slug:', slug);
	// $: dataCheck = $countriesData;
	// $: countryStoreIndex = $countriesData.findIndex((entry) => entry.countryData?.cca2 === slug);
	// $: country = $countriesData[countryStoreIndex]?.countryData;
	// $: if (country && +Date.now() - +country.createdAt > 10000) {
	// 	console.log('10 sec passed');
	// }
	// const getIndex = async () => {
	// 	countryStoreIndex = $apiData.findIndex((entry) => entry.name === data.name);
	// 	console.log(
	// 		'\n--------------------\ncountryStoreIndex: ',
	// 		countryStoreIndex,
	// 		'\n-------------------\n'
	// 	);
	// };

	// const getMo = async () => {
	// 	// await getIndex();
	// 	if (countryStoreIndex === -1) {
	// 		await tick();
	// 		return fetchCountry(slug);

	// 		// console.log(
	// 		// 	'\n--------------------\napi data add: ',
	// 		// 	$countriesData,
	// 		// 	'\n--------------------\n'
	// 		// );
	// 		// console.log(
	// 		// 	'\n--------------------\n $apiData.length: ',
	// 		// 	$countriesData.length,
	// 		// 	'\n--------------------\n'
	// 		// );

	// 		// console.log(
	// 		// 	'\n--------------------\ncountryStoreIndex: ',
	// 		// 	countryStoreIndex,
	// 		// 	'\n--------------------\n'
	// 		// );

	// 		// await getIndex();
	// 	}
	// };

	async function getCountry(countryCode: string) {
		await tick;
		const regexp = /\W/gi;
		// Codes are 2 or 3 letters
		if (countryCode.length < 2 || countryCode.length > 3 || regexp.test(countryCode)) {
			console.log('wrong code, too long: ', countryCode.length);
			return [];
		}

		// check if country data is already stored in local storage and return it if it was created <24 hrs ago
		let countryStoreIndex = $countriesData.findIndex(
			(entry) => entry.cca2 === countryCode.toUpperCase()
		);
		// console.log(
		// 	'\n--------------------\ncountryStoreIndex: ',
		// 	countryStoreIndex,
		// 	'\n--------------------\n'
		// );
		if (countryStoreIndex === -1) {
			countryStoreIndex = $countriesData.findIndex(
				(entry) => entry.cca3 === countryCode.toUpperCase()
			);
		}
		if (countryStoreIndex > -1) {
			const data = $countriesData[countryStoreIndex];
			// console.log(
			// 	'\n--------------------\n createdAt-: ',
			// 	+Date.now() - +data.createdAt,
			// 	'\n--------------------\n'
			// );
			if (+Date.now() - +data.createdAt < 86400000) {
				return data;
			}
			$countriesData.splice(countryStoreIndex);
		}
		if (countryStoreIndex === -1) {
			console.log(
				'\n--------------------\n countryCode: ',
				countryCode,
				'\n--------------------\n'
			);
			return await fetchCountry(countryCode);
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
</script>

<ThemeSwitch />
<main class="">
	<article
		class="container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center mt-12 px-2 lg:px-10 gap-10 text-left relative"
	>
		{#await tick()}{/await}
		{#await getCountry(slug)}
			<LoaderInline />
		{:then country}
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
							{country?.currencies[Object.keys(country.currencies)[0]].name} ({country?.currencies[
								Object.keys(country.currencies)[0]
							].symbol})
						</p>
						<p>
							<span>Languages: </span>
							<!-- {#if Object.values(country?.languages).length > 1} -->
							{#if country && Object.values(country?.languages).length > 0}
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
					<div class="inline-flex flex-wrap gap-y-1">
						<span>Border countries:</span>

						{#if country?.borders?.length > 0}
							{#await getBorders(country?.borders)}
								<LoaderInline />
							{:then data}
								{#each data as border}
									<div>
										<a
											class="rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue px-3 py-0.5 mx-2"
											href={'/countries/' + border?.cca3}>{border?.name?.common}</a
										>
									</div>
								{/each}
							{:catch error}
								<p>{error}</p>
							{/await}
						{:else}
							None
						{/if}
					</div>
				</div>
			</div>
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
