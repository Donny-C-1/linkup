<script>
    // Components
    import Sidebar from "$lib/components/Sidebar.svelte";
    // Non Components
    import { layout } from "$lib/stores/layout.svelte";
</script>

<Sidebar activeTab="bookmarks" />
<div class="frame">
	<div class="settings_panel">
		<h1>Bookmarks</h1>
	</div>
	{#if layout.isDesktop}
		<div>
			<p>Linkup</p>
			<p>Send and receive messages at your convenience</p>
		</div>
	{/if}
</div>

<style>
    .frame {
		@media screen and (min-width: 62rem) {
            display: flex;
			margin-left: 5rem;
		}
	}
</style>