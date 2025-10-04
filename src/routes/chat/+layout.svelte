<script>
	import { goto } from '$app/navigation';
    let { children } = $props();
    import authStore from '$lib/stores/auth.svelte';
	import { onMount } from 'svelte';

    onMount(async function() {
        if (!authStore.isAuth) {
            try {
                const authValid = await authStore.checkAuth();
    
                authValid ? console.log("Authenticated Successfully") : console.warn("Not authenticated");
                if (!authValid) return goto("/login");
    
            } catch (err) {
                console.error(err);
            }
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