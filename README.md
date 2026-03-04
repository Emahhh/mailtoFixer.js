<div align="center">
  <h1>mailtoFixer.js ✨</h1>
  <p><strong>Fixing mailto: links and preventing bot spam effectively.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/mailto-fixer"><img src="https://img.shields.io/npm/v/mailto-fixer.svg?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/Emahhh/mailtoFixer.js/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/mailto-fixer.svg?style=flat-square" alt="License"></a>
    <a href="https://unpkg.com/mailto-fixer/dist/mailtoFixer.min.js"><img src="https://badge-size.herokuapp.com/Emahhh/mailtoFixer.js/main/dist/mailtoFixer.min.js?compression=gzip&style=flat-square" alt="gzip size"></a>
  </p>

  <h3><a href="https://emahhh.github.com/mailtoFixer.js">Visit the Live Demo & Website &rarr;</a></h3>
</div>

<br/>

## The Problem
Mailto links are a simple and effective way to send an email, but users feel frustrated when clicking a `mailto:` link automatically opens a default desktop email client (which is rarely configured). 

**`mailtoFixer.js` fixes that.** It instantly converts your `mailto:` links into a beautiful modal, giving users the accessible choice to either copy the address, open their default client, or use web clients like Gmail/Outlook.

In addition, mailtoFixer.js can **protect you from bot spammers** constantly looking for email addresses on the web using a simple automatic obfuscation technique.

<br/>

<table>
  <tr>
    <td align="center"><b>Without mailtoFixer</b></td>
    <td align="center"><b>With mailtoFixer ✨</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/Emahhh/mailtoFixer.js/assets/27818313/0e7e1c8d-b286-4ed8-b85b-d20d23dd548a" alt="without-demo" width="300"></td>
    <td align="center"><img src="https://github.com/Emahhh/mailtoFixer.js/assets/27818313/7a3b0833-da1b-4d5a-99eb-799dd418f086" alt="with-demo" width="300"></td>
  </tr>
</table>

## 🚀 Quick Install

1. Include `mailtoFixer.js` in your web page. Paste this code snippet before the `</body>` tag in your HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/mailto-fixer/dist/mailtoFixer.min.js"></script>
```

2. **Done!**
Now, every `mailto:` link in your page is automatically upgraded into a beautiful popup. It fully supports Dark Mode out of the box.

<br/>

*(Optional) Install via npm:* `npm i mailto-fixer`

---

## 🛡️ Anti-Spam: Obfuscation Feature
In addition to the UI upgrades, `mailtoFixer.js` allows you to obfuscate your email in your HTML to protect it from bots (which scan millions of websites for the `mailto:` string).

Instead of outputting standard links:
```html
<a href="mailto:john@gmail.com">Contact Us</a>
```

You can use this equivalent syntax:
```html
<a href="#" data-mailtofixer-username="john" data-mailtofixer-domain="gmail.com">Contact Us</a>
```

If you also want the text inside the `<a>` tag to be automatically replaced with the generated email address, add `data-mailtofixer-replace-content="true"`:

```html
<a href="#" 
   data-mailtofixer-username="john" 
   data-mailtofixer-domain="gmail.com" 
   data-mailtofixer-replace-content="true">
   This text will automatically become john@gmail.com!
</a>
```

## 🗺️ Customization & Roadmap
You can easily customize the look of the modal by overriding the native classes in CSS (`.mailtofixer-*`). The component ships lightly.

Roadmap:
- [x] Dark mode support.
- [x] Nicer UI & Animations
- [x] Copy to clipboard native API
- [x] Accessibility (A11y, Focus Management).
- [ ] Add localization
- [ ] Support default subject and body parameters.

## 📄 License
MIT License. Pull Requests welcome.
