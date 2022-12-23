<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	function handleView() {
		console.log(
			'\n--------------------\n Intersection Observer view event triggered \n--------------------\n '
		);
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
			const options = { threshold: 0.8, rootMargin: '100% 0% -100%' };
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
