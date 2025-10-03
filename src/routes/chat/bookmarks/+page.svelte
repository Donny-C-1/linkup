<script>
    // Components
    import Sidebar from "$lib/components/Sidebar.svelte";
	import MessageBoardPlaceholder from "$lib/components/MessageBoardPlaceholder.svelte";
    // Non Components
    import { layout } from "$lib/stores/layout.svelte";
</script>

<Sidebar activeTab="bookmarks" />
<div class="frame">
	<div class="view">
		<h1>Bookmarks</h1>
	</div>
	{#if layout.isDesktop}
		<div class="placeholder">
			<MessageBoardPlaceholder />
		</div>
	{/if}
</div>

<style>
    .frame {
		height: 100%;
		
		@media screen and (min-width: 62rem) {
            display: flex;
			margin-left: 5.1rem;

			& .view {
				flex-basis: 25rem;
			}
		}
	}

	.placeholder {
		flex-grow: 1;
	}
</style>