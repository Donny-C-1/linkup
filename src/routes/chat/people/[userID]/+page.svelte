<script>
	import { page } from "$app/state";
	import { layout } from "$lib/stores/layout.svelte";
	import authStore from "$lib/stores/auth.svelte";
	import usersStore from "$lib/stores/users.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		usersStore.userProfileID = page.params.userID;

		if (usersStore.userProfileID === authStore.user.id) {
			goto("/chat/profile");
			return;
		}
	});

    $effect(() => {
        usersStore.userProfileID = page.params.userID;
    })

	$effect(() => {
		layout.updateComponents({ sidebar: true, panelVisible: layout.isDesktop ? true : false, panel: "people", viewVisible: true, view: "profile" });
	});
</script>
