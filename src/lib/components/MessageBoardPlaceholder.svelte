<script>
    import logo from "$lib/assets/logo.svg?raw";
</script>

<section>
    <div class="inner">
				<span class="icon"><i>{@html logo}</i></span>
				<p class="app_name">Linkup</p>
				<p class="text">Send and receive messages at your convenience</p>
			</div>
</section>

<style>
    section {
        flex-grow: 1;
		display: grid;
        height: 100%;
		place-items: center;
		text-align: center;

		& .icon {
			color: var(--color-grey-300);

			& i {
				width: 6rem;
			}
		}

		& .app_name {
			font-size: var(--font-larger);
			/* color: var(--color-primary); */
			margin: 0;
		}

		& .text {
			margin: 0;
			color: var(--color-grey-300);
		}
    }
</style>