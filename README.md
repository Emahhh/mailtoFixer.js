# `mailto:` links are outdated. `mailtoFixer.js` fixes that.
Mailto links are a simple and effective way to send an email, but users feel frustrated when they click a mailto link and it opens their default email client, which they never wanted. `mailtofixer.js` fixes that.

1. Include the `mailtoFixer.js` in your web page by pasting this code snippet into the `<head>` section of your HTML:
```html
...
```
1. Done! Now, every `mailto:` link in your page is automatically upgraded: when a user clicks on it, it opens a nice modal that gives users the choice to do what they actually want and expect.
screenshot

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

> "But is this actually enough to protect me from spam?" 
> You're right, a spammer could easily find your email address by evaluating the JavaScript in your page or by detecting this syntax. But most spammers are lazy: they don't evaluate JavaScript and are just looking for plain email addresses. This should be enough to protect you from the vast majority of spammers.

## Customization


## Roadmap

Feel free to open a pull request to add more features!

[] Support default subject and body for Gmail and Outlook.
[] Adding dark mode.
[] Add support for other email providers?
[] Nicer UI?

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.