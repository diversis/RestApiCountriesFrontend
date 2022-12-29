<script lang="ts">
	import { scrollPosition } from '../routes/store';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let scrollPositionY: number;

	onMount(() => {
		window.scrollTo(0, get(scrollPosition));
	});
	onDestroy(() => {
		scrollPosition.set(scrollPositionY);
	});
</script>
