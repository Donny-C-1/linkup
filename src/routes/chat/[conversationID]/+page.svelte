<script>
    import { layout } from "$lib/stores/layout.svelte";
    import { page } from "$app/state";

    console.log(page.params);
</script>

{#if layout.isDesktop}
<div class="sidebar">
    <a href="/chat">Chats</a>
	<a href="/chat/profile">Profile</a>
	<a href="/chat/settings">Settings</a>
</div>
    
{/if}

<div class="frame">
    {#if layout.isDesktop}
        <div class="conversation_panel">
            <header>
                <h1>Messages</h1>
                <input type="search" name="" id="">
            </header>
            <div>
                <h2>Recent</h2>
                <ul>
				<li><a href="/chat/1">Person A</a></li>
				<li><a href="/chat/2">Person B</a></li>
				<li><a href="/chat/3">Person C</a></li>
				<li><a href="/chat/4">Person D</a></li>
			</ul>
            </div>
        </div>
    {/if}
    <h1>Random Fella {page.params.conversationID}</h1>
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