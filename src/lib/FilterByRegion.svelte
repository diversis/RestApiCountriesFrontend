<script>
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { clickOutside } from './clickOutside';

	let menuOpen = false;
	const menuItems = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Antarctic'];
</script>

<section use:clickOutside on:outsideClick={() => (menuOpen = false)} class="flex flex-col w-min">
	<button
		type="button"
		on:click={() => (menuOpen = !menuOpen)}
		class="py-4 px-6 inline-flex justify-between w-[20ch] bg-any-white dark:bg-dark-mode-dark-blue
		 rounded{menuOpen ? '-t' : ''}-lg transition-all duration-700 ease-theme"
		>Filter by Region <svg
			class="fill-light-mode-very-dark-blue dark:fill-any-white rotate-180 w-[1.5em] h-[1.5em]"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"><path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" /></svg
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
					<a href="/?region={item}">
						<p
							class="w-full px-3 rounded-md
							 hover:bg-dark-mode-dark-blue hover:text-any-white
							  dark:hover:bg-any-white dark:hover:text-dark-mode-very-dark-blue
						focus:bg-dark-mode-dark-blue focus:text-any-white
						 dark:focus:bg-any-white dark:focus:text-dark-mode-very-dark-blue"
						>
							{item}
						</p></a
					>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
</style>
