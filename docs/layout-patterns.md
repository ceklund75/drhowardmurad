## Hero

**Used on:** Home, Holistic Wellness, Innovator & Pioneer, Dr. Murad's Life Story 

**Structure:**
- Full-width section with media background (video on desktop, static image on mobile)
- Two columns on desktop: left text, right supporting image
- Animated or statically positioned content

**Variants:**
### Home Hero
- Desktop: video background (non-looping)
  - Right side: image fades in over the video
  - Left side: subheading fades in, then heading fades in below
- Mobile: no video background
  - Stacked single-column: image, subheading, heading

### Holistic Wellness / Innovator & Pioneer / Life Story Hero
- Desktop: flat background image
  - Centered container with opaque colored background
  - Quote-style heading and body text, both centered
  - Background color defaults to page theme color (Holistic Wellness: magenta, Innovator & Pioneer: blue, Life Story: purple); can be overridden per section
- Mobile: card layout with stacked content
  - Image, heading, quote block stacked vertically

**Tailwind strategy:**
- `relative min-h-[70vh] flex items-center`
- Desktop: `md:grid md:grid-cols-2`
- Background video via absolutely positioned `<video>` in a wrapper with `overflow-hidden`
- Mobile: hide video (`hidden md:block`), show static image

**Edge cases:**
- Long quote text wrapping over multiple lines
- Background image needing dark/light overlay for contrast
- Very long heading/subheading wrapping to multiple lines
- Card background color needing sufficient contrast on mobile


## TextImage (Alternating)

**Used on:** Home, Holistic Wellness, Innovator & Pioneer, Dr. Murad's Life Story 

**Structure:**
- Full-width background section
- Content area constrained to ~1200px width
- Content on opposite side of background subject
- Content block: heading + text + button/link or 'more' link
- Images anchored to different container edges depending on section

**Variants:**

### Home TextImage
- Full-width background image with subject on one side
- Content on opposite side of background subject
- Sections alternate left-right down the page
- Mobile: single-column card layout
  - Mobile image, heading, text, button/link stacked


### Holistic Wellness / Innovator & Pioneer / Life Story Hero
- Desktop: flat background image
  - Centered container with opaque colored background
  - Quote-style heading and body text, both centered
  - Background color defaults to page theme color (Holistic Wellness: magenta, Innovator & Pioneer: blue, Life Story: purple); can be overridden per section
- Mobile: card layout with stacked content
  - Image, heading, quote block stacked vertically

### Books / Publications Hero
- Desktop: flat background image
  - Centered container with opaque colored background
  - Quote-style heading and body text, both centered
  - Not color-coded at page level; uses neutral or inherited color
- Mobile: card layout with stacked content
  - Image, heading, quote block stacked vertically

**Page Theme Colors:**
- Innovator & Pioneer: blue
- Holistic Wellness: magenta
- Life Story: purple

**Edge cases:**
- Section without any CTA (text-only)
- Expanded text ("more" link) changing section height
- Video modal links needing clear affordance
- Missing image
- Very long text overflowing one side
- Image anchoring creating awkward whitespace on certain viewport widths


## CardGrid

**Used on:** Books, Publications

**Structure:**
- Full-width section with background-colored abstract image
- 2-column grid of cards on desktop
- Each card: foreground image (left), content block (right) with heading, text, CTA button/link
- Individual color coding per card (blue, magenta, purple, etc.) set in CMS

**Variants:**
- Colors applied per card (not page-level)
- CTA button color matches card theme color

**Mobile behavior:**
- Single-column card layout: alternates to mobile-specific image (different from desktop)
  - Image, heading, text, button/link stacked vertically

**Edge cases:**
- Cards with very different text lengths affecting grid alignment
- Missing card image → adjust to text-only card
- Color contrast between card theme color and text


## NewsletterCTA

**Used on:** Home (above footer), possibly other pages

**Structure:**
- Full-width strip with distinct background color
- Short heading + supporting text
- Inline form: email input + submit button (or link that triggers email modal)

**Variants:**
- Inline form vs. button that opens modal

**Tailwind strategy:**
- Container: `py-10 px-4 bg-[brandColor] text-white`
- Layout: `md:flex md:items-center md:justify-between gap-4`
- Form: `flex flex-col md:flex-row gap-3`

**Edge cases:**
- Form errors (to be handled in component logic)
- Very narrow mobile widths (stack everything)


## Technical Implementation Details

### Uncode Grid System (To Be Replaced)
- Outer: `.vcrow` → `<section>` with `className="w-full ..."`
- Inner: `.wpbcolumn.col-lg-X` → `<div className="grid-cols-X ...">` (Tailwind grid)
- Content: `.uncol.uncoltable.uncell.uncont` → collapse into single `<div>` (unnecessary nesting)

### CSS Color System
Dynamic color classes: `.text-color-XXXXX-color`, `.btn-color-XXXXX`
- Color 130612 (Purple): used for headings, buttons on Life Story page
- Color 159134 (Green): used for Books page
- Color 110583 (Orange): used for Inclusive Health section
- Color 103352 (Dark): used for footer, default text
- Extract hex values from computed styles in DevTools

### Animations & Interactivity
1. **Scroll Fade-In:** `.animate-when-almost-visible.alpha-anim`
   - Trigger: Element enters viewport
   - Effect: Opacity 0 → 1 over ~600ms
   - **Next.js:** Intersection Observer + Framer Motion or CSS transitions

2. **Hero Animations:** Slider Revolution `data-frame` timeline
   - Simplify to CSS `@keyframes` or Framer Motion
   - Timing: Staggered text (subheading → heading) + image fade-in

3. **Aspect Ratio Lock:** `.custom-1to1-box` (JavaScript calculates height = width)
   - **Next.js:** Use CSS `aspect-ratio` property (modern browsers) or `padding-bottom` hack

### Responsive Visibility
- `.ce-mobile-image-only` (display on mobile only)
- `.ce-nonmobile-only` (hide on mobile)
- **Next.js:** Conditional rendering or Tailwind `hidden md:block` / `block md:hidden`

### Form Integration
- **Current:** Contact Form 7 → Popup Maker modal → Mailchimp (via plugin)
- **Next.js:** Custom modal component → `/api/subscribe` → Mailchimp API
- Form color variants: `.med-purple-form`, `.med-seafoam-form` (theme-specific styling)


## Responsive Image Strategy

**Desktop vs. Mobile Images:**
- Some sections have TWO image assets:
  - Desktop: `.left-image-col` or `.right-image-col` (hidden on mobile)
  - Mobile: `.ce-mobile-image-only` (shown only on screens < 960px)
- Images may be different crops/sizes
- ACF field: likely separate desktop + mobile image fields

**Examples:**
- Books page: Desktop book cover vs. mobile banner crop
- Innovator page: Full-width hero image vs. mobile centered crop

## Scroll Animations

**Fade-In on Scroll:**
- Class: `.animate-when-almost-visible.alpha-anim`
- Trigger: When element enters viewport (Intersection Observer)
- Delay: `data-delay{milliseconds}` (e.g., `data-delay200` = 200ms stagger)
- Effect: `opacity: 0` → `opacity: 1` over ~600ms

## Collapsible Sections (Future Consideration)

**Current:** jQuery Collapse-O-Matic plugin
- `.collapseomatictext` = toggle trigger
- `.collapseomaticexcerpt`, `.collapseomaticcontent` = expanded/collapsed states
- May be worth simplifying to custom React component in Next.js

## Full-Width Sections (Innovator Page)

**Use case:** Break content outside standard 1200px container
- Class: `.full-width-custom-row`
- Technique: `margin-left: -12px; width: calc(100% + 30px);`
- Allows backgrounds/images to extend edge-to-edge



