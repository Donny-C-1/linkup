<script>
    import { layout } from "$lib/stores/layout.svelte";
</script>

<div class="sidebar">
    <a href="/chat">Chats</a>
	<a href="/chat/profile">Profile</a>
	<a href="/chat/settings">Settings</a>
</div>
<div class="frame">
	<div class="profile_panel">
		<h1>Profile</h1>
	</div>
	{#if layout.isDesktop}
		<div>
			<p>Linkup</p>
			<p>Send and receive messages at your convenience</p>
		</div>
	{/if}
</div>

<style>
    .sidebar {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		justify-content: space-around;
		padding: 1rem;

		@media screen and (min-width: 62rem) {
			top: 0;
			right: unset;
			justify-content: unset;
			gap: 2rem;
			flex-direction: column;
		}
	}

    .frame {
		@media screen and (min-width: 62rem) {
            display: flex;
			margin-left: 5rem;
		}
	}
</style>