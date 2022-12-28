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
	import { beforeUpdate } from 'svelte';
	import { currentPage, hasMore } from './store';
	import CountryScreen from '$lib/CountryScreen.svelte';
	import ToTopButton from '$lib/ToTopButton.svelte';
	import ScrollPosition from '$lib/ScrollPosition.svelte';
	import { fade } from 'svelte/transition';

	const baseTitle = 'Rest Countries';

	let searchString = '';

	$: region = $page.url.searchParams.get('region') || '';
	$: countryCode = $page.url.searchParams.get('country') || '';

	$: countriesDisplay = searchCountires(
		searchString,
		region,
		+$currentPage === 0 && searchString.length === 0,
		countryCode
	);

	let scrollPositionY: number = 0;

	async function handleScrollDown(e) {
		if ($hasMore) {
			$currentPage += 1;
			await countriesDisplay;
		}
	}

	beforeUpdate(() => {
		region = $page.url.searchParams.get('region') || '';
		countryCode = $page.url.searchParams.get('country') || '';
	});

	async function handleSearchInput(searchInput) {
		searchString = searchInput.detail.text;
		// countriesDisplay = searchCountires(searchString, region, false);
	}
</script>

<svelte:head><title>Rest Countries{region ? `| ${region}` : ''}</title></svelte:head>
<Header />
<svelte:window bind:scrollY={scrollPositionY} />
<main class="relative">
	<div
		class="container mx-auto grid grid-cols-1 items-center mt-12 px-4 lg:px-10 gap-10 text-left relative mb-6"
	>
		<div
			class="relative flex flex-col md:flex-row justify-between mx-auto pb-6 w-full item gap-y-12"
		>
			<Search on:searchInput={handleSearchInput} /><FilterByRegion />
		</div>
	</div>
	{#await countriesDisplay}
		<div id="LoaderCog" class=" grid items-center m-auto w-min"><LoaderCog /></div>
	{:then countries}
		<ScrollPosition {scrollPositionY} />
		<article
			in:fade={{ delay: 0, duration: 150 }}
			class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[2em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			{#each countries as country}
				<CardSmall {country} />
			{/each}
		</article>
		<InfiniteScroll on:scrollDown={handleScrollDown} />
	{:catch error}
		<p>{error}</p>
	{/await}
	{#if scrollPositionY > 50}
		<ToTopButton />
	{/if}
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
