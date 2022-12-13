<script lang="ts">
	import { apiData, data } from './store';

	let countryName: string = 'Germany';
	$: link = 'https://restcountries.com/v3.1/name/' + countryName;
	const fetchCountryData = async () => {
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				apiData.set(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	};
</script>

<input bind:value={countryName} />
<button on:click={fetchCountryData}>Search</button>
{#if data}
	<article><h1>{$data[0]?.altSpellings}</h1></article>
{/if}
