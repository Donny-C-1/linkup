<script>
    // Components
    import Sidebar from "$lib/components/Sidebar.svelte";
    // Non Components
    import { layout } from "$lib/stores/layout.svelte";
</script>

<Sidebar activeTab="contacts" />
<div class="frame">
	<div class="settings_panel">
		<h1>Contacts</h1>
		<ul>
			<li>1</li>
			<li>1</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
			<li>Hello World</li>
		</ul>
	</div>
	{#if layout.isDesktop}
		<div>
			<p>Linkup</p>
			<p>Send and receive messages at your convenience</p>
		</div>
	{/if}
</div>

<style>
    .frame {
		@media screen and (min-width: 62rem) {
            display: flex;
			margin-left: 5rem;
		}
	}
</style>