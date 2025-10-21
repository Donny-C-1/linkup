<script>
	import searchIcon from "$lib/assets/search.svg?raw";
	import ContactItem from "./ContactItem.svelte";
	import menuIcon from "$lib/assets/more.svg?raw";
	import { throttle, debounce } from "$lib/utils";
	import conversationsStore from "$lib/stores/conversations.svelte";
	import { PUBLIC_SERVER_URL } from "$env/static/public";
	import { onMount } from "svelte";

	let contacts = $derived(conversationsStore.list.filter(conv => conv.isGroup == false));

	let query = $state("");

	$effect(() => {
		contacts = contacts.sort((a, b) => a.username.localeCompare(b.username));
	});

	let groupedContacts = $derived(
		(() => {
			const groups = {};

			contacts.forEach((contact) => {
				const firstLetter = contact.username.charAt(0).toUpperCase();
				if (!groups[firstLetter]) {
					groups[firstLetter] = [];
				}
				groups[firstLetter].push(contact);
			});

			return Object.entries(groups)
				.map(([letter, contacts]) => ({
					letter,
					contacts
				}))
				.sort((a, b) => a.letter.localeCompare(b.letter));
		})()
	);
	let filteredContacts = $state([]);

	const handleInput = debounce(async (e) => {
		if (!query.trim()) return [];

		try {
			const response = await fetch(`${PUBLIC_SERVER_URL}/users/search?q=${encodeURIComponent(query)}`, { credentials: "include" });
			const data = await response.json();

			if (!response.ok) throw new Error("Failed to fetch users");

			filteredContacts = data.users;

		} catch (err) {
			console.error("Search error: ", err);
		}
	}, 2000);
</script>

<div class="container">
	<header>
		<h1>Contacts</h1>
		<label for="user_search" class="search_bar">
			<span class="icon"><i>{@html searchIcon}</i></span>
			<input type="search" name="userQuery" id="user_search" placeholder="Search here..." bind:value={query} oninput={handleInput} />
		</label>
	</header>
	<div class="contact_list">
		<!-- <h2>Invites</h2> -->
		{#if query}
			<br>
			{#each filteredContacts as { _id: id, username, avatar }}
				<div class="contact_item">
					<div class="contact_info">
						<img src={avatar} alt={username} class="contact_avatar" width="40" height="auto" />
						<a href="/chat/people/{id}" class="username">{username}</a>
					</div>

					<div class="menu_container">
						<button class="menu_button"><span class="icon"><i>{@html menuIcon}</i></span></button>
					</div>
				</div>
			{/each}
		{:else if contacts.length > 0}
			{#each groupedContacts as group}
				<div class="letter_group">
					<div class="letter_header">{group.letter}</div>
					{#each group.contacts as { id, username, imageUrl }}
						<div class="contact_item">
							<div class="contact_info">
								<img src={imageUrl} alt={username} class="contact_avatar" width="40" height="auto" />
								<a href="/chat/profile/{id}" class="username">{username}</a>
							</div>

							<div class="menu_container">
								<button class="menu_button"><span class="icon"><i>{@html menuIcon}</i></span></button>
							</div>
						</div>
						<!-- <ContactItem {id} {username} {imageUrl} /> -->
					{/each}
				</div>
			{/each}
		{:else}
			<div class="empty_state">
				<div class="empty_state_content">
					<div class="illustration">👋</div>
					<h2>"No contacts yet!"</h2>
					<p>Start a chat or add new friends to get started.</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	h1 {
		font-weight: var(--font-bold);
		font-size: var(--font-large);
		margin: 0 0 1rem 0;
	}

	header {
		padding: 1rem;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	}

	.search_bar {
		display: flex;
		align-items: center;
		background-color: var(--color-grey-900);
		border-radius: 0.25rem;
		color: var(--color-grey-500);
		outline: 1px solid transparent;
		transition: 0.3s ease;
		border: 1px solid var(--color-grey-500);

		&:has(input:is(:focus)) {
			outline-color: var(--color-grey-500);
		}

		& .icon {
			padding-inline: 0.75rem;
			color: var(--color-dark);

			& i {
				width: 1rem;
			}
		}

		& input {
			flex-grow: 1;
			border: 0;
			background-color: transparent;
			padding: 0.75rem;
			outline: 0;
			border-left: 1px solid var(--color-grey-800);
		}
	}

	.contact_list {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--color-primary) var(--color-secondary);
	}

	.letter_header {
		position: sticky;
		top: 0;
		padding: 0.5rem 1rem;
		font-size: var(--font-small);
		background-color: var(--color-light);
		z-index: 1;
		color: var(--color-primary);
		overflow: hidden;

		&::after {
			content: "";
			position: absolute;
			width: 100%;
			top: 50%;
			background-color: var(--color-grey-800);
			height: 0.1rem;
			margin-left: 1.25rem;
		}
	}

	.contact_item {
		display: flex;
		padding: 0.75rem 1rem;
		justify-content: space-between;
		align-items: center;
		border-radius: 0.5rem;
		transition: 0.2s ease;
		margin-bottom: 0.25rem;

		&:hover {
			background-color: var(--color-tertiary);
		}

		& .contact_info {
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}

		& .contact_avatar {
			width: 2.25rem;
			aspect-ratio: 1;
			border-radius: 50%;
			object-fit: cover;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		& .username {
			font-weight: 500;
			color: #333;
		}

		& .menu_container {
			position: relative;
		}

		& .menu_button {
			display: grid;
			place-items: center;
			width: 2.25rem;
			aspect-ratio: 1;
			background-color: transparent;
			border: 0;
			border-radius: 50%;
			cursor: pointer;
			color: #666;
			transition: 0.2s ease;

			&:is(:hover, :focus-visible) {
				background-color: rgba(0, 0, 0, 0.1);
				color: #333;
			}
		}
	}

	.empty_state {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		color: #667085;

		& .empty_state_content {
			text-align: center;
			max-width: 20rem;

			& h2 {
				font-size: 1.25rem;
				font-weight: 600;
				color: #344054;
				margin: 0 0 0.5rem 0;
			}
		}

		& .illustration {
			font-size: 4rem;
			margin-bottom: 1.5rem;
		}
	}
</style>
