# Typography

## Font families

- **Heading font:** `Adobe Caslon Pro`  
- **Body font:** `Barlow Semi Condensed`  
- **Italic / emphasis font:** `Barlow Semi Condensed Italic`  

All headings use Adobe Caslon Pro by default; body copy and UI elements use Barlow Semi Condensed, with Barlow Semi Condensed Italic for emphasized or quote text. [image:41][file:17]

---

## Base font sizes

These are the global text sizes configured in Uncode. [image:41]

| Token                | Size  | Notes                      |
|----------------------|-------|----------------------------|
| Default font size    | `18px`| Base body text             |
| Large text font size | `18px`| Used for larger body/lede  |
| Small text font size | `13px`| Used for captions/metadata |

---

## Heading sizes

Global H1–H6 sizes as defined in the theme options. [image:41]

| Element | Size   | Notes                             |
|---------|--------|-----------------------------------|
| H1      | `34px` | Primary page/post titles          |
| H2      | `45px` | Large section headings            |
| H3      | `24px` | Subsection headings               |
| H4      | `40px` | Emphasized pull/section headings  |
| H5      | `16px` | Small headings / meta labels      |
| H6      | `14px` | Minor labels / overlines          |

*(Exact per-component usage will be confirmed during layout implementation.)* [image:41][file:17]

---

## Line height

Custom line-height defined for H1. [image:41]

| Element | Line height | Notes                        |
|---------|-------------|-----------------------------|
| H1      | `37px`      | Custom line-height token    |

Other headings and body text use Uncode’s defaults inferred from the global typography settings and front-end computed styles. [image:41][file:17]

---

## Letter spacing

Custom letter spacing defined for H4. [image:42]

| Element | Letter spacing | Notes                                                  |
|---------|----------------|-------------------------------------------------------|
| H4      | `-10` (unitless in UI, approx `-0.1em` equivalent) | Tight tracking for H4 headings |

This setting creates a tighter look for H4 headings and should be preserved in the Next.js/Tailwind implementation via a custom tracking utility. [image:42]
