<script>
	let menuOpen = false;
	const menuItems = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Antarctic'];
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
</script>

<section class="flex flex-col rounded-lg ">
	<button
		on:click={() => (menuOpen = !menuOpen)}
		{menuOpen}
		class="pl-2 inline-flex justify-between w-[20ch]"
		>Filter by Region <svg
			class="fill-light-mode-very-dark-blue dark:fill-any-white rotate-180 w-[1.5em] h-[1.5em]"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"><path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" /></svg
		>
	</button>
	{#if menuOpen}
		<div
			id="dropdownWrapper"
			class="absolute top-[2em] w-[20ch] pb-3 overflow-hidden min-h-[{1 * menuItems.length}em]"
		>
			<div
				id="dropdown"
				class="rounded-b-lg pl-2 relative z-50 bg-any-white dark:bg-dark-mode-dark-blue w-[20ch] pb-3 bg-opacity-70 dark:bg-opacity-70  backdrop-blur-sm leading-[2em]"
				transition:fly={{ delay: 0, duration: 1000, easing: quintInOut, y: -150 }}
			>
				{#each menuItems as item}
					<div>
						<a href="/regions/{item}">{item}</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
</style>
