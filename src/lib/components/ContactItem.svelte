<script>
  // Props for the contact
  let { id, username, imageUrl } = $props();
  
  // State for the dropdown menu
  let menuOpen = $state(false);
  
  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (menuOpen && !event.target.closest('.menu-container')) {
      menuOpen = false;
    }
  }

  // Setup event listener for closing the menu
  $effect(() => {
    if (menuOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  });
  
  // Actions for menu items
  function editContact() {
    // Implement edit functionality
    console.log('Edit contact:', id);
    menuOpen = false;
  }
  
  function blockContact() {
    // Implement block functionality
    console.log('Block contact:', id);
    menuOpen = false;
  }
  
  function removeContact() {
    // Implement remove functionality
    console.log('Remove contact:', id);
    menuOpen = false;
  }
  
  // Toggle menu
  function toggleMenu(e) {
    e.stopPropagation();
    menuOpen = !menuOpen;
  }
</script>

<div class="contact-item">
  <div class="contact-info">
    <img src={imageUrl} alt={username} class="contact-avatar" />
    <span class="username">{username}</span>
  </div>
  
  <div class="menu-container">
    <button class="menu-button" onclick={toggleMenu} aria-label="Contact options">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </button>
    
    {#if menuOpen}
      <div class="menu-dropdown">
        <button class="menu-item" onclick={editContact}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>
        <button class="menu-item" onclick={blockContact}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          Block
        </button>
        <button class="menu-item delete-item" onclick={removeContact}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Remove
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .contact-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 8px;
    transition: background-color 0.2s;
    margin-bottom: 4px;
  }

  .contact-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .contact-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .username {
    font-weight: 500;
    color: #333;
  }

  .menu-container {
    position: relative;
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: #666;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }

  .menu-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #333;
  }

  .menu-button:active {
    background-color: rgba(0, 0, 0, 0.15);
    transform: scale(0.96);
  }

  .menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 160px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;
    overflow: hidden;
    margin-top: 8px;
    animation: fadeIn 0.2s ease-out;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 16px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #333;
  }

  .menu-item:hover {
    background-color: #f5f5f5;
  }

  .menu-item:active {
    background-color: #eee;
  }

  .delete-item {
    color: #e53935;
  }

  .delete-item:hover {
    background-color: rgba(229, 57, 53, 0.1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>