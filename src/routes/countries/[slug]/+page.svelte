<script lang="ts">
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';
	import { apiData } from './store';
	import { PageData } from './$types';
	$: countryStoreIndex = 0;
	export let data;
	const slug = data.slug;
	onMount(async () => {
		fetch(`https://restcountries.com/v3.1/name/${slug}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const newData = { name: slug, countryData: data[0] };
				let name = $apiData.find((entry) => entry.name === data.name);
				countryStoreIndex = $apiData.indexOf(name);
				if (!name) {
					$apiData = [...$apiData, newData];
				}
				apiData.set(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	});
	console.log('\n--------------------\n+page apidata: ', $apiData, '\n--------------------\n');
	console.log('\n--------------------\n+page apidata: ', $apiData, '\n--------------------\n');

	$: flag = '' + slug + ' flag';
	$: country = $apiData[countryStoreIndex]?.countryData;
</script>

<article>
	<div class="container grid">
		<img src={country.flags.png} alt={'' + country.name.common + ' flag'} />
		<div>
			<h1 id="country-name">{country.name.common}</h1>
			<!-- Info -->
			<div class="grid">
				<!-- Column 1 -->
				<div class="flex">
					<p>
						<span>Native Name: </span>
						{$apiData[countryStoreIndex]?.name?.nativeName[
							Object.keys($apiData[countryStoreIndex].name.nativeName)[
								Object.keys($apiData[countryStoreIndex].name.nativeName).length - 1
							]
						].common}
					</p>
					<p>
						<span>Population: </span>
						{$apiData[countryStoreIndex]?.population}
					</p>
					<p>
						<span>Region: </span>
						{$apiData[countryStoreIndex]?.region}
					</p>
					<p>
						<span>Sub Region: </span>
						{$apiData[countryStoreIndex]?.subregion}
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
							Object.keys(country.name.nativeName)[Object.keys(country.name.nativeName).length - 1]
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
	</div>
</article>
