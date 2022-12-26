<script lang="ts">
	import '../index.css';
	import { page } from '$app/stores';
	import CardSmall from '$lib/CardSmall.svelte';
	import { getCountry, searchCountires } from '$lib/Country';
	import FilterByRegion from '$lib/FilterByRegion.svelte';
	import Header from '$lib/Header.svelte';
	import InfiniteScroll from '$lib/InfiniteScroll.svelte';
	import LoaderCog from '$lib/Loader-cog.svelte';
	import Search from '$lib/Search.svelte';
	import { beforeUpdate, tick } from 'svelte';
	import { currentPage, hasMore } from './store';
	import CountryScreen from '$lib/CountryScreen.svelte';
	import ToTopButton from '$lib/ToTopButton.svelte';

	const baseTitle = 'Rest Countries';

	$: searchString = $page.url.searchParams.get('search') || null;
	$: region = $page.url.searchParams.get('region') || null;
	$: countryName = $page.url.searchParams.get('country') || null;

	$: countriesDisplay = searchCountires(searchString, region);

	$: title = baseTitle;
	let y: number;
	async function handleScrollDown(e) {
		if ($hasMore) {
			$currentPage += 1;
			countriesDisplay = searchCountires(searchString, region, false);
			await tick();
		}
	}

	beforeUpdate(() => {
		searchString = $page.url.searchParams.get('search') || null;
		region = $page.url.searchParams.get('region') || null;
		countryName = $page.url.searchParams.get('country') || null;
	});
</script>

<svelte:head><title>Rest Countries</title></svelte:head>
<Header />
<svelte:window bind:scrollY={y} />
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
				class="relative flex flex-col md:flex-row justify-between mx-auto pb-6 w-full item gap-y-12"
			>
				<Search /><FilterByRegion />
			</div>
		</div>
		{#await countriesDisplay}
			<div id="LoaderCog" class=" grid items-center m-auto w-min"><LoaderCog /></div>
		{:then countries}
			<article
				class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[2em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
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
	{#if y > 50}
		<ToTopButton />
	{/if}
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
