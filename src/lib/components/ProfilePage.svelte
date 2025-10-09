<script>
  import authStore from '$lib/stores/auth.svelte';
  
  // Destructure store values
  const { user, isAuth, logout } = authStore;
  
  // Local state
  let editMode = $state(false);
  let editedUser = $state({});
  let isSaving = $state(false);
  let saveMessage = $state('');
  
  // Initialize editable copy when entering edit mode
  $effect(() => {
    if (editMode && $user) {
      editedUser = { ...$user };
    }
  });
  
  // Toggle edit mode
  function toggleEditMode() {
    editMode = !editMode;
    saveMessage = '';
  }
  
  // Cancel edits
  function cancelEdit() {
    editMode = false;
    saveMessage = '';
  }
  
  // Save profile changes
  async function saveProfile() {
    isSaving = true;
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the user in the store
      $user = { ...$user, ...editedUser };
      
      saveMessage = 'Profile updated successfully!';
      isSaving = false;
      editMode = false;
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        saveMessage = '';
      }, 3000);
    } catch (error) {
      saveMessage = 'Failed to update profile. Please try again.';
      isSaving = false;
    }
  }
  
  // Navigate to login
  function goToLogin() {
    // In a real app this would use router navigation
    window.location.href = '/login';
  }
</script>

<div class="profile-container">
  {#if $isAuth && $user}
    <div class="profile-card">
      <div class="avatar-container">
        <div class="avatar">
          {#if $user.avatar}
            <img src={$user.avatar} alt={$user.username} />
          {:else}
            <div class="avatar-placeholder">
              {$user.username?.charAt(0).toUpperCase() || '?'}
            </div>
          {/if}
        </div>
        
        {#if !editMode}
          <div class="status-indicator {$user.status?.toLowerCase() || 'offline'}">
            <span class="status-dot"></span>
            <span class="status-text">{$user.status || 'Offline'}</span>
          </div>
        {/if}
      </div>

      {#if !editMode}
        <div class="profile-info">
          <h2 class="username">{$user.username}</h2>
          <p class="email">{$user.email}</p>
          
          <div class="section">
            <h3>About Me</h3>
            <p class="bio">{$user.bio || 'No bio provided yet.'}</p>
          </div>
          
          <div class="actions">
            <button class="edit-button" onclick={toggleEditMode}>
              Edit Profile
            </button>
            <button class="logout-button" onclick={logout}>
              Logout
            </button>
          </div>
        </div>
      {:else}
        <div class="edit-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              id="username" 
              type="text" 
              bind:value={editedUser.username} 
              placeholder="Username"
            />
          </div>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio" 
              bind:value={editedUser.bio} 
              placeholder="Tell us about yourself"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" bind:value={editedUser.status}>
              <option value="Online">Online</option>
              <option value="Away">Away</option>
              <option value="Busy">Busy</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          
          <div class="edit-actions">
            <button 
              class="cancel-button" 
              onclick={cancelEdit}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              class="save-button" 
              onclick={saveProfile}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      {/if}

      {#if saveMessage}
        <div class="save-message" class:error={saveMessage.includes('Failed')}>
          {saveMessage}
        </div>
      {/if}
    </div>
  {:else}
    <div class="auth-required">
      <h2>Authentication Required</h2>
      <p>Please log in to view and edit your profile.</p>
      <button class="login-button" onclick={goToLogin}>Go to Login</button>
    </div>
  {/if}
</div>

<style>
  .profile-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    overflow-y: auto;
    background-color: #f9fafb;
  }
  
  .profile-card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  
  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #f0f2f5;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-placeholder {
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
  
  .status-indicator {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background-color: #9ca3af;
  }
  
  .status-indicator.online .status-dot {
    background-color: #10b981;
  }
  
  .status-indicator.away .status-dot {
    background-color: #f59e0b;
  }
  
  .status-indicator.busy .status-dot {
    background-color: #ef4444;
  }
  
  .profile-info {
    width: 100%;
    text-align: center;
  }
  
  .username {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #111827;
  }
  
  .email {
    font-size: 0.875rem;
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
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .bio {
    font-size: 0.95rem;
    color: #4b5563;
    line-height: 1.5;
  }
  
  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 2rem;
  }
  
  button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  button:hover {
    transform: translateY(-1px);
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .edit-button {
    background-color: #3b82f6;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #2563eb;
  }
  
  .logout-button {
    background-color: transparent;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }
  
  .logout-button:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
  
  .edit-form {
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 0.5rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: #f9fafb;
    color: #1f2937;
    transition: border-color 0.2s ease;
    font-size: 0.95rem;
  }
  
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  textarea {
    resize: vertical;
  }
  
  .edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  
  .save-button {
    background-color: #3b82f6;
    color: white;
  }
  
  .save-button:hover {
    background-color: #2563eb;
  }
  
  .cancel-button {
    background-color: transparent;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }
  
  .cancel-button:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
  
  .save-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    background-color: #ecfdf5;
    color: #047857;
    text-align: center;
    font-size: 0.875rem;
    width: 100%;
    animation: fadeIn 0.3s ease;
  }
  
  .save-message.error {
    background-color: #fef2f2;
    color: #b91c1c;
  }
  
  .auth-required {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 480px;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .auth-required h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }
  
  .auth-required p {
    color: #6b7280;
    margin-bottom: 1rem;
  }
  
  .login-button {
    background-color: #3b82f6;
    color: white;
    padding: 0.75rem 1.5rem;
  }
  
  .login-button:hover {
    background-color: #2563eb;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .profile-container {
      padding: 1rem;
    }
    
    .profile-card, .auth-required {
      padding: 1.5rem;
    }
    
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>