<script>
	import BackButton from '$lib/BackButton.svelte';
	import CardSmall from '$lib/CardSmall.svelte';
	import { searchCountires } from '$lib/Country';
	import FilterByRegion from '$lib/FilterByRegion.svelte';
	import Header from '$lib/Header.svelte';
	import InfiniteScroll from '$lib/InfiniteScroll.svelte';
	import LoaderCog from '$lib/Loader-cog.svelte';
	import Search from '$lib/Search.svelte';
	import '../index.css';

	export let data;

	$: slug = data?.slug;

	$: searchString = '';
</script>

<Header />
<main class="relative">
	<InfiniteScroll>
		<article
			class="container mx-auto flex flex-col lg:grid lg:grid-cols-4 items-center mt-12 px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative mb-6"
		>
			<div class="relative flex flex-row justify-between mx-auto pb-6 lg:col-span-4 w-full">
				<Search /><FilterByRegion />
			</div>
			{#await searchCountires(searchString)}
				<div id="LoaderCog" class="lg:col-span-4 grid items-center m-auto"><LoaderCog /></div>
			{:then countries}
				{#each countries as country}
					<CardSmall {country} />
				{/each}
			{:catch error}
				<p>{error}</p>
			{/await}
		</article>
	</InfiniteScroll>
</main>

<style>
	#LoaderCog {
		height: calc(100vh - 14rem - 5em);
	}
</style>
