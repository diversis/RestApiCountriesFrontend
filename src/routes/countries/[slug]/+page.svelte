<script lang="ts">
	import type { PageData } from './$types';
	import { apiData } from './store';

	export let data: PageData;
	console.log('+page data: ', data);

	$: flag = '' + data.countryData[0]?.name.common + ' flag';
	const addCountryToStore = () => {
		$apiData = [...$apiData, data.countryData[0]];
	};
	addCountryToStore();
	console.log('+page apidata: ', $apiData);
</script>

<article>
	<div class="container grid">
		<img
			src={data.countryData[0]?.flags.png}
			alt={'' + data.countryData[0]?.name.common + ' flag'}
		/>
		<div>
			<h1 id="country-name">{data.countryData[0]?.name.common}</h1>
			<!-- Info -->
			<div class="grid">
				<!-- Column 1 -->
				<div class="flex">
					<p>
						<span>Native Name: </span>
						{$apiData[0]?.name?.nativeName[
							Object.keys($apiData[0].name.nativeName)[
								Object.keys($apiData[0].name.nativeName).length - 1
							]
						].common}
					</p>
					<p>
						<span>Population: </span>
						{$apiData[0]?.population}
					</p>
					<p>
						<span>Region: </span>
						{$apiData[0]?.region}
					</p>
					<p>
						<span>Sub Region: </span>
						{$apiData[0]?.subregion}
					</p>
					<p>
						<span>Capital: </span>
						{$apiData[0]?.capital}
					</p>
				</div>
				<!--  Column 2  -->
				<div class="flex">
					<p>
						<span>Top Level Domain: </span>
						{$apiData[0].tld}
					</p>
					<p>
						<span>Currencies: </span>
						{$apiData[0]?.name?.nativeName[
							Object.keys($apiData[0].name.nativeName)[
								Object.keys($apiData[0].name.nativeName).length - 1
							]
						].common}
					</p>
					<p>
						<span>Languages: </span>
						{#each Object.values($apiData[0]?.languages) as lang}
							{lang + ' '}
						{/each}
					</p>
				</div>
				<div class="flex">
					{#each data.countryData[0]?.borders as border}
						<a class="btn" href={'https://restcountries.com/v3.1/alpha/' + border}>{border}</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</article>
