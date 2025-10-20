<script>
	import Sidebar from "$lib/components/Sidebar.svelte";
    import { layout } from "$lib/stores/layout.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        $effect(() => {
            layout.updateComponents({ Sidebar: true, panelVisible: layout.isDesktop ? true: false, panel: "people", viewVisible: true, view: "profile" });
        })
    })
</script>