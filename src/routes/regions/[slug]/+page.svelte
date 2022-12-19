<script>
	import BackButton from '$lib/BackButton.svelte';
	import CardSmall from '$lib/CardSmall.svelte';
	import { searchCountires } from '$lib/Country';
	import Header from '$lib/Header.svelte';
	import LoaderInline from '$lib/Loader-inline.svelte';
	import '../../../index.css';

	export let data;

	$: slug = data?.slug;

	$: searchString = '';
</script>

<Header />
<main class="relative">
	<article
		class="container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center mt-12 px-4 lg:px-10 gap-10 lg:gap-x-16 text-left relative"
	>
		<div class="col-span-2 flex items-start self-start"><BackButton /></div>

		{#await searchCountires(searchString, slug)}
			<LoaderInline />
		{:then countries}
			<div class="conteiner grid grid-cols-1 lg:grid-cols-4">
				{#each countries as country}
					<CardSmall country />
				{/each}
			</div>
		{:catch error}
			<p>{error}</p>
		{/await}
	</article>
</main>
