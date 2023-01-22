<script lang="ts">
	import { afterUpdate, beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade, draw } from 'svelte/transition';
	import { searchInputString } from '../../routes/store';

	$: searchString = $searchInputString;
	let searchInput: HTMLInputElement;
	const searchPlaceHolder: string = 'Search a country';

	let selectionStart: number = 0;
	let selectionEnd: number = 0;

	let focusSearch: boolean = false;

	let timeout: NodeJS.Timeout;

	const dispatch = createEventDispatcher();

	const sendSearch = () => {
		console.log('debounced: ', searchString);
		dispatch('searchInput', { text: searchString });
	};

	beforeUpdate(() => {
		if (searchInput) {
			({ selectionStart, selectionEnd } = searchInput);
		}
	});

	onMount(() => {
		if (searchString) {
			sendSearch();
		}
		inputFocus();
	});
	function inputFocus() {
		searchInput.setSelectionRange(
			selectionStart ? selectionStart : searchString?.length || 0,
			selectionEnd ? selectionEnd : searchString?.length || 0
		);
		searchInput.focus();
	}

	function handleSearchInput() {
		clearTimeout(timeout);
		timeout = setTimeout(() => sendSearch(), 250);
		console.log('timeout: ', timeout);
	}

	function handleBackspace() {
		searchString = '';
		dispatch('searchInput', { text: '' });
	}

	onDestroy(() => {
		searchInputString.set(searchString);
	});
</script>

<div
	class="group gap-x-6 px-5 py-4 rounded-lg bg-any-white dark:bg-dark-mode-dark-blue rounded-t-lg transition-colors duration-700 ease-theme w-full md:w-[50%] flex flex-row items-center"
>
	<button type="button">
		<svg
			aria-label="Magnifying glass"
			class=" cursor-pointer active:scale-[120%] fill-light-mode-very-dark-blue dark:fill-any-white
			 w-[1.5em] h-[1.5em] {focusSearch
				? 'scale-150'
				: 'group-hover:scale-150'} transition-transform duration:200"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
		>
			{#if focusSearch}
				<path
					class="fill-none inline-block
					 stroke-light-mode-very-dark-blue dark:stroke-any-white stroke-[1.5] "
					in:draw|local={{ duration: 1000 }}
					out:fade|local={{ duration: 200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>
				<path
					class="inline-block opacity-70"
					out:fade|local={{ duration: 200 }}
					in:fade|local={{ duration: 1200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>
			{:else}
				<path
					class="inline-block opacity-70"
					out:fade|local={{ duration: 200 }}
					d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
				/>{/if}
		</svg><span class="sr-only">Search button</span>
	</button>
	<input
		title="Search a country"
		bind:this={searchInput}
		bind:value={searchString}
		on:input={handleSearchInput}
		on:focus={() => {
			focusSearch = true;
		}}
		on:blur={() => (focusSearch = false)}
		placeholder={searchPlaceHolder}
		class="px-2 w-full bg-any-white dark:bg-dark-mode-dark-blue rounded-lg transition-colors duration-700 ease-theme "
	/>
	{#if searchString}
		<button
			title="Reset"
			type="button"
			on:click={handleBackspace}
			class="inline-block group r-0 p-0"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="fill-light-mode-very-dark-blue dark:fill-any-white
				dark:group-hover:fill-dark-mode-dark-blue group-hover:fill-any-white
			dark:group-focus:fill-dark-mode-dark-blue group-focus:fill-any-white
			   w-[1.6em] h-[1.5em]"
				viewBox="0 0 500 500"
			>
				<title>Reset</title>
				<path
					d="M135.19 390.14a28.79 28.79 0 0021.68 9.86h246.26A29 29 0 00432 371.13V140.87A29 29 0 00403.13 112H156.87a28.84 28.84 0 00-21.67 9.84v0L46.33 256l88.86 134.11z"
					fill="none"
					stroke="currentColor"
					stroke-linejoin="round"
					stroke-width="32"
				/>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M336.67 192.33L206.66 322.34M336.67 322.34L206.66 192.33M336.67 192.33L206.66 322.34M336.67 322.34L206.66 192.33"
				/>
			</svg>
		</button>
	{/if}
</div>
