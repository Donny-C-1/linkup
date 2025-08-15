<script>
	import favicon from '$lib/assets/favicon.svg';
	import "$lib/stylesheets/global.css";
	import { layout } from '$lib/stores/layout.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (typeof window === "undefined") return;

		const update = () => (layout.screenWidth = window.innerWidth);
		
		// Set initial screen width
		update();

		window.addEventListener("resize", update);

		return () => {
			window.removeEventListener("resize", update);
		}
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
