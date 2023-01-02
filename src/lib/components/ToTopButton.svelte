<button
	type="button"
	title="Scroll to top"
	on:click={() => window.scrollTo(0, 0)}
	class="fixed bottom-[0.5em] left-[0.5em] lg:bottom-[2em] lg:left-[2em] w-[2em] h-[2em] grid items-center
        active:scale-[97%] hover:bg-dark-mode-dark-blue hover:text-any-white dark:hover:bg-any-white dark:hover:text-dark-mode-very-dark-blue
        focus:bg-dark-mode-dark-blue focus:text-any-white dark:focus:bg-any-white dark:focus:text-dark-mode-very-dark-blue
        shadow-around shadow-light-mode-dark-gray dark:shadow-any-white 
        text-light-mode-very-dark-blue  dark:text-any-white transition-colors ease-theme duration-200 
        rounded-[50%] bg-light-mode-very-light-gray dark:bg-dark-mode-dark-blue group"
>
	<p class="sr-only">Scroll to top</p>
	<svg
		class="fill-light-mode-very-dark-blue dark:fill-any-white 
            dark:group-hover:fill-light-mode-very-dark-blue group-hover:fill-any-white 
            dark:group-focus:fill-light-mode-very-dark-blue group-focus:fill-any-white 
            w-[1.5em] h-[1.5em] m-auto"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		><title>Scroll to top</title><path
			d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
		/></svg
	>
</button>
