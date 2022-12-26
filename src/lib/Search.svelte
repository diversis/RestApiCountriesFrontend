<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade, draw } from 'svelte/transition';

	const search = $page.url;
	let searchString = '';
	const searchPlaceHolder = 'Search a country';

	let focusSearch = false;
</script>

<form
	on:submit|preventDefault={() => {
		if (searchString) {
			goto(`/?search=${searchString}`);
		}
	}}
	class="gap-x-6 px-5 py-4 rounded-lg bg-any-white dark:bg-dark-mode-dark-blue rounded-t-lg transition-colors duration-700 ease-theme w-full md:w-[50%] flex flex-row items-center"
>
	<button type="submit"
		><svg
			aria-label="Magnifying glass"
			class="group  active:scale-[120%] fill-light-mode-very-dark-blue dark:fill-any-white w-[1.5em] h-[1.5em] hover:scale-150 transition-transform duration:200"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			on:mouseenter={() => (focusSearch = true)}
			on:mouseleave={() => (focusSearch = false)}
		>
			{#if focusSearch}
				<path
					class="fill-none inline-block
					 stroke-light-mode-very-dark-blue dark:stroke-any-white stroke-[1.5] opacity:0 
					 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-1000"
					in:draw={{ duration: 1000 }}
					out:fade={{ duration: 200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>
				<path
					class="inline-block opacity-70"
					out:fade={{ duration: 200 }}
					in:fade={{ duration: 1200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>
			{:else}
				<path
					class="inline-block opacity-70"
					out:fade={{ duration: 200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>{/if}
		</svg><span class="sr-only">Search button</span></button
	>
	<input
		bind:value={searchString}
		placeholder={searchPlaceHolder}
		class="px-2 w-full bg-any-white dark:bg-dark-mode-dark-blue rounded-lg transition-colors duration-700 ease-theme "
	/>
</form>
