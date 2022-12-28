<script lang="ts">
	import { scrollPosition } from '../routes/store';
	import { onDestroy, onMount, tick } from 'svelte';
	import { get } from 'svelte/store';

	export let scrollPositionY: number;

	onMount(() => {
		window.scrollTo(0, get(scrollPosition));
	});
	onDestroy(async () => {
		scrollPosition.set(scrollPositionY);
	});
</script>
