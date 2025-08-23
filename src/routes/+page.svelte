<script>
	import menuIcon from "$lib/assets/menu.svg?raw";
	import computerIcon from '$lib/assets/computer-line.svg?raw';
	import phoneIcon from '$lib/assets/phone.svg?raw';
	import chatIcon from '$lib/assets/chat.svg?raw';
	import userIcon from '$lib/assets/user.svg?raw';
	import globeIcon from '$lib/assets/globe.svg?raw';
	import flashIcon from '$lib/assets/flash.svg?raw';
	import telegramIcon from '$lib/assets/telegram.svg?raw';
	import facebookIcon from '$lib/assets/facebook.svg?raw';
	import twitterXIcon from '$lib/assets/twitter-x.svg?raw';
	import instagramIcon from '$lib/assets/instagram.svg?raw';
	import { throttle } from '$lib/utils/throttle';
	import { onMount } from 'svelte';

	let header = $state();
	let scrolled = $state(false);
	let visible = $state(false);
	
	onMount(() => {
		const update = throttle(() => {
			console.log("scroled");
			if (window.scrollY > 80) {
				scrolled = true;
			} else {
				scrolled = false;
			}
		}, 500);
		window.addEventListener("scroll", update, { passive: true })

		return () => {
			window.removeEventListener("scroll", update);
		}
	})

	function preventClick(e) {
		e.preventDefault();
	}

	function toggleNav() {
		visible = !visible;
	}
</script>

<div class="container">
	<header bind:this={header} class={{scrolled}}>
		<div class="logo">LINKUP</div>
		<nav class={{visible}}>
			<ul>
				<li><a href="/#">Home</a></li>
				<li><a href="#about-us">About</a></li>
				<li><a href="#why-us">Why Us?</a></li>
				<li><a href="#features">Features</a></li>
			</ul>
		</nav>
		<button class="toggle" onclick={toggleNav}><span class="icon"><i>{@html menuIcon}</i></span></button>
		<button class="download">Download</button>
	</header>

	<div class="hero">
		<div class="text_box">
			<h1><span>Connect</span> with your circle in a fun way!</h1>
			<p class="subtext">
				Linkup makes your communication with relatives, work friends and family more fun. Stay
				connected with them with plentiful features.
			</p>
			<div class="get_started_links">
				<a href="/chat" class="get_started">Get Started</a>
				<a href="/chat" class="desktop"><span class="icon"><i>{@html computerIcon}</i></span></a>
				<a href="/chat" class="phone"><span class="icon"><i>{@html phoneIcon}</i></span></a>
			</div>
		</div>
		<!-- <img class="img1" src="/images/hero_img2.png" alt="hero_img1" width="100" height="auto">
		<img class="img2" src="/images/hero_img3.png" alt="hero_img1" width="100" height="auto">
		<img class="img3" src="/images/hero_img4.png" alt="hero_img1" width="100" height="auto"> -->
	</div>

	<section id="features" class="features">
		<h2>Highlight Features</h2>
		<div class="row">
			<div class="feature col-25 col-50 col-100">
				<img src="/images/feature1.png" alt="fast and reliable" width="100%" height="auto" />
				<p>Fast and Reliable</p>
			</div>
			<div class="feature col-25 col-50 col-100">
				<img src="/images/feature2.png" alt="secure encryption" width="100%" height="auto" />
				<p>Secure Encryption</p>
			</div>
			<div class="feature col-25 col-50 col-100">
				<img src="/images/feature3.png" alt="unlimited sharing" width="100%" height="auto" />
				<p>Unlimited Sharing</p>
			</div>
			<div class="feature col-25 col-50 col-100">
				<img src="/images/feature4.png" alt="seamless sync" width="100%" height="auto" />
				<p>Seamless Sync</p>
			</div>
		</div>
	</section>

	<section id="why-us" class="why">
		<h2>Why Linkup?</h2>
		<div class="row">
			<div>
				<p class="slogan">Our mission is user convenience</p>
				<p>
					Linkup makes your communication with relatives, work friends and family more fun. Stay
					connected with them with plentiful features.
				</p>
			</div>
			<div class="statistics">
				<div class="metric">
					<span class="icon"><i>{@html chatIcon}</i></span>
					<div>
						<p class="data">2B+</p>
						<p>Messages Sent</p>
					</div>
				</div>
				<div class="metric">
					<span class="icon"><i>{@html userIcon}</i></span>
					<div>
						<p class="data">500M</p>
						<p>Active User</p>
					</div>
				</div>
				<div class="metric">
					<span class="icon"><i>{@html globeIcon}</i></span>
					<div>
						<p class="data">150+</p>
						<p>Available country</p>
					</div>
				</div>
				<div class="metric">
					<span class="icon"><i>{@html flashIcon}</i></span>
					<div>
						<p class="data">10x</p>
						<p>Send & Upload Speed</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="about-us" class="quotes">
		<div class="">Linkup guarantees comfort and safety because we understand how important <span>privacy</span> is.</div>
		<div class="">
			<p>Linkup makes your communication with relatives, work friends, family more fun. Stay connected with them with plentiful features.</p>
			<p><q>We provide a variety of useful features in helping smooth the relationship of a communication relationship</q> - Dev</p>
		</div>
	</section>

	<footer>
		<div>
			<p class="logo"><b>LINKUP</b></p>
			<p class="short_text">
				Linkup makes your communication with relatives, work friends, family more fun. Stay
				connected with them with plentiful features.
			</p>
			<div class="social_links">
				<a href="https://" onclick={preventClick}>
					<span class="icon"><i>{@html telegramIcon}</i></span>
				</a>
				<a href="https://" onclick={preventClick}>
					<span class="icon"><i>{@html facebookIcon}</i></span>
				</a>
				<a href="https://" onclick={preventClick}>
					<span class="icon"><i>{@html twitterXIcon}</i></span>
				</a>
				<a href="https://" onclick={preventClick}>
					<span class="icon"><i>{@html instagramIcon}</i></span>
				</a>
			</div>
		</div>
		<div class="links_group">
			<div>
				<h3>Useful Links</h3>
				<ul>
					<li>About Us</li>
					<li>Features</li>
					<li>Terms & Conditions</li>
					<li>Company Profile</li>
				</ul>
			</div>
			<div>
				<h3>Content</h3>
				<ul>
					<li>Home</li>
					<li>Linkup Web</li>
					<li>Beta tester</li>
					<li>Join Official Group</li>
				</ul>
			</div>
			<div>
				<h3>Contact Us</h3>
				<ul>
					<li>Linkup@mail.com</li>
					<li>+23456789</li>
					<li>Social media</li>
					<li>Subscribe mail</li>
				</ul>
			</div>
		</div>
	</footer>
</div>

<style>
	.container {
		background-color: var(--color-secondary);
	}

	header {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 1rem;
		position: sticky;
		top: 0;
		z-index: 5;
		background-color: var(--color-secondary);

		&.scrolled {
			box-shadow: 0 1px 1px rgba(0, 0, 0, .3);
		}

		@media screen and (min-width: 40rem) {
			padding-inline: 3rem;
		}

		& .logo {
			margin-right: auto;
			color: var(--color-primary);
			font-size: var(--font-large);
		}

		& nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			background-color: var(--color-light);
			box-shadow: 0 1px 1px rgba(0, 0, 0, .3);

			&.visible {
				display: block;
			}
			
			@media screen and (min-width: 40rem) {
				display: block;
				position: static;
				width: max-content;
				background-color: transparent;
				box-shadow: unset;
			}

			& ul {
				display: flex;
				flex-direction: column;
				list-style-type: none;
				padding: 0;
				margin: 0;

				@media screen and (min-width: 40rem) {
					flex-direction: row;
					gap: 2rem;
				}

				& li a {
						display: block;
						text-decoration: solid underline transparent;
						text-underline-offset: 2px;
						color: inherit;
						transition: 0.3s ease;
						outline: 0;
						padding: 1rem;
						border-bottom: 2px solid var(--color-secondary);

						@media screen and (min-width: 40rem) {
							padding: 0;
							border-bottom: 0;
						}

						&:is(:hover, :focus-visible) {
							text-decoration: solid underline var(--color-primary);
							color: var(--color-primary);
						}

						&:active {
							scale: 0.9;
						}
				}

				& li:last-child a {
					border-bottom: 0;
				}
			}
		}

		.toggle {
			background-color: transparent;
			border: 0;
			cursor: pointer;
			outline: 0;

			& span i {
				width: 1.5rem;
			}

			&:is(:hover, :focus-visible) {
				color: var(--color-primary);
			}

			&:active {
				scale: .9;
			}

			@media screen and (min-width: 40rem) {
				display: none;
			}
		}

		& .download {
			background-color: var(--color-primary);
			color: var(--color-light);
			border: 0;
			padding: 0.75rem 1.5rem;
			border-radius: 1.5rem;
			cursor: pointer;
			transition: 0.3s ease;

			&:active {
				scale: 0.9;
			}
		}
	}

	.hero {
		position: relative;
		padding: 0 2rem 2rem;
		overflow: auto;

		@media screen and (min-width: 32rem) {
			padding: 2rem 4rem 5rem;
		}

		& .text_box {
			max-width: 30rem;

			& h1 {
				font-size: var(--font-xl);
				margin-bottom: 0;

				@media screen and (min-width: 32rem) {
					font-size: var(--font-xxl)
				}

				& span {
					color: var(--color-primary);
				}
			}

			& .subtext {
				margin-block: 2rem;
			}

			& .get_started_links {
				display: flex;
				gap: 1rem;
				align-items: center;
			}

			& .get_started {
				display: inline-grid;
				place-items: center;
				background-color: var(--color-primary);
				color: var(--color-light);
				border-radius: 1.75rem;
				padding: 1rem 2.5rem;
				text-decoration: none;
			}

			& :is(.desktop, .phone) {
				color: var(--color-primary);
			}
		}

		/* & .img1 {
			position: absolute;
			width: 15rem;
			height: auto;
			right: 10rem;
			bottom: 0;
		} */
	}

	h2 {
		font-size: var(--font-large);
	}

	section {
		scroll-margin-top: 6rem;
	}

	/* Features Section */
	section.features {
		background-color: var(--color-light);
		margin: 2rem 2rem;
		border-radius: 1rem;
		padding: 2rem;

		@media screen and (min-width: 32rem) {
			padding: 2rem 4rem;
		}

		& .row {
			display: grid;
			gap: 1rem;
			padding-top: 2rem;
			
			@media screen and (min-width: 32rem) {
				grid-template-columns: repeat(2, 1fr);
				padding-inline: 2rem;
				column-gap: 4rem;
				row-gap: 2rem;
			}

			@media screen and (min-width: 50rem) {
				grid-template-columns: repeat(4, 1fr);
			}

			& .feature {
				display: flex;
				flex-direction: column;
				align-items: center;

				& p {
					font-weight: var(--font-bold);
				}
			}

			& img {
				border-radius: 2rem;
			}
		}
	}

	/* Why Section */
	section.why {
		background-color: var(--color-light);
		padding: 2rem 2rem 3rem;
		margin: 2rem 2rem;
		border-radius: 1rem;

		@media screen and (min-width: 32rem) {
			padding: 2rem 4rem 3rem;
		}

		& .row {
			display: grid;
			grid-template-columns: 1fr;
			gap: 3rem;
			
			@media screen and (min-width: 50rem) {
				grid-template-columns: 1fr 1fr;
				gap: clamp(4rem, 8vw, 10rem);
			}
		}

		.slogan {
			margin: 0;
			font-size: var(--font-larger);
			
			@media screen and (min-width: 32rem) {
				font-size: var(--font-xl);
			}
		}

		& .statistics {
			display: grid;
			grid-template-columns: 1fr;

			@media screen and (min-width: 32rem) {
				grid-template-columns: repeat(2, 1fr);
			}

			& .metric {
				display: flex;
				gap: 1.5rem;
				margin-bottom: 2rem;

				& .icon i {
					width: 1.8rem;
				}

				& p {
					margin: 0;
				}

				& .data {
					font-size: var(--font-larger);
					font-weight: var(--font-xbold);
				}
			}
		}
	}

	/* Quotes Section */
	section.quotes {
		display: grid;
		margin: 2rem;
		gap: 2rem;

		@media screen and (min-width: 50rem) {
			grid-template-columns: 1fr 1fr;
		}

		& > div {
			background-color: var(--color-light);
			padding: 2rem;
			border-radius: 1rem;

			@media screen and (min-width: 32rem) {
				padding: 2rem 4rem;
			}
		}

		& > div:first-child {
			font-size: var(--font-larger);
			font-weight: var(--font-xbold);
			line-height: 3rem;

			& span {
				color: var(--color-primary);
			}
		}
	}

	/* Footer */
	footer {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
		padding: 2rem 2rem 3rem;
		background-color: var(--color-light);

		@media screen and (min-width: 32rem) {
			padding: 2rem 4rem 3rem;
		}

		@media screen and (min-width: 50rem) {
			grid-template-columns: 2fr 3fr;
		}

		& .logo {
			color: var(--color-primary);
			font-size: var(--font-large);
		}

		& .short_text {
			margin-bottom: 3rem;
		}

		& .social_links > a {
			color: inherit;
			margin-right: 1rem;
			transition: 0.3s ease;

			&:hover {
				color: var(--color-primary);
			}
		}

		& .links_group {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			@media screen and (min-width: 32rem) {
				flex-direction: row;
			}

			& ul {
				padding: 0;
				padding-left: 1rem;
			}

			& li {
				margin-bottom: 0.5rem;
				cursor: pointer;
				transition: 0.3s ease;

				&::marker {
					content: '› '; /* right caret */
					font-weight: lighter;
					translate: 20px;
					font-size: 2rem;
				}

				&:hover {
					color: var(--color-primary);
				}
			}
		}
	}
</style>
