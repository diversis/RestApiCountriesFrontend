<script lang="ts">
	import '../index.css';

	import { page } from '$app/stores';
	import { currentPage, hasNext, currentRegion, currentSearchData } from './store';

	import { beforeUpdate, onMount } from 'svelte';

	import { searchCountires } from '$lib/scripts/countryGet';

	import CardSmall from '$lib/components/CardSmall.svelte';
	import FilterByRegion from '$lib/components/FilterByRegion.svelte';
	import Header from '$lib/components/Header.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import LoaderCog from '$lib/components/Loader-cog.svelte';
	import Search from '$lib/components/Search.svelte';
	import ToTopButton from '$lib/components/ToTopButton.svelte';
	import ScrollPosition from '$lib/components/ScrollPosition.svelte';

	import { fade } from 'svelte/transition';
	import type { countryType } from '$lib/scripts/countryType';

	const baseTitle = 'Rest Countries';

	let searchString = '';

	// let countriesDisplay = searchCountires(
	// 	searchString,
	// 	$currentRegion,
	// 	+$currentPage === 0 && searchString.length === 0
	// );

	// beforeUpdate(() => {
	// 	region = $page.url.searchParams.get('region') || '';
	// });

	let scrollPositionY: number = 0;

	function handleScrollDown(e) {
		if ($hasNext) {
			$currentPage += 1;
			// countriesDisplay = searchCountires(searchString);
		}
	}

	function removeRegionFilter() {
		// countriesDisplay = searchCountires(searchString);
	}

	async function handleSearchInput(searchInput) {
		searchString = searchInput.detail.text;
	}

	async function getCountriesPage() {
		$currentSearchData = await searchCountires(searchString);

		return $currentSearchData;
	}

	async function addRegionFilter() {
		console.log('region:', $currentRegion);
		currentPage.set(0);

		$currentSearchData = await searchCountires(searchString);
	}
</script>

<svelte:head
	><title>Rest Countries{$currentRegion ? ` | ${$currentRegion}` : ''}</title></svelte:head
>
<Header />
<svelte:window bind:scrollY={scrollPositionY} />
<ScrollPosition {scrollPositionY} />
<main class="relative overflow-x-hidden">
	<div
		class="container mx-auto grid grid-cols-1 items-center mt-12 px-4 lg:px-10 gap-10 text-left relative mb-6"
	>
		<div
			class="relative flex flex-col md:flex-row justify-between mx-auto pb-6 w-full item gap-y-12"
		>
			<Search on:searchInput={handleSearchInput} /><FilterByRegion
				on:removeRegionFilter={removeRegionFilter}
				on:addRegionFilter={addRegionFilter}
			/>
		</div>
	</div>
	{#await getCountriesPage()}
		<div id="LoaderCog" class=" grid items-center m-auto w-min"><LoaderCog /></div>
	{:then ___}
		<article
			in:fade={{ delay: 0, duration: 150 }}
			class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[2em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			{#each $currentSearchData as country, cardId}
				<CardSmall {country} {cardId} totalCards={$currentSearchData.length} />
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
