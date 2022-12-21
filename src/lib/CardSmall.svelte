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
	class="grid grid-cols-1 gap-y-3 shadow-img-light dark:shadow-img-dark rounded-lg w-full lg:h-[20em]  xl:h-[26em] overflow-hidden text-sm"
	href="/countries/{country.cca3}"
>
	<div class="relative w-full xl:h-[11.425em]">
		<img
			src={country?.flags?.png}
			alt={'' + country?.name?.common + ' flag'}
			class="mx-auto  transition-colors duration-700 border-b-[1px] border-b-light-mode-dark-gray dark:border-b-any-white object-top object-fit max-w-full h-auto xl:max-h-[12em] aspect-[2/1]"
		/>
	</div>
	<!-- Info -->
	<div class="flex flex-col gap-y-2 px-4 text-left pb-[2em] justify-between">
		<h1 id="country-name" class="text-left text-xl max-h-[2.5em] align-bottom">
			{country?.name?.common || 'None'}
		</h1>
		<!-- Column 1 -->
		<div class="grid grid-col-1">
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
