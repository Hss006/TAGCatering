# Tacos al Gusto - Catering Website

A single-page catering landing site for Tacos al Gusto, a San Diego Mexican food truck.

## Quick Start

1. Open `index.html` in a browser to view the site.
2. For form submissions, set up Formspree (see below).

## Formspree Setup (Required for Quote Form)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your form ID.
3. In `index.html`, find the form and replace `YOUR_FORM_ID` in the `action` URL:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Form submissions will be emailed to the address you used when signing up.

## Optional: Add Flyer Image

To use your catering flyer in the hero section:
- Place the image in an `assets` folder as `assets/flyer.png`
- The hero already has a green gradient background; you can optionally add an `<img>` or background image in the hero section
