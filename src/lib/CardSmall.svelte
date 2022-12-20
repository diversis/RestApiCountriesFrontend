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
	class="grid grid-cols-1 gap-y-6 shadow-img-light dark:shadow-img-dark rounded-lg w-full lg:h-[26em] overflow-hidden text-sm"
	href="/countries/{country.cca3}"
>
	<div class="relative w-full h-[12em]">
		<img
			src={country?.flags?.png}
			alt={'' + country?.name?.common + ' flag'}
			class="mx-auto  transition-colors duration-700 object-top object-fit max-w-full h-auto max-h-[12em]"
		/>
	</div>
	<!-- Info -->
	<div class="flex flex-col gap-y-8 px-4 text-left">
		<h1 id="country-name" class="text-left text-xl max-h-[2.5em] align-bottom">
			{country?.name?.common || 'None'}
		</h1>
		<!-- Column 1 -->
		<div class="grid grid-col-1 pb-[2em]">
			<p>
				<span>Population: </span>
				{country?.population || 'None'}
			</p>
			<p>
				<span>Region: </span>
				{country?.region || 'None'}
			</p>
			<p>
				<span>Capital: </span>
				{country?.capital || 'None'}
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
