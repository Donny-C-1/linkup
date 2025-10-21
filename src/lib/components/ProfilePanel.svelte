<script>
	import authStore from "$lib/stores/auth.svelte";
	import conversationsStore from "$lib/stores/conversations.svelte";
    import usersStore from "$lib/stores/users.svelte";
	import { onMount } from "svelte";

    let user = $state(authStore.user);

    let ownProfile = $state(true);
	let editMode = $state(false);
    let editedUser = $state({});
    let isSaving = $state(false);
    let saveMessage = $state("");

    $effect(async () => {
        ownProfile = authStore.user.id === usersStore.userProfileID;
        if (usersStore.userProfileID) {
            user = await usersStore.getUser(usersStore.userProfileID);
        }
    })

    function addFriend() {
        conversationsStore.create(usersStore.userProfileID, false);
    }
    

    function toggleEditMode() {
        editMode = !editMode;
        saveMessage = "";
    }

    function cancelEdit() {
        editMode = false;
        saveMessage = "";
    }

    async function saveProfile() {
        isSaving = true;

        try {
            // Simulate API request
            await new Promise(resolve => setTimeout(resolve, 1000));

            Object.assign(user, editedUser);
            // user = { ...user, editedUser };

            saveMessage = "Profile updated successfully";
            isSaving = false;
            editMode = false;

            // Clear success messages after 3 seconds
            setTimeout(() => {
                saveMessage = "";
            }, 3000);
        } catch (err) {
            saveMessage = "Failed to update profile. Please try again.";
            isSaving = false;
        }
    }
</script>

<div class="profile_container">
	<div class="profile_card">
		<div class="avatar_container">
			<div class="avatar">
				{#if user.avatar}
					<img src={user.avatar || "https://randomuser.me/api/portraits/men/18.jpg"} alt={user.username} width="60" height="auto" />
				{:else}
					<div class="avatar_placeholder">{user.username?.charAt(0).toUpperCase() || "?"}</div>
				{/if}
			</div>

			{#if !editMode}
				<div class="status_indicator {user.status?.toLowerCase() || 'offline'}">
                    <span class="status_dot"></span>
                    <span class="status_text">{user.status || "Offline"}</span>
                </div>
			{/if}
		</div>

        {#if !editMode}
            <div class="profile_info">
                <h2 class="username">{user.username}</h2>
                <p class="email">{user.email || "Johndoe@samplemail.com"}</p>

                <div class="section">
                    <h3>About Me</h3>
                    <p class="bio">{user.bio || "No bio provided yet."}</p>
                </div>

                {#if ownProfile}
                <div class="actions">
                    <button class="edit_button" onclick={toggleEditMode}>Edit Profile</button>
                    <button class="logout_button">Logout</button>
                </div>
                {:else}
                <div class="actions">
                    <button class="edit_button" onclick={addFriend}>Add User</button>
                </div>
                {/if}
            </div>
        {:else}
            <div class="edit_form">
                <div class="form_group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" bind:value={editedUser.username} />
                </div>

                <div class="form_group">
                    <label for="bio">Bio</label>
                    <textarea name="bio" id="bio" placeholder="Tell us about yourself" rows="3" bind:value={editedUser.bio}></textarea>
                </div>

                <div class="form_group">
                    <label for="status">Status</label>
                    <select name="status" id="status" bind:value={editedUser.status}>
                        <option value="Online">Online</option>
                        <option value="Away">Away</option>
                        <option value="Busy">busy</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                <div class="edit_actions">
                    <button class="cancel_button" disabled={isSaving} onclick={cancelEdit}>Cancel</button>
                    <button disabled={isSaving} class="save_button" onclick={saveProfile}>{isSaving ? "Saving..." : "Save Changes"}</button>
                </div>
            </div>
        {/if}

        {#if saveMessage}
            <div class="save_message {saveMessage.includes("Failed") && "error"}">{saveMessage}</div>
        {/if}
	</div>
</div>

<style>
	.profile_container {
		display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background-color: #f9fafb;
        overflow-y: auto;
	}

	.profile_card {
		display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 30rem;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .05);
        padding: 2rem;
	}

	.avatar_container {
		display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1.5rem;
	}

	.avatar {
		width: 7.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
        border: 2px solid #f0f2f5;
        box-shadow: 0 4px 6px rgba(0, 0, 0, .1);
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar_placeholder {
		width: 100%;
		height: 100%;
		background-color: #6b7280;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.5rem;
		font-weight: bold;
	}

    .status_indicator {
        margin-top: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .875rem;
        color: #6b7280;
    }

    .status_dot {
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        margin-right: .375rem;
        background-color: #9ca3af;
    }

    .status_indicator.online .status_dot {
        background-color: #10b981;
    }

    .status_indicator.away .status_dot {
        background-color: #f59e0b;
    }

    .status_indicator.busy .status_dot {
        background-color: #ef4444;
    }

    .profile_info {
        width: 100%;
        text-align: center;
    }

    .username {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: .25rem;
        color: #111827;
    }

    .email {
        font-size: .875rem;
        color: #6b7280;
        margin-bottom: 1.5rem;
    }

    .section {
        margin-bottom: 1.5rem;
        text-align: left;
    }

    .section h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: .5rem;
        padding-bottom: .25rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .bio {
        font-size: .95rem;
        color: #4b5563;
        line-height: 1.5;
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: .75rem;
        /* width: 100%; */
        margin-top: 2em;
    }

    button {
        padding: .75rem 1.5rem;
        border-radius: .5rem;
        font-weight: 500;
        cursor: pointer;
        transition: .2s ease;
        border: 0;
    }

    button:hover {
        translate: -1px;
    }

    button:disabled {
        background-color: #3b82f6;
        color: white;
    }

    .edit_button {
        background-color: #3b82f6;
        color: white;
    }
    
    .edit_button:hover {
        background-color: #2563eb;
    }

    .logout_button {
        background-color: transparent;
        color: #4b5563;
        border: 1px solid #d1d5db;
    }

    .logout_button:hover {
        background-color: #f3f4f6;
        color: #1f2937;
    }

    .edit_form {
        width: 100%;
    }

    .form_group {
        margin-bottom: 1.25rem;
    }

    label {
        display: block;
        font-size: .875rem;
        font-weight: 500;
        color: #4b5563;
        margin-bottom: .5rem;
    }

    input, textarea, select {
        width: 100%;
        padding: .75rem;
        border-radius: .375rem;
        border: 1px solid #d1d5db;
        background-color: #f9fafb;
        color: #1f2937;
        transition: .2s ease;
        font-size: .95rem;
    }

    input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, .2);
    }

    textarea {
        resize: vertical;
    }

    .edit_actions {
        display: flex;
        justify-content: flex-end;
        gap: .75rem;
        margin-top: 1.5rem;
    }

    .save_button {
        background-color: #3b82f6;
        color: white;
    }

    .save_button:hover {
        background-color: #2563eb;
    }

    .cancel_button {
        background-color: transparent;
        color: #4b5563;
        border: 1px solid #d1d5db;
    }

    .cancel_button:hover {
        background-color: #f3f4f6;
        color: #1f2937;
    }

    .save_message {
        margin-top: 1rem;
        padding: .75rem;
        border-radius: .375rem;
        background-color: #ecfdf5;
        color: #047857;
        text-align: center;
        font-size: .875rem;
        width: 100%;
        animation: fadeIn .3s ease;
    }

    .save_message.error {
        background-color: #fef2f2;
        color: #b91c1c;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            translate: 5px;
        }

        to {
            opacity: 1;
            translate: 0;
        }
    }
</style>
