# Site Audit: drhowardmurad.com

**Completed:** January 14, 2026  
**Auditor:** Christopher Eklund

## Pages (7 total)
- / (Home)
- /innovator-pioneer/
- /holistic-wellness/
- /dr-murads-life-story/
- /books/
- /publications/

## Blog Structure
- **Index:** /blog (20 posts per page, infinite scroll on current site)
- **Single:** /[post-slug]
- **Categories:** /blog/[category-slug]
- **Total posts:** 227
- **Pagination strategy (Next.js):** URL-based (?page=1, ?page=2, etc.)

## Blog Categories
- Skincare — 56 posts
- Health & Happiness — 132 posts
- Cultural Stress — 52 posts
- Podcasts — 9 posts
- *Note: Some posts assigned to multiple categories*

## Content Blocks (Reusable Sections)
- Blog category hero
- Blog index hero
- Footer (all pages)
- Sub-footer (all pages)

## Modals & Popups
- 1x Email signup modal (Mailchimp integration)
- 12x Video popups (triggered by links/CSS classes)

## Key Assets
- **Logo:** dhm-logo-signature.svg
- **Favicon:** None (will generate from logo)
- **Custom fonts:** Adobe Caslon Pro, Barlow Semi Condensed, Barlow Semi Condensed Italic
- **Mailchimp audience ID:** [stored securely, not in repo]

## ACF Fields (Blog Posts)
- intro_text
- expanded_content
- content_associated_image
- amazon_book_url
- learn_more_url
- video_popup_button
- image_photo_credit
- image_photo_credit_link

## Technical Notes
- Custom CSS/JS is styling and animation only (no business logic)
- WordPress theme folder audit deferred (front-end inspection sufficient)
- No theme-specific post types needed beyond standard WordPress posts
- Multi-category assignments require careful handling in blog filtering/routing

## Migration Decisions
- Switch from infinite scroll to URL-based pagination
- Use Google Fonts or @font-face for custom typography
- Generate favicon from existing logo
- Preserve all 12 video popups + email modal functionality
- Extract Tailwind tokens from current site styling
