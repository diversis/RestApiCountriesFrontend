<script lang="ts">
	import { countriesData } from '../routes/store';
	import { tick } from 'svelte';
	import LoaderInline from '$lib/Loader-inline.svelte';
	import { getCountry } from '$lib/get-couuntry';

	export let countryCode: string;
</script>

{#await getCountry(countryCode)}
	<LoaderInline />
{:then country}
	<div>
		<a
			class="rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue px-3 py-0.5 mx-2"
			href={'/countries/' + countryCode}>{country?.name?.common}</a
		>
	</div>
{:catch error}
	<p>{error}</p>
{/await}
