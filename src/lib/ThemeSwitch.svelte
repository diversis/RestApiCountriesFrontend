<script>
	import { beforeUpdate, tick } from 'svelte';
	$: themeS = $theme;
	import { theme } from '../routes/store';
	function toggle() {
		theme.set(themeS === 'dark' ? 'light' : 'dark');
		window.document.documentElement.className = ('', $theme);
	}
	beforeUpdate(async () => {
		await tick();

		if (themeS === 'dark') {
			window.document.documentElement.className = ('', $theme);
		}
	});
	// $: () => {
	// 	window.document.documentElement.className = ('', themeS);
	// 	themeS = $theme;
	// };
</script>

<button on:click={toggle}>{themeS}</button>
