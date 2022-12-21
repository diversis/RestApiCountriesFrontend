<script lang="ts">
	import '../../index.css';
	import Header from '$lib/Header.svelte';
	import BackButton from '$lib/BackButton.svelte';
	import FilterByRegion from '$lib/FilterByRegion.svelte';
</script>

<Header />
<main class="container flex flex-row justify-between mx-auto mt-12 pb-6">
	<BackButton />
	<FilterByRegion />
</main>
