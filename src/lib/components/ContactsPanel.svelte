<script>
	import searchIcon from "$lib/assets/search.svg?raw";
	import ContactItem from "./ContactItem.svelte";
	import menuIcon from "$lib/assets/more.svg?raw";
	import { throttle, debounce } from "$lib/utils";
	import { PUBLIC_SERVER_URL } from "$env/static/public";

	// Define contact list
	let contacts = $state([
		{
			id: 1,
			username: "Alice Johnson",
			imageUrl: "https://randomuser.me/api/portraits/women/1.jpg"
		},
		{
			id: 2,
			username: "Bob Smith",
			imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
		},
		{
			id: 3,
			username: "Catherine Parker",
			imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
		},
		{
			id: 4,
			username: "David Wilson",
			imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
		},
		{
			id: 5,
			username: "Emma Davis",
			imageUrl: "https://randomuser.me/api/portraits/women/3.jpg"
		},
		{
			id: 6,
			username: "Frank Miller",
			imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
		},
		{
			id: 7,
			username: "Grace Wilson",
			imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
		},
		{
			id: 8,
			username: "Henry Taylor",
			imageUrl: "https://randomuser.me/api/portraits/men/4.jpg"
		},
		{
			id: 9,
			username: "Isabelle Anderson",
			imageUrl: "https://randomuser.me/api/portraits/women/5.jpg"
		},
		{
			id: 10,
			username: "James Brown",
			imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
		},
		{
			id: 11,
			username: "Kelly Martinez",
			imageUrl: "https://randomuser.me/api/portraits/women/6.jpg"
		},
		{
			id: 12,
			username: "Liam Johnson",
			imageUrl: "https://randomuser.me/api/portraits/men/6.jpg"
		},
		{
			id: 13,
			username: "Mia Thompson",
			imageUrl: "https://randomuser.me/api/portraits/women/7.jpg"
		},
		{
			id: 14,
			username: "Noah Garcia",
			imageUrl: "https://randomuser.me/api/portraits/men/7.jpg"
		},
		{
			id: 15,
			username: "Olivia Rodriguez",
			imageUrl: "https://randomuser.me/api/portraits/women/8.jpg"
		},
		{
			id: 16,
			username: "Peter Chen",
			imageUrl: "https://randomuser.me/api/portraits/men/8.jpg"
		},
		{
			id: 17,
			username: "Quinn Williams",
			imageUrl: "https://randomuser.me/api/portraits/women/9.jpg"
		},
		{
			id: 18,
			username: "Ryan Lopez",
			imageUrl: "https://randomuser.me/api/portraits/men/9.jpg"
		},
		{
			id: 19,
			username: "Sophia Lee",
			imageUrl: "https://randomuser.me/api/portraits/women/10.jpg"
		},
		{
			id: 20,
			username: "Tyler Moore",
			imageUrl: "https://randomuser.me/api/portraits/men/10.jpg"
		}
	]);

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
			console.log(response);

			console.log(data);
			if (!response.ok) throw new Error("Failed to fetch users");

			filteredContacts = data.users;

		} catch (err) {
			console.error("Search error: ", err);
		}
		// return new Promise((resolve) => {
		// 	filteredContacts = contacts.filter((contact) => contact.username.toLowerCase().includes(query.toLowerCase()));
		// 	setTimeout(() => console.log("Contacts: %O:", filteredContacts), 1000);
		// 	resolve(query);
		// });
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
			{#each filteredContacts as { id, username, imageUrl }}
				<div class="contact_item">
					<div class="contact_info">
						<img src={imageUrl} alt={username} class="contact_avatar" width="40" height="auto" />
						<a href="/chat/profile/{id}" class="username">{username}</a>
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
</style>
