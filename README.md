# mailto: links are outdated. mailtoFixer.js fixes that.


## Quick start

Mailto links are a simple and effective way to send an email, but some users feel frustrated when they click a mailto link and it opens their default email client, which they never wanted. `mailtofixer.js` fixes that.

1. Include the `mailtoFixer.js` in your web page. You can do so by pasting this code snippet before the `</body>` tag in your HTML page:
```html
<script src="https://cdn.jsdelivr.net/npm/mailto-fixer/dist/mailtoFixer.min.js"></script>
```
2. Done! Now, every `mailto:` link in your page is automatically upgraded: when a user clicks on it, it opens a nice modal that gives users the choice to do what they actually want and expect.
<img width="652" alt="image" src="https://github.com/Emahhh/mailtoFixer.js/assets/27818313/a33a6b42-87ed-4364-83cf-95652a0e4597">

<br>

If you prefer, you can also use the npm package: `npm i mailto-fixer`.

## Want to avoid spam? Use the obfuscation feature
In addition to the above, `mailtoFixer.js` also gives you the option to obfuscate your email to protect you from spam.
Spammers often use parsers to look for email addresses in your pages' HTML. To avoid that, gives you the option to use a different syntax for obfuscating your email address.

How to obfuscate your email address?
Instead of using this:
```html
<a href="mailto:john@gmail.com">This is a mailto link</a>
```

Just use this equivalent syntax:
```html
<a href="#" data-mailtofixer-username="john" data-mailtofixer-domain="gmail.com">This is an obfuscated mailto link</a>
```
If you also want the text inside the <a> tag to be replaced with the email address, just add the `data-mailtofixer-replace-content=true` attribute to the <a> tag. Example

```html
<a href="#" data-mailtofixer-username="john" data-mailtofixer-domain="gmail.com" data-mailtofixer-replace-content="true">This text will be replaced with the email address</a>
```
<br>
<br>


> *"Is this actually enough to protect me from spam?"*
> 
> You're right, a spammer could easily find your email address by evaluating the JavaScript in your page or by detecting this syntax. But most spammers are lazy: they don't evaluate JavaScript and are just looking for plain email addresses. This should be enough to protect you from the vast majority of spammers.

## Customization

You can currently customize the look of the modal by overriding the CSS classes defined in the `/src/styles.css` file.


## Roadmap

Feel free to open a pull request to add more features!

- [ ] Support default subject and body for Gmail and Outlook.
- [ ] Adding dark mode.
- [ ] Add support for other email providers?
- [ ] Nicer UI?
- [ ] Add a "click to copy" hover effect?


