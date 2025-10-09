<script>
    import searchIcon from "$lib/assets/search.svg?raw";
    import conversationsStore from "$lib/stores/conversations.svelte";

    let conversationList = $state(conversationsStore.list);
</script>

<div class="container">
    <header>
        <h1>Messages</h1>
        <label for="conversation_search" class="search_bar">
            <span class="icon"><i>{@html searchIcon}</i></span>
            <input type="search" name="conversation" id="conversation_search" placeholder="Search here..." /></label>
    </header>
    <div class="conversation_list">
        {#if conversationList.length > 0}
        <h2>Recent</h2>
        <ul>
            {#each conversationsStore.list as convo, i}
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
        {:else}
            <div class="empty_state">
                <div class="empty_state_content">
                    <div class="illustration">👋</div>
                    <h2>No conversations yet.</h2>
                    <p>Start a conersation with friends to get started.</p>
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
        display: flex;
        flex-direction: column;
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

    .empty_state {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        color: #667085;
    }

    .empty_state_content {
        text-align: center;
        max-width: 20rem;

        & h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #344054;
            margin: 0 0 0.5rem 0;
        }
    }

    .illustration {
        font-size: 4rem;
        margin-bottom: 1.5rem;
    }


</style>