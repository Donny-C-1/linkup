<script>
	// Components
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ConversationsPanel from '$lib/components/ConversationsPanel.svelte';
	// Icons
	import searchIcon from '$lib/assets/search.svg?raw';
	import phoneIcon from '$lib/assets/phone.svg?raw';
	import videoIcon from '$lib/assets/video.svg?raw';
	import bookmarkIcon from '$lib/assets/bookmark.svg?raw';
	import infoIcon from '$lib/assets/info.svg?raw';
	import attachmentIcon from '$lib/assets/attachmentt.svg?raw';
	import emojiIcon from '$lib/assets/emoji.svg?raw';
	import micIcon from '$lib/assets/mic.svg?raw';
	import sendIcon from '$lib/assets/send.svg?raw';
    import moreIcon from "$lib/assets/more.svg?raw";
	// Non Components
	import { layout } from '$lib/stores/layout.svelte';
</script>

{#if layout.isDesktop}
	<Sidebar activeTab="chats" />
{/if}

<div class="frame">
	{#if layout.isDesktop}
		<div class="view">
			<ConversationsPanel />
		</div>
	{/if}
	<section class="message_board">
		<header>
			<img
				class="conversation_picture"
				src="/images/avatar-1.jpg"
				alt=""
				width="30"
				height="auto"
			/>
			<div class="conversation_info">
				<h2 class="conversation_name">Peter</h2>
				<p class="conversation_status">Online</p>
			</div>
			<button><span class="icon"><i>{@html searchIcon}</i></span></button>
			<button><span class="icon"><i>{@html phoneIcon}</i></span></button>
			<button><span class="icon"><i>{@html videoIcon}</i></span></button>
			<button><span class="icon"><i>{@html bookmarkIcon}</i></span></button>
			<button><span class="icon"><i>{@html infoIcon}</i></span></button>
            <button class="more"><span class="icon"><i>{@html moreIcon}</i></span></button>
		</header>

		<div class="chat_box">
			<ul>
				<li class="message">
					<img src="/images/avatar-1.jpg" alt="Other person profile pic" width="40" height="auto" />
					<div>
						<strong class="sender"><small>Peter:</small></strong>
						<p class="content">
							<span>Hi bro!!! How are you doing ? I hope you are doing good.</span>
                            <sub>
								<time datetime=""><small>Just now</small></time>
							</sub>
						</p>
					</div>
				</li>
				<li class="message">
					<img src="/images/avatar-1.jpg" alt="Other person profile pic" width="40" height="auto" />
					<div>
						<strong class="sender"><small>Peter:</small></strong>
						<p class="content">
							<span>Hi bro!!! How are you doing ? I hope you are doing good.</span>
                            <sub>
								<time datetime=""><small>Just now</small></time>
							</sub>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="input_box">
			<button><span class="icon"><i>{@html attachmentIcon}</i></span></button>
			<button><span class="icon"><i>{@html emojiIcon}</i></span></button>
			<input class="message_input" type="text" name="" id="" placeholder="Type a message" />
			<button><span class="icon"><i>{@html micIcon}</i></span></button>
			<button><span class="icon"><i>{@html sendIcon}</i></span></button>
		</div>
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
				box-shadow: 1px 0 1px rgba(0, 0, 0, 0.1);
			}
		}
	}

	.message_board {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		padding: .5rem .75rem;

		& .conversation_picture {
			width: 2.75rem;
			aspect-ratio: 1;
			border-radius: 50%;
			border: 2px solid var(--color-secondary);
			padding: 0.25rem;
		}

		.conversation_info {
			margin-right: auto;
		}

		& .conversation_name {
			margin: 0;
			font-size: var(--font-large);
			font-weight: var(--font-bold);
		}

		& .conversation_status {
			margin: 0;
			font-size: var(--font-small);
			color: var(--color-grey-500);
		}

        & button {
            display: none;
            border: 0;
            background-color: transparent;
            transition: .3s ease;
            cursor: pointer;

            &.more {
                display: block;

                & i {
                    width: 1.5rem;
                }
            }

            @media screen and (min-width: 62rem) {
                display: block;

                &.more {
                    display: none;
                }
            }

            &:is(:hover, :focus-visible) {
                color: var(--color-primary);
            }

            &:active {
                scale: .9;
            }
        }
	}

	.chat_box {
		flex-grow: 1;
		overflow-y: auto;
        padding: 1rem;

		& ul {
			list-style-type: none;
			margin: 0;
			padding: 0;

			& .message {
				display: flex;
				align-items: flex-start;
                max-width: 60%;
                gap: 1rem;
                margin-bottom: 2rem;

                & > img {
                    border-radius: 50%;
                    width: 2rem;
                    aspect-ratio: 1;
                    object-fit: cover;
                    border: 2px solid var(--color-secondary);
                }

				& > div {
					background-color: var(--color-grey-900);
					padding: 0.5rem;
                    border: 1px solid var(--color-grey-500);
                    border-radius: .5rem .5rem .5rem 0;

					& .content {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: flex-end;
                        justify-content: flex-start;
						margin: 0;

                        & sub {
                            margin-left: auto;
                            padding-left: 2rem;
                            color: var(--color-grey-500)
                        }
					}

					& .sender {
						color: var(--color-grey-500);
					}
				}
			}
		}
	}

	.input_box {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: .5rem;
		box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);

		& button {
			border: 0;
			cursor: pointer;
			background-color: transparent;
			transition: 0.3s ease;

			&:is(:hover, :focus-visible) {
				color: var(--color-primary);
			}
		}

		& .message_input {
			flex-grow: 1;
			padding: 0.75rem;
			border: 0;
			background-color: var(--color-secondary);
			border-radius: 0.5rem;
		}
	}
</style>
