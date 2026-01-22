# Design System Specifications

Extracted from Uncode Theme Options, hmurad02.wpengine.com

---

## 1. Global / General Settings

These settings define the base appearance and behavior of the entire site. [file:47]

### HTML & Body

| Setting                 | Value                | Notes                              |
|-------------------------|----------------------|------------------------------------|
| HTML Body Background    | Light 1 (`#f7f7f7`)  | Main page background color         |
| Accent Color            | Pink (`#c3158a`)     | Used for brand accents             |
| Links Color             | Default              | Standard link color                |
| Body Font Family        | Barlow               | Primary body/UI typeface           |
| Body Font Weight        | 400                  | Regular weight                     |
| Heading Font Family     | Adobe Caslon Pro     | Primary heading typeface           |
| Heading Font Weight     | 400                  | Regular weight                     |
| Heading Letter Spacing  | 0.00                 | No custom tracking on headings     |
| Fallback Font           | Default              | Browser fallback                   |
| Shadows                 | Legacy               | Shadow style system                |
| Cursor                  | Browser              | Standard pointer behavior          |

### Menu Settings

| Setting                    | Value           | Notes                                |
|----------------------------|-----------------|--------------------------------------|
| Menu Highlight Color       | Gold (`#fdc405`)| Hover/active menu item color         |
| Primary Menu Skin          | Light           | Light background for main menu      |
| Primary Submenu Skin       | Light           | Light background for dropdowns      |
| Secondary Menu Skin        | Dark            | Dark background for secondary menu  |
| Menu Font Size             | 15              | Menu item text size (px)             |
| Submenu Font Size          | 15              | Dropdown item text size (px)         |
| Mobile Menu Font Size      | 23              | Mobile/hamburger menu size (px)      |
| Menu Font Family           | Barlow          | Menu typeface                       |
| Menu Font Weight           | 500             | Menu font weight (medium)           |
| Menu Letter Spacing        | 0.05            | Slight tracking on menu items       |
| Menu First Level Uppercase | On              | Capitalize menu items               |
| Menu Other Levels Uppercase| On              | Capitalize submenu items            |

### Light Skin (Header / Navigation)

| Setting                      | Value                    | Notes                          |
|------------------------------|--------------------------|--------------------------------|
| SVG/Text Logo Color          | Dark 4 (`#303133`)       | Logo text color on light bg    |
| Menu Text Color              | White (`#ffffff`)        | Menu item text on light        |
| Primary Menu Background      | Purple-Pink Gradient     | Gradient background for menu   |
| Primary Menu Bg Opacity      | 50%                      | Semi-transparent menu bg       |
| Primary Submenu Background   | Light Gray (`#ebebeb`)   | Dropdown background            |
| Primary Menu Border Color    | Light 3 (`#dddddd`)      | Border between sections        |
| Primary Menu Border Opacity  | Variable (slider)        | Border transparency            |
| Top Bar Background           | Light Gray (`#ebebeb`)   | Top bar/header strip color     |
| Headings Color               | Blue Heading (`#015dcf`) | H1–H6 text color on light      |
| Content Text Color           | Gray (`#464646`)         | Body text color on light       |
| Content Background           | White (`#ffffff`)        | Content area bg on light       |

### Dark Skin (Header / Navigation)

| Setting                      | Value              | Notes                          |
|------------------------------|--------------------|---------------------------------|
| SVG/Text Logo Color          | White (`#ffffff`)  | Logo text color on dark bg     |
| Menu Text Color              | White (`#ffffff`)  | Menu item text on dark         |
| Primary Menu Background      | Dark 2 (`#141618`) | Dark background for menu       |
| Primary Menu Bg Opacity      | Darker setting     | Full opacity for dark menu     |
| Primary Submenu Background   | Dark 3 (`#1b1d1f`) | Darker dropdown on dark skin   |
| Primary Menu Border Color    | Dark 4 (`#303133`) | Border on dark theme           |
| Primary Menu Border Opacity  | Variable (slider)  | Border transparency            |
| Top Bar Background           | Dark 2 (`#141618`) | Dark top bar/header            |
| Headings Color               | White (`#ffffff`)  | White headings on dark         |
| Content Text Color           | White (`#ffffff`)  | White text on dark             |
| Content Background           | Dark 2 (`#141618`) | Dark content area bg           |

---

## 2. Content & Layout

Main content area styling and section behavior.

### Content Area

| Setting          | Value       | Notes                                 |
|------------------|-------------|---------------------------------------|
| Skin             | Light       | Content uses light color scheme       |
| Background Color | Light Gray  | `#ebebeb` — subtle background tint    |

### Buttons & Forms

| Setting                  | Value             | Notes                                    |
|--------------------------|-------------------|------------------------------------------|
| Button Shape             | Default           | Standard button style (no sharp corners) |
| Button Font Family       | Barlow            | Button text uses Barlow                  |
| Button Font Size         | 12                | Small text inside buttons (px)           |
| Button Font Weight       | 500               | Medium weight for button text            |
| Button Text Transform    | Uppercase         | Button labels in uppercase               |
| Button Letter Spacing    | Default           | Standard tracking (no override)          |
| Button Form Fields Border| Enabled (toggle)  | Borders around form inputs               |
| Button Hover Effect      | Outlined          | Outline style on button hover            |
| Button Proportions       | Style 1           | Standard button proportions              |
| Form Inputs Style        | Default           | Standard form field appearance           |

### Filter Menu (Blog/Archive Pages)

| Setting                      | Value       | Notes                             |
|------------------------------|-------------|-----------------------------------|
| Filter Menu Font Family      | Default     | Uses system default               |
| Filter Menu Font Size        | 11          | Small filter label text (px)       |
| Filter Menu Font Weight      | 600         | Bold filter labels                |
| Filter Menu Letter Spacing   | Default     | Standard tracking                 |

### Widgets & UI

| Setting          | Value       | Notes                                    |
|------------------|-------------|------------------------------------------|
| UI Font Family   | Barlow      | Widgets, sidebars, UI text use Barlow    |
| UI Font Size     | 12          | Widget text size (px)                    |
| UI Font Weight   | 400         | Regular weight for UI elements           |
| UI Text Transform| Uppercase   | Widget labels in uppercase               |
| UI Letter Spacing| Default     | Standard tracking for UI text            |

---

## 3. Scroll Behavior & Performance

Controls for smooth scroll, parallax, and sticky elements.

### Scroll & Parallax

| Setting                      | Value  | Notes                                      |
|------------------------------|--------|---------------------------------------------|
| SmoothScroll                 | On     | Enable smooth scrolling behavior            |
| SmoothScroll Constant Speed  | On     | Consistent scroll velocity                 |
| SmoothScroll Constant Speed Factor | ~0.5 (slider) | Speed multiplier for smooth scroll |
| Parallax Speed Factor        | ~2.1 (slider) | Parallax effect intensity               |
| Sticky Elements Scrollable   | On/Off | Toggle for sticky header scrollability      |
| Skew                         | Off    | Disable skew animations on scroll          |

### Footer

| Setting              | Value | Notes                                      |
|----------------------|-------|---------------------------------------------|
| Copyright Skin       | Dark  | Footer uses dark color scheme               |
| Copyright Background | Select (color picker) | Footer background color — varies per page |

---

## 4. Light Skin Details (Menu & Content)

Expanded view of Light Skin color settings used across the site.

### Light Skin Menu

| Component                 | Color Value          | Hex     | Notes                              |
|---------------------------|----------------------|---------|------------------------------------|
| SVG/Text Logo Color       | Dark 4               | #303133 | Logo on light background           |
| Menu Text Color           | White                | #ffffff | Text in menu items                 |
| Primary Menu Background   | Purple-Pink Gradient | —       | Gradient overlay on primary menu   |
| Primary Menu Opacity      | 50%                  | —       | Semi-transparent menu bg           |
| Primary Submenu Background| Light Gray           | #ebebeb | Dropdown menu background           |
| Primary Menu Border Color | Light 3              | #dddddd | Border dividers in menu            |
| Top Bar Background        | Light Gray           | #ebebeb | Header strip at top                |
| Headings Color            | Blue Heading         | #015dcf | All headings on light pages        |
| Content Text Color        | Gray                 | #464646 | Body text on light background      |
| Content Background        | White                | #ffffff | Main content area                  |

---

## 5. Dark Skin Details (Menu & Content)

Expanded view of Dark Skin color settings.

### Dark Skin Menu

| Component                 | Color Value   | Hex     | Notes                              |
|---------------------------|---------------|---------|------------------------------------|
| SVG/Text Logo Color       | White         | #ffffff | Logo on dark background            |
| Menu Text Color           | White         | #ffffff | Text in menu items (dark theme)    |
| Primary Menu Background   | Dark 2        | #141618 | Dark menu background               |
| Primary Submenu Background| Dark 3        | #1b1d1f | Darker dropdown on dark theme      |
| Primary Menu Border Color | Dark 4        | #303133 | Border dividers (dark)             |
| Top Bar Background        | Dark 2        | #141618 | Dark header strip                  |
| Headings Color            | White         | #ffffff | White headings on dark pages       |
| Content Text Color        | White         | #ffffff | White body text on dark            |
| Content Background        | Dark 2        | #141618 | Dark content area                  |

---

## Key Observations for Next.js / Tailwind Implementation

1. **Light/Dark Skin Duality**: Uncode has two complete skin systems (Light and Dark). Consider whether the Next.js site needs both or if one is primary for the blog/marketing pages.

2. **Gradient Menu Background**: The primary menu uses a Purple-Pink Gradient at 50% opacity. This needs to be recreated as a custom Tailwind utility or CSS background property.

3. **Smooth Scroll & Parallax**: Currently enabled with specific speed factors. Decide if these should be:
   - Preserved via JavaScript (Framer Motion, ScrollTrigger, or similar)
   - Simplified or removed for performance
   - Implemented as progressive enhancement

4. **Sticky Header**: Top bar is sticky; confirm scroll shrink animation logic (header height changes with scroll).

5. **Button Styles**: Button text is uppercase, medium weight (500), 12px. This is a global style that should apply across all CTA buttons, forms, and interactive elements.

6. **Color Consistency**: Accent color is Pink (`#c3158a`), but page theme colors (Blue Heading, Medium Purple, Green, etc.) override accents in specific sections. The semantic color mapping will clarify these overrides.

---

## Next Steps

1. Extract specific page-level color overrides (Hero colors per page, category colors for blog, etc.)
2. Document spacing/padding standards (section margins, content max-width, grid gaps)
3. Define responsive breakpoint behavior (where layout shifts from desktop to mobile)
4. Confirm button and form states (hover, focus, disabled)
5. Plan ACF field structure for marketing page sections based on these global settings
