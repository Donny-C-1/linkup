<script>
	import ConversationsPanel from "$lib/components/ConversationsPanel.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
    import ProfilePanel from "$lib/components/ProfilePanel.svelte";
    // import ProfilePage from "$lib/components/ProfilePage.svelte";
    import { layout } from "$lib/stores/layout.svelte";
</script>

{#if layout.isDesktop}
    <Sidebar activeTab="profile" />
{/if}

<div class="frame">
    {#if layout.isDesktop}
        <div class="view">
            <ConversationsPanel />
        </div>
    {/if}
    <section class="profile_panel">
        <ProfilePanel />
    </section>

</div>

<style>
    .frame {
        height: 100%;

        @media screen and (min-width: 62rem) {
            display: flex;
            margin-left: 5.1rem;

            & .view {
                flex-basis: 25rem;
                box-shadow: 1px 0 1px rgba(0, 0, 0, .1);
            }
        }
    }

    .profile_panel {
        flex-grow: 1;
    }
</style>