# The Cleaning Lamb Co. website (preview build)

A plain HTML, CSS and JavaScript site. No build step and no server needed.

```
index.html          the page
css/styles.css      all styling (colors are at the top of the file)
js/app.js           menu, scroll animations, quote form
images/             the five photos used on the page
favicon.svg         browser tab icon
```

## Put it online

**Hostinger**
1. Log in to hPanel and open **File Manager**, then the `public_html` folder.
2. Upload everything from this folder (or upload the zip and extract it there).
3. `index.html` must sit directly inside `public_html`, not in a subfolder.
4. Open your domain or the temporary preview link.

**GitHub Pages**
1. Create a new public repository.
2. Upload everything from this folder so `index.html` is at the top level.
3. Go to **Settings, Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

**Netlify (fastest for a client preview)**
Go to app.netlify.com/drop and drag this folder onto the page. You get a link in about 30 seconds.

All paths are relative, so the site works at the top of a domain or inside a subfolder.

## Where quote requests go

The quote form sends requests to WhatsApp. The visitor fills it in, taps **Request on WhatsApp**, and WhatsApp opens with the request already written. They tap send and it lands in the owner's chat. It needs no server, no account and no cost, so it works on Hostinger, GitHub Pages and Netlify.

To change the number, edit `data-whatsapp="14695076280"` on the `<form>` in `index.html` (digits only, with country code). Also update the `tel:`, `sms:` and `wa.me` links in the Contact section and the floating buttons.

The visitor has to tap send, so this is not an automatic alert. For fully automatic alerts you would need the WhatsApp Business API (for example through Twilio).

## Before this goes live for a real client

- Replace the sample reviews with genuine ones, with permission, and remove the "Sample" tags.
- Replace the photos in `images/` with the client's own work and crew. Keep the same file names, or update the names in `index.html`.
- Confirm the phone number. It appears in the `tel:`, `sms:` and WhatsApp (`wa.me`) links and in `data-whatsapp` on the form.
- Check every service, claim and sentence with the owner. Nothing about insurance, guarantees or years in business has been added, so only add those if they are true.
- Delete the `<meta name="robots" content="noindex, nofollow">` line in `index.html`, otherwise search engines will skip the site.
- Add a privacy policy page if the client collects customer details.
