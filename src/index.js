import './styles.css';

// Keep track of active modal to prevent duplicates and handle cleanup
let activeModal = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeMailtoFixer();
});

/**
 * Initialize MailtoFixer functionality.
 * Changes every mailto link and custom obfuscated link to replace the content with the email address.
 */
function initializeMailtoFixer() {
  const mailtoLinks = document.querySelectorAll(
    'a[href^="mailto:"], a[data-mailtofixer-username][data-mailtofixer-domain]',
  );

  mailtoLinks.forEach((link) => {
    const email = getEmailFromLink(link);
    if (!email) return;

    // replace the event listener: instead of the default action, open the mailto popup
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openMailtoPopup(email);
    });

    // if this attribute is true, we also have to replace the text content with the actual email address
    if (link.getAttribute('data-mailtofixer-replace-content') === 'true') {
      link.textContent = email;
    }
  });

  console.log(
    `MailtoFixer loaded! ${mailtoLinks.length} mailto links found and converted.`,
  );
}

/**
 * Extracts email from the given link.
 * @param {HTMLElement} link - The link element.
 * @returns {string|null} The email address or null.
 */
function getEmailFromLink(link) {
  if (
    link.hasAttribute('href') &&
    link.getAttribute('href').startsWith('mailto:')
  ) {
    // Extract email from traditional mailto link
    return link.getAttribute('href').replace('mailto:', '').split('?')[0]; // strip query params for display
  } else {
    // Extract email from custom obfuscated link
    const username = link.getAttribute('data-mailtofixer-username');
    const domain = link.getAttribute('data-mailtofixer-domain');
    if (username && domain) {
      return `${username}@${domain}`;
    }
  }
  return null;
}

/**
 * Open a popup within the page with options to handle the given email address.
 * @param {string} email The email address to handle.
 */
function openMailtoPopup(email) {
  // Prevent opening multiple modals
  if (activeModal) return;

  // Prevent background scrolling
  document.body.classList.add('mailtofixer-no-scroll');

  // Create modal overlay element
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'mailtofixer-modal-overlay';
  activeModal = modalOverlay;

  // Icons
  const iconCopy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>`;
  const iconCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
  const iconDefault = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44" /></svg>`;
  const iconGmail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" /></svg>`;
  const iconOutlook = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M88 144a16 16 0 1 1 16-16a16 16 0 0 1-16 16m144-32v96a16 16 0 0 1-16 16H88a16 16 0 0 1-16-16v-16H40a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h56V40a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v64h16a8 8 0 0 1 8 8M112 64h24a16 16 0 0 1 16 16v74.13l40-28.89V48h-80Zm-24 96a32 32 0 1 0-32-32a32 32 0 0 0 32 32m111.26 48L152 173.87V176a16 16 0 0 1-16 16H88v16ZM216 127.65L165.66 164L216 200.35Z" /></svg>`;

  // Modal content
  const modalContent = `
    <div class="mailtofixer-modal" role="dialog" aria-modal="true" aria-labelledby="mailtofixer-title">
      <button class="mailtofixer-close-btn" aria-label="Close modal">&times;</button>
      
      <div class="mailtofixer-email-field">
        <h2 id="mailtofixer-title" class="mailtofixer-title">What would you like to do?</h2>
        <input type="text" class="mailtofixer-email-input" value="${email}" readonly aria-label="Email address">
        <button class="mailtofixer-copy-btn" aria-label="Copy email address">
          <span class="mailtofixer-copy-icon">${iconCopy}</span>
          <span class="mailtofixer-copy-text">Copy address</span>
        </button>
      </div>

      <div class="mailtofixer-divider">Or open with...</div>
      
      <div class="mailtofixer-options">
        <a href="mailto:${email}" class="mailtofixer-btn mailtofixer-default-client">
          ${iconDefault}
          Default email App
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank" rel="noopener noreferrer" class="mailtofixer-btn mailtofixer-gmail">
          ${iconGmail}
          Gmail web
        </a>
        <a href="https://outlook.live.com/mail/0/deeplink/compose?to=${email}" target="_blank" rel="noopener noreferrer" class="mailtofixer-btn mailtofixer-outlook">
          ${iconOutlook}
          Outlook web
        </a>
      </div>
      
      <div class="mailtofixer-powered">
        <a href="https://github.com/Emahhh/mailtoFixer.js" target="_blank" rel="noopener noreferrer">Powered by mailtoFixer.js</a>
      </div>
    </div>
  `;

  modalOverlay.innerHTML = modalContent;
  document.body.appendChild(modalOverlay);

  // Focus trap and accessibility
  const closeBtn = modalOverlay.querySelector('.mailtofixer-close-btn');
  const copyBtn = modalOverlay.querySelector('.mailtofixer-copy-btn');

  // Set initial focus
  setTimeout(() => copyBtn.focus(), 100); // Wait for animation

  const closeModal = () => {
    modalOverlay.classList.add('mailtofixer-closing');

    // Wait for the exit animation to finish before removing
    setTimeout(() => {
      if (document.body.contains(modalOverlay)) {
        document.body.removeChild(modalOverlay);
      }
      document.body.classList.remove('mailtofixer-no-scroll');
      activeModal = null;
      document.removeEventListener('keydown', handleKeydown);
    }, 200);
  };

  // Event listeners for closing
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    // Close only if clicking the overlay background itself, not inside the modal
    if (e.target === modalOverlay) closeModal();
  });

  const handleKeydown = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', handleKeydown);

  // Event listener for copy button
  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern Clipboard API
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // UX Feedback
      copyBtn.classList.add('mailtofixer-copied');
      const iconSpan = copyBtn.querySelector('.mailtofixer-copy-icon');
      const textSpan = copyBtn.querySelector('.mailtofixer-copy-text');

      iconSpan.innerHTML = iconCheck;
      textSpan.textContent = 'Copied!';

      // Reset after 2 seconds
      setTimeout(() => {
        copyBtn.classList.remove('mailtofixer-copied');
        iconSpan.innerHTML = iconCopy;
        textSpan.textContent = 'Copy address';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Optional: Show fallback error state to user
    }
  });

  // Event listeners for provider buttons to close modal after clicking
  const providerBtns = modalOverlay.querySelectorAll('.mailtofixer-btn');
  providerBtns.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });
}
