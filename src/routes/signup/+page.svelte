<script>
    import { goto } from "$app/navigation";
    import logo from "$lib/assets/logo.svg?raw";
    import personIcon from "$lib/assets/person.svg?raw";
    import lockIcon from "$lib/assets/lock.svg?raw";
    import { PUBLIC_SERVER_URL } from "$env/static/public";
    import authStore from "$lib/stores/auth.svelte";

    let username = $state("");
    let password = $state("");
    let rememberMe = $state(false);

    async function register(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${PUBLIC_SERVER_URL}/auth/signup`, {
                method: 'post',
                body: JSON.stringify({
                    username,
                    password,

                    avatar: "/images/avatar.png"
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json();

                const { id, username } = data.data;
    
                authStore.login({ id, username });

                return goto("/chat");  
            } 
        } catch (err) {
            console.error(err);
        }
    }
</script>

<main>
    <h1><i>{@html logo}</i> LinkUp</h1>
    <h2>Sign up</h2>
    <p class="title">Create a linkup account now</p>
    <form action="">
        <label for="username">Username</label>
        <div class="input_box">
            <span><i>{@html personIcon}</i></span>
            <input type="text" name="username" id="username" bind:value={username} placeholder="Enter your username" autocomplete="username" />
        </div>
        <label for="password">Password</label>
        <div class="input_box">
            <span><i>{@html lockIcon}</i></span>
            <input type="password" name="password" id="password" bind:value={password} placeholder="Enter your password" autocomplete="new-password" />
        </div>
        <label for="remember_me"><input type="checkbox" name="remember_me" id="remember_me" bind:checked={rememberMe}> Remember me</label>
        <button class="submit" onclick={register}>Sign up</button>
    </form>
    <p class="signup_link">Already have an account? <a href="/login">Log in</a></p>
    <footer>
        <p><i class="icon">&copy;</i> {new Date().getFullYear()} LinkUp. Created with 💜 by <a href="https://donny-c-1.github.io">Donny C</a></p>
    </footer>
</main>

<style>
    main {
        display: grid;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
        background-color: #f7f7ff;
    }

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        gap: 0.25rem;
        margin-bottom: 2rem;

        & i {
            display: inline-grid;
            place-items: center;
            width: 1.5rem;
            vertical-align: middle;
            color: #5f5bcc;
        }
    }

    h2 {
        margin: 0;
    }

    .title {
        margin-block: .5rem 1.5rem;
        color: #7a7f9a;
    }

    form {
        width: clamp(20rem, 90vw, 30rem);
        background-color: #fff;
        padding: 2.5rem;
        text-align: left;
        margin-bottom: 2rem;
    }

    label {
        display: block;
        margin-bottom: .5rem;
    }

    .input_box {
        display: flex;
        border-radius: .5rem;
        border: 1px solid #e6ebf5;
        overflow: hidden;
        margin-bottom: 1rem;

        & span {
            display: grid;
            place-items: center;
            padding-inline: .75rem;
            border-right: 1px solid #e6ebf5;
            color: #7a7f9a;
            background-color: #f8f9fa;
            & i {
                display: grid;
                place-items: center;
                vertical-align: middle;
                width: 1.5rem;
                padding: 0.2rem;
            }
        }

        & input {
            padding: 1rem;
            flex-grow: 1;
            border: 0;
        }
    }

    .submit {
        width: 100%;
        background-color: var(--color-primary);
        border: 0;
        color: #fff;
        padding: .75rem 1rem;
        border-radius: .25rem;
        font-size: 1rem;
        margin-top: 1rem;
        cursor: pointer;
    }

    .signup_link {
        margin-block: 1rem 0;

        & a {
            color: var(--color-primary);
            text-decoration: none;
        }
    }

    footer {
        font-weight: 300;
            font-family: Helvetica, sans-serif;

        & .icon {
            font-size: 1.2rem;
            translate: 0 .1rem;
            margin-right: .2rem;
        }

        & a {
            color: var(--color-primary);
            text-decoration-line: none;
        }
    }
</style>
