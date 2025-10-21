<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	// Stores
	import conversationsStore from "$lib/stores/conversations.svelte";
	import { layout } from "$lib/stores/layout.svelte";
	import authStore from "$lib/stores/auth.svelte";
	// Components
	import Sidebar from "$lib/components/Sidebar.svelte";
	import ConversationsPanel from "$lib/components/ConversationsPanel.svelte";
	import MessageBoardPlaceholder from "$lib/components/MessageBoardPlaceholder.svelte";
	import BookmarkList from "$lib/components/BookmarkList.svelte";
	import ContactsPanel from "$lib/components/ContactsPanel.svelte";
	import ProfilePanel from "$lib/components/ProfilePanel.svelte";

	let { children } = $props();
	let loading = $state(true);

	onMount(async function () {
		$inspect(conversationsStore.list);
		try {
			if (authStore.isAuth || (await authStore.checkAuth())) {
				// Load conversations
				console.log("Authenticated successfully");
				loading = false;

				await conversationsStore.getConversations();
			} else {
				// Redirect to login page
				goto("/login");
				return;
			}
		} catch (err) {
			console.error(err);
		}
	});
</script>

{#if !loading}
	{@render children()}
	<div class="layout">
		{#if layout.components.sidebar}
			<Sidebar activeTab="chats" />
		{/if}
		<div class="frame">
			<div class="panel">
				{#if layout.components.panel === "conversations"}
					<ConversationsPanel />
				{:else if layout.components.panel === "bookmarks"}
					<BookmarkList />
				{:else if layout.components.panel === "people"}
					<ContactsPanel />
				{/if}
			</div>
			{#if layout.components.viewVisible}
				<div class="view">
					{#if layout.components.view === "profile"}
						<ProfilePanel />
					{:else if layout.components.view === "messagePlaceholder"}
						<MessageBoardPlaceholder />
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.layout {
		height: 100vh;
		overflow: hidden;
	}

	.frame {
		height: 100%;

		@media screen and (min-width: 62rem) {
			display: flex;
			margin-left: 5.1rem;

			& .panel {
				flex-basis: 25rem;
				box-shadow: 2px 2px 1px rgba(0, 0, 0, .1);
				z-index: 1;
			}

			& .view {
				flex-grow: 1;
			}
		}
	}
</style>
