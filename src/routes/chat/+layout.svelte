<script>
	import { goto } from '$app/navigation';
    let { children } = $props();
    import authStore from '$lib/stores/auth.svelte';
    import conversationsStore from '$lib/stores/conversations.svelte';
	import { onMount } from 'svelte';

    onMount(async function() {
        try {
            if (authStore.isAuth || await authStore.checkAuth()) {
                // Load conversations
                console.log("Authenticated successfully");

                await conversationsStore.getConversations();
            } else {
                // Redirect to login page
                goto("/login");
                return;
            }
        } catch (err) {
            console.error(err);
        }
    })
</script>

<div class="layout">
    {@render children()}
</div>

<style>
    .layout {
        height: 100vh;
        overflow: hidden;
    }
</style>