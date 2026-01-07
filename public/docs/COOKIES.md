# Cookie System Documentation

## Overview

This project uses a lightweight, GDPR-compliant cookie consent system.

## How it works

1.  **Detection**: When a user visits the site, the `CookieBanner` component checks `localStorage` for a key named `cookie_consent_v1`.
2.  **Display**: If this key is missing, the banner is displayed at the bottom of the screen.
3.  **Acceptance**: When the user clicks "Accept":
    *   The value `accepted` is saved to `localStorage` under `cookie_consent_v1`.
    *   A technical cookie `app_consent=true` is set in the browser (for verification purposes or server-side checks if needed in the future).
    *   The banner hides immediately.

## Why LocalStorage?

For a static site or SPA (Single Page Application) that doesn't rely on server-side tracking sessions, `localStorage` is a persistent and efficient way to store user preferences without sending data with every HTTP request.

## Debugging

If you don't see the banner:
1.  Open Chrome DevTools (F12).
2.  Go to the **Application** tab.
3.  Check **Local Storage**. If `cookie_consent_v1` exists, delete it and refresh the page to see the banner again.
