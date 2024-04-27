import './styles.css';

// Wrap the initialization function in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  initializeMailtoFixer();
});

/**
 * Initialize MailtoFixer functionality.
 * Changes every mailto link and custom obfuscated link to open a popup with email client options.
 */
async function initializeMailtoFixer() {
  const mailtoLinks = document.querySelectorAll(
    'a[href^="mailto:"], a[data-mailtofixer-username][data-mailtofixer-domain]',
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
        const username = link.getAttribute('data-mailtofixer-username');
        const domain = link.getAttribute('data-mailtofixer-domain');
        if (username && domain) {
          const email = `${username}@${domain}`;
          openMailtoPopup(email);
        }
      }
    });
  });

  console.log(`MailtoFixer loaded! ${mailtoLinks.length} mailto links found.`);
}

/**
 * Open a popup within the page with options to handle the given email address.
 * @param {string} email The email address to handle.
 */
async function openMailtoPopup(email) {
  // Create modal overlay element
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'mailto-modal-overlay';

  // Modal content
  const modalContent = `
<div class="mailtofixer-modal-overlay">
  <div class="mailtofixer-modal">
    <button class="mailtofixer-close-btn" onclick="closeMailtoPopup()">&times;</button>
    <div class="mailtofixer-email-field">
      <input type="text" class="mailtofixer-email-input" value="${email}" readonly>
      <button class="mailtofixer-copy-btn" onclick="mailtoFixerCopyToClipboard('${email}')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
        </svg>
        <span class="mailtofixer-copy-text">Copy</span>
      </button>
    </div>
    <hr>
    </hr>
    <p>Or open with...</p>
    <div class="mailtofixer-options">
      <a href="mailto:${email}" class="mailtofixer-btn default-client">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="black"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44" />
        </svg>
        Default email client</a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank" class="mailtofixer-btn gmail">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="black"
            d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
        </svg>
        Gmail</a>
      <a href="https://outlook.live.com/mail/0/deeplink/compose?to=${email}" target="_blank" class="mailtofixer-btn outlook">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
          <path fill="black"
            d="M88 144a16 16 0 1 1 16-16a16 16 0 0 1-16 16m144-32v96a16 16 0 0 1-16 16H88a16 16 0 0 1-16-16v-16H40a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h56V40a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v64h16a8 8 0 0 1 8 8M112 64h24a16 16 0 0 1 16 16v74.13l40-28.89V48h-80Zm-24 96a32 32 0 1 0-32-32a32 32 0 0 0 32 32m111.26 48L152 173.87V176a16 16 0 0 1-16 16H88v16ZM216 127.65L165.66 164L216 200.35Z" />
        </svg>
        Outlook web</a>
    </div>
    <p class="mailtofixer-powered">Powered by mailtoFixer.js</p>
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
async function closeMailtoPopup() {
  const modalOverlay = document.querySelector('.mailto-modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
}

/**
 * Copy the given text to the clipboard and provide user feedback.
 * @param {string} text The text to copy.
 */
async function mailtoFixerCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Save the previous text content of the button
  const copyButton = document.querySelector('.mailtofixer-copy-btn');
  const previousText = copyButton.querySelector(
    '.mailtofixer-copy-text',
  ).textContent;

  // Update the text content of the button to display the feedback message
  copyButton.querySelector('.mailtofixer-copy-text').textContent = 'Copied!';

  // Restore the previous text content after a short delay
  setTimeout(() => {
    copyButton.querySelector('.mailtofixer-copy-text').textContent =
      previousText;
  }, 1500);
}
