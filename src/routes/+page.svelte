<script>
	import BackButton from '$lib/BackButton.svelte';
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
	let arrayStart = 0;
	let arrayEnd = 12;
	$: slug = data?.slug;
	$: searchString = '';
	$: page = $currentPage;

	$: countriesDisplay = searchCountires(searchString);

	function handleScrollDown(e) {
		if ($hasMore) {
			$currentPage += 1;
			countriesDisplay = searchCountires(searchString);
		}
	}
</script>

<Header />
<main class="relative">
	<div
		class="container mx-auto grid grid-cols-1 items-center mt-12 px-4 lg:px-10 gap-10 text-left relative mb-6"
	>
		<div class="relative flex flex-row justify-between mx-auto pb-6 w-full">
			<Search /><FilterByRegion />
		</div>
	</div>
	{#await countriesDisplay}
		<div id="LoaderCog" class="lg:col-span-4 grid items-center m-auto"><LoaderCog /></div>
	{:then countries}
		<article
			class="container mx-auto flex flex-col lg:grid lg:grid-cols-4 items-center mt-12 px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
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
