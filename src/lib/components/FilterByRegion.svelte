<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { clickOutside } from '../scripts/clickOutside';
	// import { createEventDispatcher } from 'svelte';
	import { currentRegion } from '../../routes/store';

	$: region = $currentRegion;
	const menuItems = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Antarctic'];
	// const dispatch = createEventDispatcher();

	let menuOpen = false;

	$: console.log('region filter init: ', region);

	let selected: string;

	function handleRegionAdd(item: string) {
		console.log('region filter: ', item);
		$currentRegion = item;
	}

	function handleRegionRemove() {
		$currentRegion = '';
	}
</script>

<div
	id="filters-region"
	use:clickOutside
	on:outsideClick={() => (menuOpen = false)}
	class="grid items-center gap-x-6 md:pl-6 w-min"
>
	{#if region}
		<div
			transition:fly={{ delay: 0, duration: 1000, easing: quintInOut, x: 150 }}
			class="py-2 px-3 inline-flex justify-between w-[13ch] bg-any-white dark:bg-dark-mode-dark-blue
		 rounded-lg transition-all duration-700 ease-theme "
			style="grid-area: filter;"
		>
			{region}
			<button
				type="button"
				title="Remove filter"
				on:click={handleRegionRemove}
				class="group relative w-[1.5em] h-[1.5em] "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-0 
					fill-light-mode-very-dark-blue dark:fill-any-white 
					transition-all duration-100 ease-theme active:scale-150"
					viewBox="0 0 512 512"
					><title>Close</title><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M368 368L144 144M368 144L144 368"
					/></svg
				>
			</button>
		</div>
	{/if}
	<section class="flex flex-col w-min" style="grid-area: menu;">
		<button
			type="button"
			title="Select region filter"
			on:click={() => (menuOpen = !menuOpen)}
			class="py-4 px-6 inline-flex justify-between w-[20ch] bg-any-white dark:bg-dark-mode-dark-blue
		 rounded{menuOpen ? '-t' : ''}-lg transition-all duration-700 ease-theme"
			>Filter by Region <svg
				class="fill-light-mode-very-dark-blue dark:fill-any-white rotate-180 w-[1.5em] h-[1.5em]"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
				><path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" /></svg
			>
		</button>
		{#if menuOpen}
			<div
				id="dropdownWrapper"
				class="absolute md:mt-[3.75em] mt-[4em] w-[20ch] pb-3 overflow-hidden min-h-[{1 *
					menuItems.length}em]"
			>
				<div
					id="dropdown"
					class="transition-colors duration-700 ease-theme rounded-b-lg pt-3 px-2 relative z-50
				 bg-any-white dark:bg-dark-mode-dark-blue w-[20ch] pb-3 bg-opacity-70 dark:bg-opacity-70  backdrop-blur-sm leading-[2em]"
					transition:fly={{ delay: 0, duration: 1000, easing: quintInOut, y: -150 }}
				>
					{#each menuItems as item}
						<button
							id="menu-{item}"
							type="button"
							value="item"
							on:click|self|preventDefault={handleRegionAdd(this.value)}
							class="w-full text-left rounded-md
							hover:bg-dark-mode-dark-blue hover:text-any-white
							 dark:hover:bg-any-white dark:hover:text-dark-mode-very-dark-blue
					   focus:bg-dark-mode-dark-blue focus:text-any-white
						dark:focus:bg-any-white dark:focus:text-dark-mode-very-dark-blue"
						>
							<span class="w-full pl-4 ">
								{item}
							</span></button
						>
					{/each}
				</div>
			</div>
		{/if}
	</section>
</div>

<style>
	#filters-region {
		grid-template-areas: 'menu filter';
	}
	@media screen and (min-width: 768px) {
		#filters-region {
			grid-template-areas: 'filter menu';
		}
	}
</style>
