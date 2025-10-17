<script>
	import { layout } from '$lib/stores/layout.svelte';
	import { onMount } from 'svelte';
	
	onMount(() => {
		$effect(() => {
			layout.updateComponents({ sidebar: true, panel: "conversations", viewVisible: layout.isDesktop ? true: false});
		})
	})
</script>