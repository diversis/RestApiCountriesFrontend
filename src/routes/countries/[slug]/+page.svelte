<script lang="ts">
	import '../../../index.css';
	import { page } from '$app/stores';

	import { getBorders, getCountry } from '$lib/scripts/Country';
	import { fetchImg } from '$lib/scripts/fetchImg';

	import Header from '$lib/components/Header.svelte';
	import LoaderInline from '$lib/components/Loader-inline.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import LoaderCog from '$lib/components/Loader-cog.svelte';

	import { fade } from 'svelte/transition';
	import { populationFormatter } from '$lib/scripts/formatter';

	$: countryCode = $page.params.slug;
</script>

<svelte:head><title>Rest Countries | {countryCode}</title></svelte:head>
<Header />
{#await getCountry(countryCode)}
	<div id="LoaderCog" class="lg:col-span-2 grid items-center mx-auto lg:row-span-2">
		<LoaderCog />
	</div>
{:then country}
	<main class="container relative mx-auto overflow-x-hidden">
		<article
			class="container flex flex-col lg:grid lg:grid-cols-2 items-center mt-[4em] gap-y-[1em] px-4 lg:px-10 lg:gap-x-16 text-left  pb-6"
		>
			<div class="lg:col-span-2 flex items-start self-start mb-[3em]"><BackButton /></div>
			<div class="relative w-full" in:fade={{ delay: 0, duration: 300 }}>
				{#await fetchImg(country?.flags?.svg)}
					<div class="grid items-center mx-auto w-[20em]">
						<LoaderCog />
					</div>
				{:then data}
					<img
						src={country?.flags?.svg}
						alt={'' + country?.name?.common + ' flag'}
						class="mx-auto shadow-img-light dark:shadow-img-dark transition-colors duration-700 w-full"
					/>
				{/await}
			</div>
			<div
				class="shadow-card-light dark:shadow-card-dark 
				grid grid-cols-1 gap-y-6 w-full
                transition-colors duration-700 ease-theme
				 bg-any-white dark:bg-dark-mode-dark-blue  bg-opacity-50 dark:bg-opacity-50 p-4 rounded-md backdrop-blur-[3px]"
			>
				<h1 id="country-name">
					{#if typeof country?.name?.common === 'string'}{country?.name?.common}{:else}None{/if}
				</h1>
				<!-- Info -->
				<div class="flex flex-col lg:grid lg:grid-cols-2 gap-y-8 ">
					<!-- Column 1 -->
					<ul class="flex flex-col">
						<li>
							<span>Native Name: </span>
							{#if country?.name?.nativeName && Object.keys(country.name.nativeName).length > 0}
								{country?.name?.nativeName[
									Object.keys(country.name.nativeName)[
										Object.keys(country.name.nativeName).length - 1
									]
								].common}
							{:else}
								None
							{/if}
						</li>
						<li>
							<span>Population: </span>
							{populationFormatter.format(country?.population) || 'None'}
						</li>
						<li>
							<span>Region: </span>
							{'' + country?.region || 'None'}
						</li>
						<li>
							<span>Sub Region: </span>
							{'' + country?.subregion || 'None'}
						</li>
						<li>
							<span>Capital: </span>
							{'' + country?.capital || 'None'}
						</li>
					</ul>
					<!--  Column 2  -->
					<ul class="flex flex-col">
						<li>
							<span>Top Level Domain: </span>
							{country?.tld[0]}
						</li>
						<li>
							<span>Currencies: </span>
							{#if country?.currencies && Object.keys(country.currencies).length > 0}{country
									?.currencies[Object.keys(country.currencies)[0]].name} ( {country?.currencies[
									Object.keys(country.currencies)[0]
								].symbol} )
							{:else}
								None
							{/if}
						</li>
						<li>
							<span>Languages: </span>
							<!-- {#if Object.values(country.languages).length > 1} -->
							{#if country?.languages && Object.keys(country.languages).length > 0}
								{#each Object.values(country.languages) as lang, i}
									{lang}{#if i < Object.values(country.languages).length - 1}{', '}{/if}
								{/each}
							{:else}
								None
							{/if}
							<!-- {:else if Object.values(country.languages)}
									{Object.values(country.languages)}
								{/if} -->
						</li>
					</ul>
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
											class="active:scale-[97%] hover:bg-dark-mode-dark-blue hover:text-any-white
									 dark:hover:bg-any-white dark:hover:text-dark-mode-very-dark-blue 
											focus:bg-dark-mode-dark-blue focus:text-any-white dark:focus:bg-any-white dark:focus:text-dark-mode-very-dark-blue 
											transition-colors ease-switch duration-200 rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue
											 px-3 py-0.5 mx-2 shadow-around shadow-light-mode-dark-gray dark:shadow-any-white"
											href={'/countries/' + border?.cca3}>{border?.name}</a
										>
									</div>
								{/each}
							{/await}
						{:else}
							<none class="pl-2">None</none>
						{/if}
					</div>
				</div>
			</div>
			<!-- {:catch error}
			<p>{error}</p>
		{/await} -->
		</article>
	</main>
{:catch error}
	<p>{error}</p>
{/await}

<style>
	article span {
		font-weight: 800;
	}
	article h1 {
		font-weight: 800;
		font-size: 200%;
	}
	img {
		transition: box-shadow 700ms ease-in-out;
	}
</style>
