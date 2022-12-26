<script lang="ts">
	import '../index.css';
	import { page } from '$app/stores';
	import CardSmall from '$lib/CardSmall.svelte';
	import { getCountry, searchCountires } from '$lib/country';
	import FilterByRegion from '$lib/FilterByRegion.svelte';
	import Header from '$lib/Header.svelte';
	import InfiniteScroll from '$lib/InfiniteScroll.svelte';
	import LoaderCog from '$lib/Loader-cog.svelte';
	import Search from '$lib/Search.svelte';
	import { beforeUpdate } from 'svelte';
	import { currentPage, hasMore } from './store';
	import CountryScreen from '$lib/CountryScreen.svelte';

	$: searchString = $page.url.searchParams.get('search') || null;
	$: region = $page.url.searchParams.get('region') || null;
	$: countryName = $page.url.searchParams.get('country') || null;

	$: countriesDisplay = searchCountires(searchString, region);

	function handleScrollDown(e) {
		if ($hasMore) {
			$currentPage += 1;
			countriesDisplay = searchCountires(searchString, region, false);
		}
	}

	beforeUpdate(() => {
		searchString = $page.url.searchParams.get('search') || null;
		region = $page.url.searchParams.get('region') || null;
		countryName = $page.url.searchParams.get('country') || null;
	});
</script>

<Header />
<main class="relative">
	{#if countryName}
		{#await getCountry(countryName)}
			<div id="LoaderCog" class="lg:col-span-2 grid items-center mx-auto lg:row-span-2">
				<LoaderCog />
			</div>
		{:then country}
			<CountryScreen {country} />
		{:catch error}
			<p>{error}</p>
		{/await}
	{:else}
		<div
			class="container mx-auto grid grid-cols-1 items-center mt-12 px-4 lg:px-10 gap-10 text-left relative mb-6"
		>
			<div
				class="relative flex flex-col md:flex-row justify-between mx-auto pb-6 w-full item gap-y-6"
			>
				<Search /><FilterByRegion />
			</div>
		</div>
		{#await countriesDisplay}
			<div id="LoaderCog" class=" grid items-center m-auto w-min"><LoaderCog /></div>
		{:then countries}
			<article
				class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[4em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
			>
				{#each countries as country}
					<CardSmall {country} />
				{/each}
				<InfiniteScroll on:event={handleScrollDown} />
			</article>
		{:catch error}
			<p>{error}</p>
		{/await}
	{/if}
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
