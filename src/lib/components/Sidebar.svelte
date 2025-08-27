<script>
	import logo from '$lib/assets/logo.svg?raw';
	import chatIcon from '$lib/assets/chat.svg?raw';
	import profileIcon from '$lib/assets/profile.svg?raw';
	import contactIcon from '$lib/assets/contact.svg?raw';
	import bookmarkIcon from '$lib/assets/bookmark.svg?raw';

	let { activeTab } = $props();
</script>

<div class="sidebar">
	<ul>
		<li class="logo">
			<span class="icon"><i>{@html logo}</i></span>
		</li>
		<li class={activeTab === "chats" && 'active'}>
			<a href="/chat"><span class="icon"><i>{@html chatIcon}</i></span></a>
		</li>
		<li class={activeTab === "contacts" && 'active'}>
			<a href="/chat/contacts"><span class="icon"><i>{@html contactIcon}</i></span></a>
		</li>
		<li class={activeTab === "bookmarks" && 'active'}>
			<a href="/chat/bookmarks"><span class="icon"><i>{@html bookmarkIcon}</i></span></a>
		</li>
		<li class="profile {activeTab === 'profile' && 'active'}">
			<a href="/chat/profile"><span class="icon"><i>{@html profileIcon}</i></span></a>
		</li>
	</ul>
	<!-- <a href="/chat/settings">Settings</a> -->
</div>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-light);

		@media screen and (min-width: 62rem) {
			top: 0;
			right: unset;
			box-shadow: 2px 0 1px rgba(0, 0, 0, 0.1);
		}

		& ul {
			display: flex;
			justify-content: space-around;
			list-style-type: none;
			padding: 0;
			margin: 0;
			height: 100%;

			@media screen and (min-width: 62rem) {
				gap: 0.5rem;
				flex-direction: column;
			}

			& .logo {
				display: none;
				color: var(--color-primary);
				padding: 1rem;

				@media screen and (min-width: 62rem) {
					display: grid;
					justify-content: center;
				}

				& i {
					width: 3rem;
				}
			}

			& .profile {
				margin-top: auto;
			}

			& a {
				display: grid;
				justify-content: center;
				padding: 1rem;
				color: var(--color-grey-500);
				transition: 0.3s ease;

				&:is(:hover, :focus-visible) {
					color: var(--color-dark);
				}

				& .icon i {
					width: 1.5rem;
				}
			}

			& li.active a {
				color: var(--color-primary);
			}
		}
	}
</style>
