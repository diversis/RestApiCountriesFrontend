<script>
	import { onMount } from 'svelte';
	$: themeS = $theme;
	import { theme } from '../routes/store';
	function toggle() {
		window.document.body.classList.toggle('.theme-dark');
		theme.set(themeS === 'dark' ? 'light' : 'dark');
	}
	onMount(async () => {
		if (themeS === 'dark') {
			window.document.body.classList.toggle('.theme-dark');
		}
	});
</script>

<button on:click={toggle}>{themeS}</button>
