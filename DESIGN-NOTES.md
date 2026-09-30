# Reves design update — 30 September 2026

Reference studied: https://www.gatesfoundation.org/

The design takes inspiration from its prominent mission statements, editorial typography, documentary photography, simple navigation and generous spacing. Reves retains its own logo, original copy, community images and green identity.

Updated homepage, About, Projects, Stories, Team, shared header/footer and support section. Warm ivory and forest green replace competing colors; serif headings and open grids organize the content. The mobile navigation is a labelled, expandable menu.

The homepage uses the existing PocketBase content service for recent stories. Existing article routes, legacy redirects, donation and volunteer destinations remain usable. The old hard-coded fundraising progress figures are no longer displayed.

Validation: production build/type checks/lint passed (one existing warning in the unused legacy hero carousel). Checked 24 routes and 51 internal links/assets with no failures; four missing-page cases returned appropriate 404s. Visually checked the homepage at desktop and 390px phone width and tested mobile navigation to Projects.

GitHub publication does not confirm deployment to the new Vercel account or completion of the domain transfer.
