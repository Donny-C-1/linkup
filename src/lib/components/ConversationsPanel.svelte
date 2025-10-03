<script>
    import searchIcon from "$lib/assets/search.svg?raw";
</script>

<div class="container">
    <header>
        <h1>Messages</h1>
        <label for="conversation_search" class="search_bar">
            <span class="icon"><i>{@html searchIcon}</i></span>
            <input type="search" name="conversation" id="conversation_search" placeholder="Search here..." /></label>
    </header>
    <div class="conversation_list">
        <h2>Recent</h2>
        <ul>
            <li>
                <a class="conversation" href="/chat/245">
                    <img src="/images/avatar-1.jpg" alt="conversation_profile_picture" width="40" height="auto" />
                    <div class="content">
                        <div>
                            <p class="conversation_name">Peter</p>
                            <p class="last_message">Hello bro</p>
                        </div>
                        <div>
                            <span class="unread_message_count">4</span>
                            <time datetime="" class="latest_time">Just now</time>
                        </div>
                    </div>
                </a>
            </li>
            {#each [
                { name: "Alice", msg: "See you soon!", unread: 2, time: "2m ago", img: "/images/avatar-2.jpg" },
                { name: "Bob", msg: "Got it!", unread: 0, time: "5m ago", img: "/images/avatar-3.jpg" },
                { name: "Charlie", msg: "Thanks!", unread: 1, time: "10m ago", img: "/images/avatar-4.jpg" },
                { name: "Diana", msg: "Let's meet tomorrow.", unread: 3, time: "15m ago", img: "/images/avatar-5.jpg" },
                { name: "Eve", msg: "Check your email.", unread: 0, time: "20m ago", img: "/images/avatar-6.jpg" },
                { name: "Frank", msg: "Awesome!", unread: 5, time: "25m ago", img: "/images/avatar-7.jpg" },
                { name: "Grace", msg: "On my way.", unread: 1, time: "30m ago", img: "/images/avatar-8.jpg" },
                { name: "Hank", msg: "See you!", unread: 0, time: "35m ago", img: "/images/avatar-9.jpg" },
                { name: "Ivy", msg: "Call me.", unread: 2, time: "40m ago", img: "/images/avatar-10.jpg" },
                { name: "Jack", msg: "Good night.", unread: 0, time: "45m ago", img: "/images/avatar-11.jpg" },
                { name: "Karen", msg: "Thanks for the help.", unread: 4, time: "50m ago", img: "/images/avatar-12.jpg" },
                { name: "Leo", msg: "See you at lunch.", unread: 0, time: "55m ago", img: "/images/avatar-13.jpg" },
                { name: "Mona", msg: "Congrats!", unread: 1, time: "1h ago", img: "/images/avatar-14.jpg" },
                { name: "Nate", msg: "No problem.", unread: 0, time: "1h ago", img: "/images/avatar-1.jpg" },
            ] as convo, i}
                <li>
                    <a class="conversation" href={`/chat/${246 + i}`}>
                        <img src={convo.img} alt="conversation_profile_picture" width="40" height="auto" />
                        <div class="content">
                            <div>
                                <p class="conversation_name">{convo.name}</p>
                                <p class="last_message">{convo.msg}</p>
                            </div>
                            <div>
                                {#if convo.unread > 0}
                                    <span class="unread_message_count">{convo.unread}</span>
                                {/if}
                                <time datetime="" class="latest_time">{convo.time}</time>
                            </div>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .search_bar {
        display: flex;
        align-items: center;
        background-color: var(--color-grey-900);
        border-radius: .25rem;
        color: var(--color-grey-500);
        outline: 1px solid transparent;
        transition: .3s ease;
        border: 1px solid var(--color-grey-800);

        &:has(input:is(:focus)) {
            outline-color: var(--color-grey-500);
        }

        & .icon {
            padding-inline: .75rem;
            color: var(--color-dark);

            & i {
                width: 1rem;
            }
        }

        & input {
            flex-grow: 1;
            border: 0;
            background-color: transparent;
            padding: .75rem;
            outline: 0;
            border-left: 1px solid var(--color-grey-800);
        }
    }

    .conversation_list {
        flex-grow: 1;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--color-primary) var(--color-secondary);
    }

    h2 {
        font-size: var(--font-normal);
        margin: 0 1rem;
        font-weight: var(--font-bold);
        margin: 1rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .conversation {
        display: flex;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        text-decoration: none;
        border-bottom: 1px solid var(--color-grey-800);

        & img {
            border-radius: 50%;
            border: 2px solid var(--color-secondary);
            width: 2.75rem;
            aspect-ratio: 1;
            object-fit: cover;
            padding: .1rem;
        }

        & .content {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;

            & .conversation_name {
                margin: 0;
                font-weight: var(--font-bold);
                color: var(--color-dark);
            }

            & .last_message {
                color: var(--color-grey-300);
                font-size: var(--font-small);
                margin: 0;
            }

            & .unread_message_count {
                display: grid;
                place-items: center;
                width: 2rem;
                aspect-ratio: 1;
                background-color: var(--color-primary);
                color: var(--color-light);
                justify-self: end;
                border-radius: 50%;
                font-size: var(--font-small);
            }

            & .latest_time {
                display: block;
                font-size: var(--font-small);
                color: var(--color-grey-300);
            }
        }
    }
</style>