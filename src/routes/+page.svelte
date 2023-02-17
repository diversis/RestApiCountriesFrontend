<script lang="ts">
	import { currentPage, hasNext, currentRegion, windowWidth } from './store';

	import { onMount } from 'svelte';

	import { searchCountires } from '$lib/scripts/countryGet';

	import CardSmall from '$lib/components/CardSmall.svelte';
	import FilterByRegion from '$lib/components/FilterByRegion.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import LoaderCog from '$lib/components/Loader-cog.svelte';
	import Search from '$lib/components/Search.svelte';
	import ToTopButton from '$lib/components/ToTopButton.svelte';
	import ScrollPosition from '$lib/components/ScrollPosition.svelte';

	import { fade } from 'svelte/transition';
	import type { countryType } from '$lib/scripts/countryType';
	import { identity } from 'svelte/internal';

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
	async function handleScrollDown(): Promise<void> {
		if ($hasNext && shouldScrollDown) {
			shouldScrollDown = false;
			$currentPage += 1;
			const newData = await getCountriesPage();
			countriesDisplay = [...countriesDisplay, ...newData];
			shouldScrollDown = true;
		}
	}

	async function changeRegionFilter() {
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
	}

	async function handleSearchInput(searchInput: CustomEvent) {
		searchString = searchInput.detail.text;
		currentPage.set(0);
		hasNext.set(true);
		const newData = await getCountriesPage();
		countriesDisplay = [...newData];
	}

	async function getCountriesPage() {
		return await searchCountires(searchString);
	}
	let blurredCards: number[] = [];
	function handleCardHover(e) {
		const gridCols =
			$windowWidth >= 1280 ? 4 : $windowWidth >= 768 ? 3 : $windowWidth >= 640 ? 2 : 1;
		switch (gridCols) {
			case 1:
				blurredCards = [e.detail.cardId - 1, e.detail.cardId + 1];
			case 2:
				blurredCards = [e.detail.cardId % 2 == 0 ? e.detail.cardId + 1 : e.detail.cardId - 1];
			case 3:
				blurredCards =
					e.detail.cardId % 3 == 2
						? [e.detail.cardId - 2, e.detail.cardId - 1]
						: e.detail.cardId % 3 == 1
						? [e.detail.cardId - 1, e.detail.cardId + 1]
						: [e.detail.cardId + 1, e.detail.cardId + 2];
			case 4:
				blurredCards =
					e.detail.cardId % 4 == 3
						? [e.detail.cardId - 3, e.detail.cardId - 2, e.detail.cardId - 1]
						: e.detail.cardId % 4 == 2
						? [e.detail.cardId - 2, e.detail.cardId - 1, e.detail.cardId + 1]
						: e.detail.cardId % 4 == 1
						? [e.detail.cardId - 1, e.detail.cardId + 1, e.detail.cardId + 2]
						: [e.detail.cardId + 1, e.detail.cardId + 2, e.detail.cardId + 3];
		}
	}
	function handleCardMouseLeave(e) {
		blurredCards = [];
	}
</script>

<svelte:head
	><title>Rest Countries{$currentRegion ? ` | ${$currentRegion}` : ''}</title></svelte:head
>
<svelte:window bind:scrollY={scrollPositionY} bind:innerWidth={$windowWidth} />
<ScrollPosition {scrollPositionY} />
<main class="relative overflow-x-hidden">
	<div
		class="container mx-auto grid grid-cols-1 items-center mt-12 px-4 lg:px-10 gap-10 text-left relative mb-6"
	>
		<div
			class="relative flex flex-col md:flex-row justify-between mx-auto pb-6 w-full item gap-y-12"
		>
			<Search on:searchInput={handleSearchInput} /><FilterByRegion
				on:changeRegionFilter={changeRegionFilter}
			/>
		</div>
	</div>

	{#if countriesDisplay && Array.isArray(countriesDisplay)}
		<article
			id="countries-list"
			in:fade|local={{ delay: 0, duration: 150 }}
			class="group countries-list container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-[2em] px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			{#each countriesDisplay as country, cardId}
				<CardSmall
					{country}
					{cardId}
					blurred={blurredCards.includes(cardId)}
					totalCards={countriesDisplay.length}
					on:select={handleCardHover}
					on:deselect={handleCardMouseLeave}
				/>
			{/each}
		</article>
		<InfiniteScroll on:scrollDown={handleScrollDown} />
	{:else}<div id="LoaderCog" class="loader-cog grid items-center m-auto w-min"><LoaderCog /></div>
	{/if}
	{#if scrollPositionY > 50}
		<ToTopButton />
	{/if}
</main>

<style>
	main {
		min-height: calc(100vh - 5rem);
	}
	.loader-cog {
		height: calc(100vh - 14rem - 5em);
	}
	.countries-list {
		transform: translateZ(0);
	}
</style>
