<script>
	// Components
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ConversationsPanel from '$lib/components/ConversationsPanel.svelte';
	import MessageBoardPlaceholder from '$lib/components/MessageBoardPlaceholder.svelte';
	// Icons
	import logo from "$lib/assets/logo.svg?raw";
	// Not Components
	import { layout } from '$lib/stores/layout.svelte';
</script>

<Sidebar activeTab="chats" />
<div class="frame">
	<div class="view">
		<ConversationsPanel />
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
