<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CardSmall from '$lib/CardSmall.svelte';
	import { searchCountires } from '$lib/Country';
	import FilterByRegion from '$lib/FilterByRegion.svelte';
	import Header from '$lib/Header.svelte';
	import InfiniteScroll from '$lib/InfiniteScroll.svelte';
	import LoaderCog from '$lib/Loader-cog.svelte';
	import Search from '$lib/Search.svelte';
	import { onMount } from 'svelte';
	import '../index.css';
	import { currentPage, hasMore } from './store';

	export let data;

	$: slug = data?.slug;
	$: searchString = $page.url.searchParams.get('search') || null;
	$: thisPage = $currentPage;
	$: region = $page.url.searchParams.get('region') || null;

	$: countriesDisplay = searchCountires(searchString, region);

	function handleScrollDown(e) {
		if ($hasMore) {
			$currentPage += 1;
			countriesDisplay = searchCountires(searchString, region, false);
		}
	}
</script>

<Header />
<main class="relative">
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
			class="container mx-auto grid-cols-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center mt-12 px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			{#each countries as country}
				<CardSmall {country} />
			{/each}
			<InfiniteScroll on:event={handleScrollDown} />
		</article>
	{:catch error}
		<p>{error}</p>
	{/await}
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
