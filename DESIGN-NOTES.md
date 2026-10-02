# Reves design and copy policy

The owner requested matching typography, layout and motion from the Gates Foundation reference, adapted to Reves. Reves photographs, source content, programs, links, and identity remain Reves-owned. No Gates marketing copy or photographs are used.

## Theme audit — 2 October 2026

Reference pages inspected: homepage, About, Our Story, Our Work, Ideas; their shared and component styles. The homepage carousel transition was also observed in a browser. This is a recreation for Reves' page templates, not a claim that every page of the reference site was audited.

- Noto Sans Condensed regular/semibold for navigation and controls; Noto Sans ExtraCondensed Black for heavy headings.
- Noto Serif regular/italic for body copy; Noto Serif Condensed Light regular/italic for large mission statements and the new text wordmark.
- Reference yellow #EBCB00, slate #313A44, blue #3579C5. Owner overrides: Reves green #3AF40C hero and header; white #FFFFFF instead of parchment/ivory.
- 2-second gate opening, 750ms carousel fade, 300ms dropdown transitions, 500ms button/image hover transitions. Slides start paused and can be played on a 7-second interval. Manual navigation and keyboard focus stop playback; reduced-motion preference disables autoplay and motion.
- Rebuilt homepage with notched hero, serif mission statement, paired program/story links, feature image, dark filtered project carousel, existing strategic pillars, contact, and yellow support panel.
- Shared fonts, header, footer, buttons, and inner-page typography apply across Reves pages. Existing About timeline and its date caveats are retained.

## Copy editing

The owner authorized homepage text optimization. The conservative interpretation is shortening and arranging existing Reves wording, rather than inventing marketing claims. Hero 1 is shortened from the existing headline and uses the existing About support sentence. Slides 2 and 3 use the Digital Literacy and Big Smile titles/descriptions in the project records. The large mission statement is the existing About vision. The feature uses a verbatim Big Smile excerpt. No new statistics are calculated.

The old fundraising goal/progress panel was removed because its figures lacked a documented source. The footer's contradictory 2014 date was removed; the About timeline retains its documented November 2021 inception. Footer phone and location now match the existing contact section (Kubwa, Abuja; +234 703 707 8046). Full project stories and timeline excerpts are unchanged. See TIMELINE-SOURCES.md.

## Font provenance

Noto font files are self-hosted at public/fonts, with their SIL Open Font License notices. The precise static faces were identified in the reference's public @font-face declarations and fetched from https://www.gatesfoundation.org/assets/fonts/. Upstream license notices: https://github.com/google/fonts/tree/main/ofl/notosans and https://github.com/google/fonts/tree/main/ofl/notoserif. The handwritten partner heading in the reference is an image; Reves uses an editable serif project heading instead.

Reference styles:
- https://www.gatesfoundation.org/Areas/GFO/assets/css/index-generated.css
- https://www.gatesfoundation.org/assets/css/text-over-media-generated.css
- https://www.gatesfoundation.org/assets/css/text-over-carousel-generated.css
- https://www.gatesfoundation.org/assets/css/interactive-timeline-generated.css

## Logo color revision — 2 October 2026

At the owner’s request, the green theme accents are replaced with #F7901E (RGB 247, 144, 30), sampled from the dominant warm yellow-orange pixels of public/reves-logo-dark.png. The semantic token is now --reves-brand. The reference-yellow controls, white backgrounds, photos and copy are unchanged. Green in original images and semantic success messages remains unchanged.

The owner subsequently requested all remaining yellow accents use the logo shade too. --reves-yellow now aliases --reves-brand (#F7901E), including buttons, pagination, project controls and the support panel. Hover uses the darker same-hue #E17A08; pale yellow surfaces use #FDE3C6.
