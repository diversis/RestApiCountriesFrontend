<script lang="ts">
	import '../index.css';

	import { currentPage, hasNext, currentRegion } from './store';

	import { onMount } from 'svelte';

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

	let countriesDisplay: countryType[] | [] = [];

	onMount(async () => {
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
	});
	let scrollPositionY: number = 0;
	let shouldScrollDown: boolean = true;
	async function handleScrollDown(e): Promise<void> {
		if ($hasNext && shouldScrollDown) {
			console.log(`shouldScrollDown: ${shouldScrollDown} \n`);
			shouldScrollDown = false;
			$currentPage += 1;
			const newData = await getCountriesPage();
			countriesDisplay = [...countriesDisplay, ...newData];
			shouldScrollDown = true;
		}
	}

	async function removeRegionFilter() {
		console.log('region:', $currentRegion);
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
	}

	async function handleSearchInput(searchInput) {
		searchString = searchInput.detail.text;
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
	}

	async function getCountriesPage() {
		console.log(`current page: ${$currentPage} \n`);
		return await searchCountires(searchString);
	}

	async function addRegionFilter() {
		console.log('region:', $currentRegion);
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
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

	{#if countriesDisplay && Array.isArray(countriesDisplay)}
		<article
			in:fade={{ delay: 0, duration: 150 }}
			class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[2em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			{#each countriesDisplay as country, cardId}
				<CardSmall {country} {cardId} totalCards={countriesDisplay.length} />
			{/each}
		</article>
		<InfiniteScroll on:scrollDown={handleScrollDown} />
	{:else}<div id="LoaderCog" class=" grid items-center m-auto w-min"><LoaderCog /></div>
	{/if}
	{#if scrollPositionY > 50}
		<ToTopButton />
	{/if}
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
