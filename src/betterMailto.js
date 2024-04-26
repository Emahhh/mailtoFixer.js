// Wrap the initialization function in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  initializeBetterMailto();
});

/**
 * Initialize BetterMailto functionality.
 * Changes every mailto link and custom obfuscated link to open a popup with email client options.
 */
function initializeBetterMailto() {
  const mailtoLinks = document.querySelectorAll(
    'a[href^="mailto:"], a[data-username][data-domain]',
  );

  mailtoLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (
        link.hasAttribute('href') &&
        link.getAttribute('href').startsWith('mailto:')
      ) {
        // Extract email from traditional mailto link
        const email = link.getAttribute('href').replace('mailto:', '');
        openMailtoPopup(email);
      } else {
        // Extract email from custom obfuscated link
        const username = link.getAttribute('data-username');
        const domain = link.getAttribute('data-domain');
        if (username && domain) {
          const email = `${username}@${domain}`;
          openMailtoPopup(email);
        }
      }
    });
  });

  console.log(`BetterMailto loaded! ${mailtoLinks.length} mailto links found.`);
}

/**
 * Open a popup within the page with options to handle the given email address.
 * @param {string} email The email address to handle.
 */
function openMailtoPopup(email) {
  // Create modal overlay element
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'mailto-modal-overlay';

  // Modal content
  const modalContent = `
  <!-- HTML structure for mailto modal -->
  <div class="bettermailto-modal-overlay">
      <div class="bettermailto-modal">
          <button class="bettermailto-close-btn" onclick="closeMailtoPopup()">&times;</button>
          <div class="bettermailto-email-field">
              <input type="text" class="bettermailto-email-input" value="${email}" readonly>
              <button class="bettermailto-copy-btn" onclick="copyToClipboard('${email}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
                Copy
              </button>
            </div>
          <hr></hr>
          <p>Or open with...</p>
          <div class="bettermailto-options">
              <a href="mailto:${email}" class="bettermailto-btn default-client">Default email client</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank" class="bettermailto-btn gmail">Gmail</a>
              <a href="YOUR_OUTLOOK_LINK_HERE" target="_blank" class="bettermailto-btn outlook">Outlook web</a>
          </div>
          <p class="bettermailto-powered">Powered by betterMailto.js</p>
      </div>
  </div>
		`;

  // Set modal content
  modalOverlay.innerHTML = modalContent;

  // Append modal overlay to body
  document.body.appendChild(modalOverlay);
}

/**
 * Close the mailto popup modal.
 */
function closeMailtoPopup() {
  const modalOverlay = document.querySelector('.mailto-modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
}

/**
 * Copy the given text to the clipboard.
 * @param {string} text The text to copy.
 */
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Email address copied to clipboard!');
}
