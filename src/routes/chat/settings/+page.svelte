<script>
	import MessageBoardPlaceholder from "$lib/components/MessageBoardPlaceholder.svelte";
    import { layout } from "$lib/stores/layout.svelte";
</script>

<div class="sidebar">
    <a href="/chat">Chats</a>
	<a href="/chat/profile">Profile</a>
	<a href="/chat/settings">Settings</a>
</div>
<div class="frame">
	<div class="view">
		<h1>Settings</h1>
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