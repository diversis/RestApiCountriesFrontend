<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
	$: flag = '' + data.countryData[0]?.name.common + ' flag';
</script>

<article>
	<div class="container grid">
		<img
			src={data.countryData[0]?.flags.png}
			alt={'' + data.countryData[0]?.name.common + ' flag'}
		/>
		<div>
			<h1 id="country-name">{data.countryData[0]?.name.common}</h1>
			<div class="grid">
				<div class="flex" />
				<div class="flex" />
				<div class="flex">
					{#each data.countryData[0]?.borders as border}
						<a class="btn" href={'https://restcountries.com/v3.1/alpha/' + border}>{border}</a>>
					{/each}
				</div>
			</div>
		</div>
	</div>
</article>
