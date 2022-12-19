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

<div class="grid grid-cols-1 gap-y-6 w-full">
	<h1 id="country-name">{country?.name?.common}</h1>
	<!-- Info -->
	<div class="flex flex-col lg:grid lg:grid-cols-2 gap-y-8">
		<!-- Column 1 -->
		<div class="flex flex-col">
			<p>
				<span>Native Name: </span>
				{country?.name?.nativeName[
					Object.keys(country.name.nativeName)[Object.keys(country.name.nativeName).length - 1]
				].common}
			</p>
			<p>
				<span>Population: </span>
				{country?.population}
			</p>
			<p>
				<span>Region: </span>
				{country?.region}
			</p>
			<p>
				<span>Sub Region: </span>
				{country?.subregion}
			</p>
			<p>
				<span>Capital: </span>
				{country?.capital}
			</p>
		</div>
	</div>
</div>
