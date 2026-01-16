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

## Blog Post Grid

**Used on:** Blog listing, Category archives

**Structure:**
- Full-width section with edge padding
- Hero section (same as other internal pages)
- Category filter breadcrumbs (below hero)
- 3-column grid of post cards on desktop
- 1-column on mobile
- 18px gap between cards
- 20 posts per page
- Pagination controls below grid

**Category Filter Breadcrumbs:**
- Horizontal list of color-coded category links
- "All Posts" or unlabeled first item (for `/blog`)
- Current category highlighted or bold
- Format: `All > Skincare > Health & Happiness > Podcasts`
- Links to `/blog` or `/blog/category/[slug]`
- Mobile: wrapped or scrollable

**Post Card Stacking (top to bottom):**
- Image: 1:1 aspect ratio, full card width
- Categories: Multiple color-coded text links, separated by commas
  - Each category is its own link (e.g., `Skincare, Health & Happiness`)
  - Colors map to category theme (extract from existing design)
  - Uppercase, bold (500), 16px
  - Icon optional (`.fa-archive2` in current design)
- Title: Heading link (h3), multi-line if needed, not truncated

**Card internals:**
- Image fills container width (no padding around image)
- Category and title sections have padding below image
- Card background: white or transparent
- Shadow: Subtle (0 1px 3px rgba(0,0,0,0.12))
- Hover state: Increased shadow, optional scale

**Pagination:**
- Located below post grid
- Centered alignment
- Style: Numbered buttons (1, 2, 3...) or prev/next with page numbers
- Current page highlighted
- URL structure: `/blog?page=1`, `/blog?page=2`, `/blog/category/skincare?page=2`
- Server-side routing (no JavaScript state)
- Shareable URLs (SEO-friendly)

**Responsive Behavior:**
- Desktop (≥1024px): 3-column grid, full-width container
- Tablet (640–1024px): Possibly 2-column or 3-column (TBD from HTML details)
- Mobile (<640px): 1-column, full-width with edge padding

**Tailwind strategy:**
- Container: `w-full px-[edge-padding]`
- Grid: `grid grid-cols-3 gap-[18px] md:grid-cols-1`
- Image: `aspect-square w-full object-cover`
- Category links: `text-[16px] font-semibold uppercase text-[category-color]`
- Title: `text-[1.5rem] font-bold leading-tight text-gray-900`
- Pagination: centered buttons with URL navigation (Link components)

**Edge cases:**
- Posts with multiple categories wrapping across lines
- Very long post titles spanning 2+ lines
- Missing category (shouldn't happen, but graceful fallback)
- Last page with fewer than 20 posts
- No results for filtered category (empty state)


## Single Post Page

**Used on:** Individual blog posts (`/blog/[slug]`)

**Structure:**
- Full-width page with standard site header and footer
- Two-column layout on desktop: article content (left) + supporting media/CTA sidebar (right)
- Single-column stack on mobile
- Breadcrumb navigation above main content

**Breadcrumb Row**
- Format: `All > [Category] > [Post Title]`
- "All" links to `/blog`
- Category links to `/blog/category/[slug]`
- Current post title is plain text (non-linked)
- Small text, secondary color, centered alignment

**Article Content (Left Column - Desktop)**

Header Block
- Post title (H1): Large serif or display font, normal sentence case
- Category line: Multi-category support (comma-separated)
  - Format: `Skincare, Health & Happiness`
  - Each category is a clickable link with category-specific color
  - Uppercase, bold (500), 16px

Body Content (ACF-driven)
- `intro_text` (WYSIWYG) — rendered first, required
- `expanded_content` (WYSIWYG) — appended after intro_text, optional
- Paragraphs: 16–18px, line-height 1.5, margin-bottom 18px
- Lists: `list-style: disc`, left margin 15px, item margin-bottom 18px
- **Bold/Strong**: font-weight 500
- *Italic/Emphasis*: italic styling

Footer CTA Block (within/below article)
- When `amazon_book_url` present: "BUY ON AMAZON.COM" button
- When `learn_more_url` present: secondary "Learn More" link
- When `video_popup_button` present: video modal trigger button with custom label

**Supporting Media & Newsletter (Right Column - Desktop)**

Featured Image Block
- `content_associated_image` (optional): supporting image constrained to column width
- Photo credit attribution:
  - Display `image_photo_credit` text below image (14px)
  - When `image_photo_credit_link` present: make credit text a hyperlink
  - Align right, subtle gray color

Newsletter Signup
- Title: "Modern Wellness Digest"
- Subtitle: "Sign-up to receive periodic updates and wellness insights from Dr. Murad himself."
- Form: First Name + Email fields, submit button
- Purple background with inner card styling
- Border and subtle shadow matching current design aesthetic

**Post Footer / Utilities**

Share Block
- Heading: "SHARE THIS POST"
- Icon-only buttons: Facebook, X/Twitter, Pinterest, LinkedIn, Email
- Horizontal layout, standard share URLs (no JavaScript dependency)

Disclaimer
- Small (14px) legal/medical disclaimer text
- Bordered box or spaced block
- Neutral color, static copy

**ACF Field Mapping:**

| ACF Field | Location | Behavior |
|-----------|----------|----------|
| `intro_text` | Top of article | Rendered first, full WYSIWYG HTML |
| `expanded_content` | Below intro_text | Appended if present, same typography |
| `content_associated_image` | Right column sidebar | Displays supporting image with credit |
| `image_photo_credit` | Below featured image | Small text attribution |
| `image_photo_credit_link` | Below featured image | Link target for credit text |
| `amazon_book_url` | Article footer CTA | "Buy on Amazon" button |
| `learn_more_url` | Article footer CTA | Secondary "Learn more" link |
| `video_popup_button` | Article footer CTA | Video modal trigger button |

**Responsive Behavior:**

| Breakpoint | Layout |
|-----------|--------|
| ≥1024px (Desktop) | Two-column: content left (65%), sidebar right (35%) |
| 640–1024px (Tablet) | Responsive: may stack or adjust column widths |
| <640px (Mobile) | Single column: article → image → newsletter |

**Tailwind Strategy:**
- Container: `max-w-[1200px] mx-auto px-4 md:px-6`
- Main grid: `grid md:grid-cols-3 gap-8`
  - Left column (content): `md:col-span-2`
  - Right column (sidebar): `md:col-span-1`
- Category links: `text-sm md:text-base font-semibold uppercase text-[category-color]`
- Body prose: `prose prose-lg` or custom `text-base md:text-lg leading-relaxed space-y-4`
- Photo credit: `text-xs md:text-sm text-gray-600 mt-2 text-right`
- Newsletter CTA: reuse `NewsletterCTA` component with purple theme variant
- Share buttons: `flex gap-3 justify-center md:justify-start`

**Edge Cases:**
- Posts without `expanded_content` → only intro renders; maintain visual breathing room
- Posts without `content_associated_image` → sidebar displays only newsletter CTA
- Missing `image_photo_credit` but image present → omit credit block
- No `amazon_book_url` / `learn_more_url` → hide those buttons, show share + disclaimer only
- Long post titles spanning multiple lines → ensure consistent padding and alignment
- Multi-category wrapping → maintain uppercase styling and color coding per category
- Very long category names → consider truncation or line wrapping strategy


## Header (Global Navigation)

**Used on:** All pages (sticky fixed header)

**Structure:**
- Fixed sticky wrapper: 102px height at top, shrinks on scroll
- Logo left side: SVG image with shrink animation (84px → 20px height)
- Navigation menu right side: 5 main page links + 1 dropdown (Blog)
- Mobile: Hamburger menu toggle → off-canvas drawer

**Layout (Desktop):**
- Outer wrapper: `.menu-wrapper` (sticky, height 102px)
- Inner header: `<header id="masthead">` with navigation role
- Container: `.menu-container` (1200px max-width, centered)
- Two-column grid:
  - Left: Logo container (col-lg-0)
  - Right: Menu container (col-lg-12)

**Primary Menu Items (5 pages):**
- Innovator & Pioneer (color: 130612 magenta)
- Holistic Wellness (color: 110583 orange)
- Life Story (color: 103352 purple)
- Books (color: 169124 green)
- Publications (color: 159134 teal)
- Blog (color: 364687 teal) — **has dropdown**

**Blog Submenu (4 categories):**
- Skincare
- Cultural Stress
- Health & Happiness
- Podcasts

Each category links to `/blog/category/[slug]`

**Logo Behavior:**
- Starting height: 84px (data-maxheight)
- Shrunk height: 20px (data-minheight)
- SVG image: 1×1 placeholder, CSS handles sizing
- No padding shrink on click (data-padding-shrink="0")
- Smooth transition as user scrolls

**Mobile Menu Behavior:**
- Hamburger button: `.mobile-menu-button` (lines-button style)
- Menu collapse into off-canvas drawer on small screens
- Close button inside drawer: `.uncode-close-offcanvas-mobile`
- Drawer: Full-width, slides from left or overlays
- Keyboard accessible: hamburger button has tabindex="0", role="button"

**Color System:**
- Each menu item gets `.text-color-XXXXX-color` class
- Colors map to design system tokens
- Color values tied to page theme (Innovator Pioneer = purple, Books = green, etc.)
- Applied to `<a>` text link color

**Accessibility:**
- Header: `role="navigation"` on menu-container
- Menu: `role="menu"` on ul, `role="menuitem"` on li
- Dropdown: `aria-haspopup="true"`, `aria-expanded="false"` on trigger link
- Mobile button: `aria-label="Toggle menu"`, `role="button"`, `tabindex="0"`
- Dropdown icon: `<i class="fa fa-angle-down fa-dropdown"></i>` (FontAwesome)

**Responsive Behavior:**

| Breakpoint | Layout |
|-----------|--------|
| ≥960px (Desktop) | Full horizontal menu, all items visible, color-coded, dropdown on hover |
| <960px (Mobile) | Hamburger menu visible, off-canvas drawer on toggle, dropdown items in drawer |

**Sticky/Shrink Animation:**
- Trigger: Window scroll event (requestAnimationFrame or Intersection Observer)
- Effect: Header height decreases, logo height decreases proportionally
- Duration: Smooth CSS transition (0.3–0.6s recommended)
- Starting point: Top of page (102px)
- Ending point: ~50–60px at scroll threshold
- Logo: Linear interpolation from 84px → 20px

**Tailwind Strategy:**
- Wrapper: `fixed top-0 left-0 right-0 z-50 bg-white h-[102px] transition-all duration-300`
- Container: `max-w-[1200px] mx-auto px-4 md:px-6 h-full`
- Grid: `flex items-center justify-between h-full`
- Logo: `h-[84px] md:h-[50px] transition-all duration-300`
- Nav: `hidden md:flex gap-6`
- Menu items: `text-base font-semibold uppercase transition-colors duration-200`
- Dropdown: `relative` with child `absolute hidden group-hover:block`
- Mobile button: `md:hidden flex flex-col gap-1 cursor-pointer`

**Data Sources:**
- Main menu items: Hardcoded or fetch from WordPress REST/GraphQL
- Blog categories: Fetch from WordPress GraphQL API
  ```graphql
  query GetBlogCategories {
    categories(first: 10) {
      nodes {
        id
        name
        slug
      }
    }
  }


## Footer (Global)

**Used on:** All pages (site-wide footer)

**Structure:**
- Full-width footer section at bottom of page
- White background with centered content
- Three distinct content blocks stacked vertically
- Different layouts for desktop and mobile

**Layout:**

### Block 1: Social & Brand Links (Top)
- 3 icon-based links in horizontal layout
- Uses `.icon-box` component pattern (icon + centered heading below)
- Links:
  1. **Twitter** — FontAwesome `fa-twitter` icon, text "Follow Dr. Murad"
     - Link: https://twitter.com/drmurad (opens new tab)
  2. **Murad.com** — Custom image logo (98×27px)
     - Link: https://murad.com (opens new tab)
  3. **Mobile App** — FontAwesome `fa-device-phone` icon, text "GET THE APP"
     - Link: https://itunes.apple.com/us/app/dr.-murads-inspirations/id899453028?mt=8 (iTunes)

- All icons: 3x size, brown/tan color (.text-color-826926-color)
- All text: H5 style, font-weight 400–500
- Alignment: Centered, horizontal layout (3 equal columns on desktop)
- Space above and below: Empty divider blocks

### Block 2: Brand Quote (Center)
- Full-width, centered section
- **Quote text (H1):** "Skin is the body's window to wellness." (italic)
- **Attribution (H5):** "-Dr. Howard Murad" (uppercase, bold 500)
- Color: Dark gray (.text-color-xsdn-color)
- Spacing: Empty dividers above and below

### Block 3: Contact & Legal Info (Bottom)

**Desktop Layout:**
- **Section 1** (Centered):
  - Email: `info@drhowardmurad.com` (mailto link)
  - Separator: " | "
  - Privacy Policy link: `/privacy-policy/`

- **Section 2** (Centered):
  - Copyright: "© 2023 Dr. Howard Murad, All rights reserved. Dr. Howard Murad, Murad LLC."
  - Address: "2121 Park Place, 1st Floor, El Segundo, CA 90245" (Google Maps link)
  - Disclaimer: Medical/legal disclaimer text (14px, smaller, left-aligned inside centered section)

**Mobile Layout:**
- **Row 1** (3-column grid):
  - Left: Privacy Policy link
  - Center: "Dr. Howard Murad, Murad LLC" + Address + Email
  - Right: "© 2023 Dr. Howard Murad, All rights reserved"

- **Row 2** (Full-width):
  - Medical disclaimer (same as desktop, full width)

### Typography
- Social headings: H5, font-weight 400
- Quote: H1, italic, font-weight 400
- Attribution: H5, font-weight 500, uppercase
- Body links: 14px, standard link color
- Disclaimer: 14px, smaller text, dark gray

### Colors
- Social icon links: `.text-color-826926-color` (brown/tan, brand accent)
- Text: `.text-color-xsdn-color` (dark gray, default)
- Background: White (default)
- Links: Standard link color, underline on hover

### Spacing
- Top/bottom padding: 5% (relative)
- Left/right padding: 5% (relative on rows, can adjust)
- Empty space dividers: Between social, quote, and legal sections
- Section gap: 20–30px (visual breathing room)

### Responsive Behavior

| Breakpoint | Layout |
|-----------|--------|
| ≥960px (Desktop) | Centered layout; social 3-column; legal sections stacked; disclaimer inline |
| <960px (Mobile) | Social may stack or 3-column depending on width; legal info: 3-column grid; disclaimer full-width |

### Data Sources
- Social links: Hardcoded or ACF options (Twitter URL, Murad.com, iTunes link)
- Quote: Hardcoded or ACF text field
- Contact info: ACF fields or WordPress settings (email, address)
- Copyright year: Dynamic (JavaScript: `new Date().getFullYear()`)
- Privacy Policy link: Internal page slug (ACF or hardcoded)

### Tailwind Strategy
- Wrapper: `w-full bg-white py-12 md:py-16 px-4 md:px-6`
- Container: `max-w-[1200px] mx-auto`
- Social section: `flex flex-col md:flex-row justify-center gap-12 md:gap-20 items-center mb-12`
- Social link: `flex flex-col items-center gap-4`
- Icon: `text-3xl text-[#826926]` (brown/tan)
- Social heading: `text-center text-sm md:text-base font-medium`
- Quote block: `text-center mb-12`
  - Quote: `text-2xl md:text-3xl italic text-gray-700 mb-4`
  - Attribution: `text-sm md:text-base font-semibold uppercase text-gray-700`
- Legal section: `text-center text-sm text-gray-600 space-y-6`
- Links: `text-gray-700 hover:underline`
- Disclaimer: `text-xs md:text-sm text-gray-600 text-left py-6 border-t border-gray-200`
- Mobile-specific: Use `hidden md:block` and `md:hidden` for layout variants

### Accessibility
- Footer: `role="contentinfo"` semantic landmark
- Links: Clear text labels, `target="_blank" rel="noopener noreferrer"` for external links
- Address link: Google Maps (accessible destination)
- Email link: `mailto:` protocol for easy copying/sending
- Heading hierarchy: H1 (quote), H5 (attribution, social headings)
- Disclaimer: Screen reader accessible, semantic structure

### Edge Cases
- Copyright year hardcoded → must update annually (use dynamic year in code)
- Email or address changed → store in ACF or env variable, not hardcoded
- Social links broken → add fallback or hide if unavailable
- Mobile layout too narrow → may need to adjust column count or stack further on very small screens (< 375px)
- Disclaimer text very long → ensure it wraps cleanly and remains readable on mobile
- Missing address → omit or replace with office hours/contact form link
- Quote text very long → may wrap to multiple lines, ensure centered and readable

### Component Structure (Next.js)
- `Footer.tsx` — Main wrapper and layout management
- `FooterSocial.tsx` — Social links section with 3 icon boxes
- `FooterQuote.tsx` — Brand quote and attribution
- `FooterLegal.tsx` — Contact, copyright, disclaimer, privacy link
- `FooterMobile.tsx` — Mobile-specific layout (or conditional rendering in Footer.tsx)
- `useCurrentYear.ts` — Custom hook for dynamic copyright year

**Notes:**
- Footer is simpler than typical modern footers (no newsletter, no multi-column link grid)
- Focus on social/brand presence, legal compliance, and direct contact
- Strong visual hierarchy: Social → Quote → Legal
- Mobile-responsive but maintains same visual hierarchy across breakpoints
