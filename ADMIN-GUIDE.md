# Reves content admin

Open `/admin` on the website. Sign in with the existing **PocketBase administrator** email and password for `revesfoundation.pockethost.io`. This is separate from GitHub, Vercel, and a PocketHost dashboard login. If you have lost access, recover the PocketHost account or contact the owner of that instance. No new administrator password is embedded in this application.

## First sign-in

Click **Enable editor** once. This authenticated action:

- Adds `websiteStatus` (draft/published), `featuredImageAlt`, `category`, and `photos` to the existing `projects` collection.
- Keeps existing titles, text, dates, authors, photos, IDs, and existing visibility. Empty `websiteStatus` means published for legacy records. The old `isPublished` flag was ignored by the previous website and is not used to hide legacy stories.
- Restricts public list/view rules to records whose `websiteStatus` is not `draft`, preserving any existing rule conditions. Restricts create/update/delete to administrators.
- Makes no changes to other collections, accounts, or site design.

Setup can safely be repeated. It supports PocketBase's legacy `schema` and modern `fields` formats. If existing list/view rules are locked, setup reports this and requires the instance owner to configure the appropriate public read rules.

## Editing

Choose **Edit post**, or **New post**. Edit the title, summary/search description, author, publication date and time, category, cover photo and its alternative text, story content, and extra photos. Use the visual toolbar for headings, bold, italic, underline, lists, quotes, links, and images. The publication time is entered in the editor's local timezone and stored in UTC. Public dates display in Africa/Lagos time.

**Save draft** hides the story from public blog/project listings and its detail page. **Publish post** makes it available immediately. A future publication date is a displayed date, not a scheduled publication. **Save changes** keeps a published story published. **Move to drafts** unpublishes it. There is no destructive delete button.

The blog and projects share the same collection: a saved story appears in both. The homepage promotions and About timeline contain separately curated copy. Their text is not edited here.

Upload extra photos, save, then use **Photo** in the toolbar to insert them into the story. Images are resized to at most 2,000 pixels on the longest edge; each upload must be under 3 MB, with at most 20 extra photos per story. Large batches are rejected before sending; save smaller batches. GIFs preserve animation. The server validates file signatures and types. Photos have public URLs, even when their story is a draft, and are not suitable for confidential material. Remove an image from the story before deleting its underlying photo.

Saving refreshes public page caches. Other already-open browser tabs refresh their list when refocused. Edits remain in the editor if a save fails. Navigating away warns about unsaved work; changes are not automatically saved. A stale record timestamp is detected before updating so ordinary overlapping edits do not silently replace newer work. This check is not a transactional multi-author lock; two exactly simultaneous updates can still conflict.

## Security and operations

Authentication is checked server-side against PocketBase on every admin API request. The token is held only in an HttpOnly, Secure (production), SameSite=Strict cookie; it is not exposed to client scripts or local storage. Mutations require a matching Origin. HTML is sanitized before saving and before public rendering; previews run in a sandboxed iframe. The admin page is excluded from indexing.

The sign-in endpoint has a bounded, per-process throttle; in a multi-instance deployment this is not a shared limit. Keep PocketHost's upstream authentication protections enabled. Administrator credentials retain full permissions in the underlying PocketBase instance; this interface only exposes the post collection. Team roles and a separate limited-permission editor account system are not included.

No environment variables are needed for the existing production database. `POCKETBASE_ADMIN_URL` is a **server-only override for isolated development/test environments**. Do not set it to a different database in production: public content reads use the existing site's configured URL in `src/lib/pocketbase.util.ts`.

## Validation

Run the production build, then `scripts/check-admin.mjs` against a separately started local app and a disposable local PocketBase instance with a `projects` collection matching the old fields. The script refuses non-loopback URLs. Supply `ADMIN_TEST_URL`, `ADMIN_TEST_DATABASE`, `ADMIN_TEST_EMAIL`, and `ADMIN_TEST_PASSWORD` for that disposable instance. Never point the test app's `POCKETBASE_ADMIN_URL` at production.

The integration checks cover sign-in and cookie protections, unauthenticated/cross-origin denial, actual schema changes, preservation of existing public records, rich text sanitization, authors/dates/image descriptions, real multipart cover/gallery uploads, validation, stale edits, publishing, database draft protection, photo removal, and logout. Browser checks cover desktop and mobile sign-in, editing, preview, saving, filtering, publishing, and unsaved-change protection.
