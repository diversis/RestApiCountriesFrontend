<script>
	import ThemeSwitch from './ThemeSwitch.svelte';
	import Nav from './Nav.svelte';
</script>

<header
	class="overflow-hidden transition-colors duration-500 flex flex-row justify-between px-4 lg:px-20 py-6 bg-any-white shadow-light-mode-dark-gray shadow-lg dark:bg-dark-mode-dark-blue dark:shadow-md ease-theme"
>
	<Nav />
	<ThemeSwitch />
</header>
