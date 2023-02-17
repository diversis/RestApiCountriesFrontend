<script lang="ts">
	import type { countryType } from '$lib/scripts/countryType';
	import { populationFormatter } from '$lib/scripts/formatter';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let country: countryType;
	export let cardId: number;
	export let totalCards: number;
	export let blurred = false;

	const dispatch = createEventDispatcher();
	let hovered = false;
	let focused = false;
	// mouse select
	function handleMouseEnter() {
		hovered = true;
		dispatch('select', { cardId });
	}

	function handleMouseLeave() {
		hovered = false;
		dispatch('deselect', { cardId });
	}
	// keyboard select
	function handleFocus() {
		focused = true;
		dispatch('select', { cardId });
	}

	function handleBlur() {
		if (!hovered) {
			focused = false;
			dispatch('select', { cardId });
		}
	}
</script>

<div
	in:fade|local={{ delay: (700 / 12) * (cardId - totalCards + 12), duration: 150 }}
	out:fade|local={{ delay: (100 / 12) * (cardId - totalCards + 12), duration: 100 }}
	id={`card-${cardId}`}
	class="relative w-full h-[22.75rem] group/country-card"
	on:mouseenter|self={handleMouseEnter}
	on:mouseleave|self={handleMouseLeave}
>
	<a
		on:focus|self={handleFocus}
		on:blur|self={handleBlur}
		title="{country.name.common} description"
		class="absolute bg-any-white dark:bg-dark-mode-dark-blue transition-all duration-300 
	bg-opacity-50 dark:bg-opacity-30 active:scale-[97%] backdrop-blur-[3px] 
	sm:group-hover/country-card:mt-[-1em] sm:group-hover/country-card:h-[26.5em] sm:group-focus/country-card:h-[26.5em] sm:group-focus/country-card:mt-[-1em]
	group-hover/country-card:mt-[-0.5em] group-hover/country-card:h-[27em] group-focus/country-card:h-[27em] group-focus/country-card:mt-[-0.5em]
	 
	 text-left pb-[1em] grid grid-cols-1 gap-y-3
	 shadow-card-light dark:shadow-card-dark rounded-lg
	 w-full h-[26em] overflow-hidden text-sm justify-between"
		class:blur-sm={blurred && !hovered && !focused}
		href="/countries/{country.cca3}"
	>
		<div class="relative w-full h-min ">
			<img
				src={country?.flags?.png}
				alt={'' + country?.name?.common + ' flag'}
				class="mx-auto  transition-colors duration-700 border-b-[1px]
			 border-b-light-mode-dark-gray border-opacity-20 dark:border-opacity-20 dark:border-b-any-white 
			 object-top object-fit w-full h-auto max-h-[12em] aspect-[13/8]"
			/>
		</div>
		<!-- Info -->
		<h1
			class=" px-4 text-left text-lg max-h-[2.5em] align-bottom md:leading-[1.125] xl:leading-normal inline-block select-all"
		>
			{country?.name?.common || 'None'}
		</h1>
		<!-- Column 1 -->
		<ul class="grid grid-col-1 px-4">
			<li>
				<b>Population: </b>
				<span class="select-all">{populationFormatter.format(country?.population) || 'None'}</span>
			</li>
			<li>
				<b>Region: </b>
				<span class="select-all">{'' + country?.region || 'None'}</span>
			</li>
			<li>
				<b>Capital: </b>
				<span class="select-all">{'' + country?.capital || 'None'}</span>
			</li>
		</ul>
	</a>
</div>

<style>
	b {
		font-weight: 800;
	}
	h1 {
		font-weight: 800;
	}
</style>
