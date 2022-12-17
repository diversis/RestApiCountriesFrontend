<script lang="ts">
	import '../../../index.css';
	import { countriesData } from '../../store';
	import { tick } from 'svelte';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	import LoaderInline from '$lib/Loader-inline.svelte';
	import Header from '$lib/Header.svelte';
	import BackButton from '$lib/BackButton.svelte';

	export let data;

	$: slug = data?.slug;
	// $: borders = [];
	// console.log('slug:', slug);

	async function getCountry(countryCode: string, withBorders = false) {
		let dataFromLocalStorage = await getCountryFromLocalStorage(countryCode);
		if (dataFromLocalStorage) {
			return dataFromLocalStorage;
		}
		console.log(
			`\n--------------------\n fetching... https://restcountries.com/v3.1/alpha/${countryCode} \n--------------------\n`
		);

		return await fetchCountry(countryCode);
	}

	async function getBorders(bordersCodes: []) {
		const borders = [];
		await Promise.all(
			bordersCodes.map(async (border) => {
				const borderData = await getCountry(border);
				if (borderData) {
					borders.push({ cca3: border, name: borderData.name.common });
				}
				// console.log('\n--------------------\n border data: ', borderData, '\n--------------------\n');
			})
		);
		console.log('\n--------------------\n borders: ', borders, '\n--------------------\n');
		return borders;
	}

	async function fetchCountry(countryCode: string) {
		// fetch from api and save to local storage otherwise
		fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
			.then((response) => response.json())
			.then((data) => {
				let now = Date.now();

				const newData = data[0];
				newData.createdAt = now;

				$countriesData.push(newData);
				$countriesData = $countriesData;

				return data[0];
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	}

	async function getCountryFromLocalStorage(countryCode: string) {
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
		if (countryStoreIndex === -1) {
			countryStoreIndex = $countriesData.findIndex(
				(entry) => entry.cca3 === countryCode.toUpperCase()
			);
		}
		if (countryStoreIndex > -1) {
			const data = $countriesData[countryStoreIndex];

			if (+Date.now() - +data.createdAt < 86400000) {
				return data;
			}
			$countriesData.splice(countryStoreIndex);
		}
		return null;
	}
</script>

<Header />

<main class="relative">
	<article
		class="container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center mt-12 px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative"
	>
		<div class="col-span-2 flex items-start self-start"><BackButton /></div>
		{#await getCountry(slug, true)}
			<LoaderInline />
		{:then country}
			<div class="relative w-full">
				<img
					src={country.flags.png}
					alt={'' + country.name.common + ' flag'}
					class="mx-auto shadow-img-light dark:shadow-img-dark transition-colors duration-700 w-[90%]"
				/>
			</div>
			<div class="grid grid-cols-1 gap-y-6 w-full">
				<h1 id="country-name">{country.name.common}</h1>
				<!-- Info -->
				<div class="flex flex-col lg:grid lg:grid-cols-2 gap-y-8">
					<!-- Column 1 -->
					<div class="flex flex-col">
						<p>
							<span>Native Name: </span>
							{country.name?.nativeName[
								Object.keys(country.name.nativeName)[
									Object.keys(country.name.nativeName).length - 1
								]
							].common}
						</p>
						<p>
							<span>Population: </span>
							{country.population}
						</p>
						<p>
							<span>Region: </span>
							{country.region}
						</p>
						<p>
							<span>Sub Region: </span>
							{country.subregion}
						</p>
						<p>
							<span>Capital: </span>
							{country.capital}
						</p>
					</div>
					<!--  Column 2  -->
					<div class="flex flex-col">
						<p>
							<span>Top Level Domain: </span>
							{country.tld[0]}
						</p>
						<p>
							<span>Currencies: </span>
							{country.currencies[Object.keys(country.currencies)[0]].name} ({country.currencies[
								Object.keys(country.currencies)[0]
							].symbol})
						</p>
						<p>
							<span>Languages: </span>
							<!-- {#if Object.values(country.languages).length > 1} -->
							{#if country && Object.values(country.languages).length > 0}
								{#each Object.values(country.languages) as lang, i}
									{lang}{#if i < Object.values(country.languages).length - 1}{', '}{/if}
								{/each}
							{/if}
							<!-- {:else if Object.values(country.languages)}
									{Object.values(country.languages)}
								{/if} -->
						</p>
					</div>
				</div>
				<div class="flex">
					<div class="inline-flex flex-wrap gap-y-2 ">
						<span>Border countries:</span>

						{#if country?.borders?.length > 0}
							{#await getBorders(country?.borders)}
								<LoaderInline />
							{:then borders}
								{#each borders as border}
									<div>
										<a
											class="transition-colors ease-theme duration-500 rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue px-3 py-0.5 mx-2 shadow-around shadow-light-mode-dark-gray dark:shadow-any-white"
											href={'/countries/' + border?.cca3}>{border?.name}</a
										>
									</div>
								{/each}
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
