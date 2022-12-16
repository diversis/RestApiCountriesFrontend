<script lang="ts">
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { theme } from '../routes/store';

	$: lightness = $theme === 'dark' ? 60 : 20;

	const pieces: number[] = [];
	const duration: number = 2;
	const width: number = 10;
	for (let x = 0; x < width; x++) {
		pieces.push(x);
	}
</script>

<div class="inline-spinner" style="--width:{width}ch">
	<div class="spinner">
		{#each pieces as piece}
			<div
				style="--delay:{piece / pieces.length}s; --clr-spin: hsla({(piece / pieces.length) * 40 +
					170},{(piece / pieces.length) * 20 + 50}%,{(piece / pieces.length) * 10 +
					lightness}%,0.5);--id:{piece};--left:{piece}ch;--duration:{duration}s"
			/>
		{/each}
	</div>
</div>

<style>
	.spinner {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.inline-spinner {
		width: var(--width);
		height: 1.2em;
		display: inline-block;
		overflow: hidden;
		background: none;
		position: relative;
		margin-inline: 1em;
		border-radius: 5px;
	}

	.spinner div {
		left: var(--left);
		position: absolute;
		width: 1ch;
		background-color: var(--clr-spin);
		transition: color 0.7s cubic-bezier(0.3, 0.25, 0.15, 0.05);
		animation-name: spinner;
		animation-duration: var(--duration);
		animation-timing-function: cubic-bezier(0, 0.25, 0.35, 0.25);
		animation-iteration-count: infinite;
		animation-delay: var(--delay);
	}

	@keyframes spinner {
		0%,
		100% {
			top: 2em;
			height: 2em;
		}
		50% {
			top: 0em;
			height: 2em;
		}
		55% {
			top: 0.1em;
			height: 2em;
		}
	}
</style>
