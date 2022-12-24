<script>
	async function goBack() {
		history.back();
	}
</script>

<button
	class=" hover:bg-dark-mode-dark-blue hover:text-any-white dark:hover:bg-any-white dark:hover:text-dark-mode-very-dark-blue
	focus:bg-dark-mode-dark-blue focus:text-any-white dark:focus:bg-any-white dark:focus:text-dark-mode-very-dark-blue
	inline-flex items-center shadow-around shadow-light-mode-dark-gray dark:shadow-any-white 
	text-light-mode-very-dark-blue  dark:text-any-white transition-colors ease-theme duration-200 
	rounded-md bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue px-6 py-1 h-min group"
	title="Go back"
	on:click={goBack}
>
	<div class="w-[2em] h-[1em] pr-3 flex items-center">
		<svg
			id="back"
			viewBox="0 0 48 48"
			class="dark:group-hover:fill-dark-mode-dark-blue group-hover:fill-any-white
			dark:group-focus:fill-dark-mode-dark-blue group-focus	:fill-any-white
			 fill-light-mode-very-dark-blue dark:fill-any-white rotate-180 transition-colors ease-theme duration-400"
			><path
				id="back"
				d="m28.05 35.9-2.15-2.1 8.4-8.4H8v-3h26.3l-8.45-8.45 2.15-2.1L40.05 23.9Z"
			/></svg
		>
	</div>
	Back
</button>

<style>
</style>
