# Instagram feed connection

The Works page displays up to six recent posts from @revesfoundation. Until a connection is configured, it shows only the Instagram profile link. It does not use sample photographs or scrape Instagram.

## Connect the account

1. Use a Business or Creator Instagram account. In Meta for Developers, create/configure an app with Instagram API with Instagram Login, and authorize @revesfoundation with read access (`instagram_business_basic`). Follow Meta's current setup requirements for your app's access level.
2. Generate a long-lived Instagram user access token for that account. Store it directly in the **revesafrica** Vercel project's production environment as `INSTAGRAM_ACCESS_TOKEN` (sensitive). Do not paste it in chat, commit it, or use a `NEXT_PUBLIC_` variable.
3. Redeploy. `/api/instagram` should return `status: "connected"` with public post information only. The server verifies the username is revesfoundation.
4. Arrange token renewal according to Meta's token lifecycle; this implementation does not automatically refresh the credential. If the token expires or access is revoked, the feed falls back to the profile link.

The server caches successful Meta requests for one hour; open pages refresh their feed hourly. Video posts use their thumbnail. Each card opens the original Instagram post. Automatic movement pauses on hover, focus, touch, hidden browser tabs, or reduced-motion preference. Manual previous/next and pause controls remain available as appropriate.

Reference: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/
