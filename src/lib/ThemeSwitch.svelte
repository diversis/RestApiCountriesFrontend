<script>
	import { beforeUpdate, tick } from 'svelte';

	import { theme } from '../routes/store';

	$: themeS = $theme;

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
