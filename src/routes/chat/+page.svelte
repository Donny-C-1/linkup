<script>
	// Components
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ConversationsPanel from '$lib/components/ConversationsPanel.svelte';
	// Not Components
	import { layout } from '$lib/stores/layout.svelte';
</script>

<Sidebar activeTab="chats" />
<div class="frame">
	<div class="view">
		<ConversationsPanel />
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
		height: 100%;
		
		@media screen and (min-width: 62rem) {
            display: flex;
			margin-left: 5.1rem;

			& .view {
				flex-basis: 25rem;
			}
		}
	}
</style>
