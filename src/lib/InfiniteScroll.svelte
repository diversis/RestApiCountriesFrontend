<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	function handleView() {
		console.log(
			'\n--------------------\n Intersection Observer view event triggered \n--------------------\n '
		);
		dispatch('event', { text: 'triggered' });
	}

	let container;
	let observer;

	onMount(() => {
		if (browser) {
			const handleIntersect = (entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
						handleView();
					}
				});
			};
			const options = { threshold: 1, rootMargin: '0px' };
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(container);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div id="scrollWrapper" bind:this={container}>
	<slot />
</div>
