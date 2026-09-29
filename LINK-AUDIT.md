# Site link audit — 29 September 2026

Checked the production build of this repository, not the inaccessible old Vercel account.

## Repairs

- Desktop/mobile mission, impact, programs and donation links now lead to existing content. Added legacy route redirects.
- Blog listing now uses the same content source as project details. Existing article IDs and four legacy article slugs redirect to the canonical project pages.
- Restored the contact section and provided an email alternative when EmailJS settings are absent.
- Replaced dead footer links with working destinations. Removed the unavailable Terms of Use link; privacy and tax links explicitly request information by email instead of pretending documents exist.
- Replaced the absent annual-report download with an accurately labelled email request.
- Fixed the footer telephone destination to match its displayed number and normalized API/file URLs.
- Added useful error and not-found pages, project ID checks, and missing-photo fallbacks.
- Cleaned up the homepage animation loop on navigation.

## Validation

- Production build, TypeScript validation and lint completed successfully. One pre-existing hero carousel effect dependency warning remains.
- 24 pages/legacy routes and 66 internal links/assets passed HTTP and fragment checks.
- Unknown page, invalid project ID, absent project ID and absent team username returned 404 with recovery links.
- Browser confirmed content loads and mission/impact navigation works.
- Donation and map destinations respond. Volunteer form opens in the signed-in browser; anonymous requests require Google authentication. No forms or payments were submitted.
- Facebook redirects to login. LinkedIn blocks automated requests (999), so its public accessibility could not be fully verified. Instagram and X respond successfully.

Run against a running production server with `python3 scripts/check-links.py http://localhost:3000` (requires curl and access to the content service).

## Remaining owner-managed items

- Supply an actual annual report and approved legal documents if these should be downloadable.
- Configure NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in Vercel to enable the contact form, then redeploy. The email alternative works without these.
- The footer and contact section contain different phone numbers and addresses; the map points to Jahi while its text says Kubwa. These business details need owner confirmation rather than guessed replacements.
- Publishing this commit to GitHub does not itself confirm the new Vercel deployment or domain configuration.
