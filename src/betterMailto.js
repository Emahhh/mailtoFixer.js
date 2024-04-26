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
              <button class="bettermailto-copy-btn" onclick="copyToClipboard('${email}')">Copy</button>
            </div>
          <hr></hr>
          <p class="bettermailto-handle-email-text">Hi</p>
          <div class="bettermailto-handle-options">
              <a href="mailto:${email}" class="bettermailto-btn default-client">Open with Default Email Client</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank" class="bettermailto-btn gmail">Open with Gmail</a>
              <a href="YOUR_OUTLOOK_LINK_HERE" target="_blank" class="bettermailto-btn outlook">Open with Outlook</a>
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
