<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const search = $page.url;
	// search.searchParams.set('search', 'ddd');
	onMount(() => {
		// goto(`?${$page.url.searchParams.toString()}`);
		console.log(
			`\n--------------------\n search1:  ${search.searchParams.get('search')} || page.url ${
				$page.url
			} \n--------------------\n`
		);
	});
</script>

<div
	class="gap-x-6 px-5 py-4 rounded-lg bg-any-white dark:bg-dark-mode-dark-blue rounded-t-lg transition-colors duration-700 ease-theme w-full md:w-[50%] flex flex-row items-center"
>
	<button
		><svg
			class="fill-light-mode-very-dark-blue dark:fill-any-white w-[1.5em] h-[1.5em] "
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			><path
				d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
			/></svg
		><span class="sr-only">Search button</span></button
	>
	<input
		value={'Search a country'}
		class="px-2 w-full bg-any-white dark:bg-dark-mode-dark-blue rounded-lg transition-colors duration-700 ease-theme "
	/>
</div>
