<script>
	import { onMount } from 'svelte';

	export let country;
	onMount(() => {
		console.log(
			'\n--------------------\n small card country: ',
			country,
			'\n--------------------\n'
		);
	});
</script>

<a
	class="grid grid-cols-1 gap-y-6 shadow-img-light dark:shadow-img-dark pb-[10%] rounded-lg w-full overflow-hidden text-sm"
	href="/countries/{country.cca3}"
>
	<div class="relative w-full">
		<img
			src={country?.flags?.png}
			alt={'' + country?.name?.common + ' flag'}
			class="mx-auto  transition-colors duration-700 w-full aspect-[2/1]"
		/>
	</div>
	<h1 id="country-name" class="px-4 text-left text-xl">{country?.name?.common}</h1>
	<!-- Info -->
	<div class="flex flex-col gap-y-8 px-4 text-left">
		<!-- Column 1 -->
		<div class="grid grid-col-1">
			<p>
				<span>Population: </span>
				{country?.population}
			</p>
			<p>
				<span>Region: </span>
				{country?.region}
			</p>
			<p>
				<span>Capital: </span>
				{country?.capital}
			</p>
		</div>
	</div>
</a>

<style>
	span {
		font-weight: 800;
	}
	h1 {
		font-weight: 800;
	}
</style>
