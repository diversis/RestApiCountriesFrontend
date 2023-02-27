<script lang="ts">
	import { page } from '$app/stores';

	import { getBorders, getCountry } from '$lib/scripts/countryGet';
	import { fetchImg } from '$lib/scripts/fetchImg';

	import LoaderInline from '$lib/components/Loader-inline.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import LoaderCog from '$lib/components/Loader-cog.svelte';

	import { fade } from 'svelte/transition';
	import { populationFormatter } from '$lib/scripts/formatter';

	$: countryCode = $page.params.slug;
</script>

<svelte:head><title>Rest Countries | {countryCode}</title></svelte:head>
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
			<div class="relative w-full" in:fade|local={{ delay: 0, duration: 300 }}>
				{#if country?.flags?.svg}
					{#await fetchImg(country?.flags?.svg)}
						<div class="grid items-center mx-auto w-[20em]">
							<LoaderCog />
						</div>
					{:then data}
						<img
							src={country?.flags?.svg}
							alt={'' + country?.flags?.alt}
							class="mx-auto shadow-img-light dark:shadow-img-dark transition-colors duration-700 w-full h-full"
						/>
					{/await}
				{:else}
					<div
						class="mx-auto shadow-img-light dark:shadow-img-dark transition-colors duration-700 w-full"
					/>
				{/if}
			</div>
			<div
				class="shadow-card-light dark:shadow-card-dark 
				grid grid-cols-1 gap-y-6 w-full
                transition-colors duration-700 ease-theme
				 bg-any-white dark:bg-dark-mode-dark-blue  bg-opacity-50 dark:bg-opacity-50 p-4 rounded-md backdrop-blur-[3px]"
			>
				<h1 id="country-name" class="select-all">
					{#if typeof country?.name?.common === 'string'}{country?.name?.common}{:else}None{/if}
				</h1>
				<!-- Info -->
				<div class="flex flex-col lg:grid lg:grid-cols-2 gap-y-8 ">
					<!-- Column 1 -->
					<ul class="flex flex-col">
						<li>
							<b>Native Name: </b>
							<span class="select-all"
								>{#if country?.name?.nativeName && Object.keys(country.name.nativeName).length > 0}
									{country?.name?.nativeName[
										Object.keys(country.name.nativeName)[
											Object.keys(country.name.nativeName).length - 1
										]
									].common}
								{:else}
									None
								{/if}
							</span>
						</li>
						<li>
							<b>Population: </b>
							<span class="select-all">
								{populationFormatter.format(country?.population) || 'None'}</span
							>
						</li>
						<li>
							<b>Region: </b>
							<span class="select-all"> {'' + country?.region || 'None'}</span>
						</li>
						<li>
							<b>Sub Region: </b>
							<span class="select-all"> {'' + country?.subregion || 'None'}</span>
						</li>
						<li>
							<b>Capital: </b>
							<span class="select-all"> {'' + country?.capital || 'None'}</span>
						</li>
					</ul>
					<!--  Column 2  -->
					<ul class="flex flex-col">
						<li>
							<b>Top Level Domain: </b>
							<span class="select-all"> {country?.tld[0]} </span>
						</li>
						<li>
							<b>Currencies: </b>
							<span class="select-all">
								{#if country?.currencies && Object.keys(country.currencies).length > 0}{country
										?.currencies[Object.keys(country.currencies)[0]].name} ( {country?.currencies[
										Object.keys(country.currencies)[0]
									].symbol} )
								{:else}
									None
								{/if}</span
							>
						</li>
						<li>
							<b>Languages: </b>
							<span class="select-all">
								{#if country?.languages && Object.keys(country.languages).length > 0}
									{#each Object.values(country.languages) as lang, i}
										{lang}{#if i < Object.values(country.languages).length - 1}{', '}{/if}
									{/each}
								{:else}
									None
								{/if}</span
							>
						</li>
					</ul>
				</div>
				<div class="flex">
					<div class="inline-flex flex-wrap gap-y-2 ">
						<b>Border countries:</b>

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
	article b {
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
