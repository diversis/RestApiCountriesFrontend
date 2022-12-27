<script lang="ts">
	import { scrollPosition } from '../routes/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		window.scrollTo(0, get(scrollPosition));
	});
</script>
