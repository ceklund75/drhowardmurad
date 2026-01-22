# Custom CSS & JS Analysis

Extracted from hmurad02 custom stylesheet and JavaScript. These patterns must be replicated or intentionally simplified in Next.js/Tailwind.

---

## 1. Layout & Spacing Patterns

### Container & Padding Resets

| CSS Rule | Purpose | Tailwind Strategy |
|----------|---------|-------------------|
| `.main-container .row-inner > div:not(.vc_helper) { padding: 0; }` | Reset Uncode column padding | Use `px-0` utility or component-level padding |
| `.row .uncont.col-custom-width { border-left/right-width: 0px; }` | Remove Uncode column gutters | Tailwind grid/flex already handles this cleanly |
| `.uncode_text_column { margin-top: 9px!important; }` | Small text column top margin | Use Tailwind spacing scale (`mt-2` ≈ 8px) |
| `.main-container .row-container .row-parent .single-internal-gutter .uncont > * { margin-top: 24px!important; }` | Gutter spacing inside columns | Use `space-y-6` (24px) on flex containers |
| `.custom-row-padding .row.unequal.limit-width.row-parent { padding-top: 0; padding-bottom: 0; }` | Custom section padding | Define per-section padding in Tailwind |

**Decision:** Rather than fighting Uncode's nesting, Next.js components should use clean Tailwind spacing from the ground up. No need for resets.

### Custom Row Heights

| CSS Rule | Value | Notes |
|----------|-------|-------|
| `.ce-custom-row-margin .row-inner, .ce-custom-hero .row-inner { height: 580px; }` | Desktop hero height | Use `min-h-[580px]` or `h-screen` variant |
| `@media (max-width: 1200px)` — `.ce-custom-hero .row-inner { height: 300px; }` | Tablet hero height | Use `md:min-h-[300px]` |
| `@media (max-width: 959px)` — `.ce-custom-hero .row-inner { height: 100%; }` | Mobile hero height | Use `block` (auto height) below `lg` breakpoint |

**Decision:** Encode hero height as a Tailwind variant or component prop. Heights vary by page, so make them configurable via ACF.

### Email/Footer Spacing

| CSS Rule | Value | Notes |
|----------|-------|-------|
| `.signup-row { padding-top: 5%; padding-bottom: 5%; }` | Newsletter section padding | Use `py-12 md:py-16` (relative to section height) |
| `.copyright-custom-row { padding: 0 5%; }` | Footer horizontal padding | Use `px-4 md:px-6 lg:px-8` responsive |
| `.footer-disclaimer { max-width: 768px; margin-left: auto; margin-right: auto; padding-top: 16px; }` | Centered disclaimer block | Use `max-w-[768px] mx-auto pt-4` |

---

## 2. Aspect Ratio & Box Sizing

### Custom 1:1 Box (Image Cards)

**CSS:**
```css
.dhm-quote-1-background-extras {
    width: 100%;
    height: 0;
    padding-top: 88%;
}

.custom-1to1-box {
    /* JavaScript sets height = width */
}

.custom-1to1-box2 {
    /* JavaScript sets height = width */
}
```

**JavaScript:**
```javascript
$(document).ready(function ($) {
    var cw = $('.custom-1to1-box').width();
    $('.custom-1to1-box').css({'height': cw + 'px'});

    var cw2 = $('.custom-1to1-box2').width();
    $('.custom-1to1-box2').attr('style', 'height: ' + cw2 + 'px !important');
});

$(window).on('resize', function(){
    var cw = $('.custom-1to1-box').width();
    $('.custom-1to1-box').css({'height': cw + 'px'});

    var cw2 = $('.custom-1to1-box2').width();
    $('.custom-1to1-box2').attr('style', 'height: ' + cw2 + 'px !important');
});
```

**Tailwind Strategy:**

Use CSS `aspect-square` (modern browsers) or a custom utility:

```tsx
// Component
<div className="aspect-square w-full bg-cover bg-center">
  <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
</div>
```

Or use a React hook for dynamic sizing (if aspect ratio breaks):

```tsx
import { useEffect, useRef, useState } from 'react';

export function CustomAspectBox({ children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetWidth);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div ref={ref} style={{ height: height > 0 ? height : 'auto' }}>
      {children}
    </div>
  );
}
```

**Recommendation:** Use `aspect-square` first; fall back to React hook only if needed.

### Quote Padding (88% ratio)

**CSS:** `.dhm-quote-1-background-extras { padding-top: 88%; }`

**Tailwind:** Create a custom utility or use inline style:
```tsx
<div className="aspect-video">  {/* or use custom aspect ratio */}
  {/* content */}
</div>
```

---

## 3. Logo & Header Behavior

### Logo Shrink on Scroll

**CSS:**
```css
.shrinked .logo-image.logo-skinnable {
    height: 64px!important;
}
```

**Current:** Uses JavaScript scroll listener to toggle `.shrinked` class.

**Next.js Implementation:**

```tsx
'use client';

import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Adjust threshold
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'h-16' : 'h-[102px]'
    }`}>
      <img 
        src="/logo.svg" 
        className={`transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      />
    </header>
  );
}
```

**Values:**
- Normal header height: 102px
- Shrunk header height: ~50–60px
- Logo normal: 84px
- Logo shrunk: 20px

---

## 4. Typography & Text Styling

### Paragraph & Link Defaults

**CSS:**
```css
p, li, dt, dd, dl, address, label, small, pre, code {
    line-height: 1.5;
}

b, strong {
    font-weight: 500;
}
```

**Tailwind mapping:**
```tsx
// Global styles in global.css or Tailwind config
@layer base {
  p, li, dt, dd, dl, address, label, small, pre, code {
    @apply leading-[1.5];
  }
  
  b, strong {
    @apply font-medium;
  }
}
```

### Custom Quote Style

**CSS:**
```css
.custom-quote p {
    color: #c3158a;              /* Pink */
    font-family: adobe-caslon-pro;
    font-size: 48px;
    line-height: 1.1;
}
```

**Tailwind component:**
```tsx
<p className="text-[48px] leading-[1.1] text-pink font-heading text-center">
  {quoteText}
</p>
```

### Collapsed/Expandable Content

**CSS:**
```css
.collapseomatic {
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: 500;
    font-size: 16px;
    margin: 30px 0;
    display: inline-block;
}

.collapseomatic_excerpt, .collapseomatic_content {
    margin-left: 0px;
}
```

**Current:** Uses jQuery Collapse-O-Matic plugin.

**Decision for Next.js:** Replace with native HTML `<details>/<summary>` or custom React component.

**Option A: Native HTML (simplest)**
```tsx
<details className="my-[30px]">
  <summary className="uppercase underline font-medium text-[16px] cursor-pointer">
    Read More
  </summary>
  <div className="ml-0 mt-4">
    {expandedContent}
  </div>
</details>
```

**Option B: Custom React Component (more control)**
```tsx
'use client';

import { useState } from 'react';

export function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-[30px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="uppercase underline font-medium text-[16px] cursor-pointer"
      >
        {title}
      </button>
      {isOpen && <div className="ml-0 mt-4">{children}</div>}
    </div>
  );
}
```

**Recommendation:** Use Option A (native `<details>`) for simplicity; upgrade to Option B only if styling or behavior becomes complex.

---

## 5. Button Styles

### Global Button Reset

**CSS:**
```css
input, textarea, select, .seldiv, .select2-choice, .select2-selection--single,
input[type="submit"], input[type="reset"], input[type="button"], button[type="submit"] {
    border-radius: 0;  /* No rounded corners */
    font-size: 16px;
}

.dhm-button {
    border-radius: 0;
    font-size: 16px;
    height: 50px;
    letter-spacing: 0px!important;
    line-height: 0.75;
    padding: 18px 32px!important;
}
```

**Tailwind button component:**
```tsx
const Button = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'rounded-none text-base h-[50px] px-8 py-[18px] leading-[0.75] uppercase font-medium transition-colors';
  
  return (
    <button className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};
```

### White Button with Color Hover

**CSS:**
```css
.dhm-button.dhm-white.btn-default {
    background-color: transparent!important;
    border: 1px solid #ffffff !important;
}

.dhm-button.dhm-white.btn-default:hover, .dhm-button.dhm-white.btn-default:active {
    background-color: #ffffff !important;
    border: 1px solid #ffffff !important;
}

.dhm-button.dhm-white.blue.btn-default:hover {
    color: #015dcf!important;
}

.dhm-button.dhm-white.cyan.btn-default:hover {
    color: #09b0a2!important;
}

.dhm-button.dhm-white.pink.btn-default:hover {
    color: #c3158a!important;
}

.dhm-button.dhm-white.purple.btn-default:hover {
    color: #91298c!important;
}

.dhm-button.dhm-white.gray.btn-default:hover {
    color: #464646!important;
}
```

**Pattern:** White button outline, on hover fills white bg and changes text color to theme color.

**Tailwind button variants:**
```tsx
interface ButtonProps {
  variant?: 'white-blue' | 'white-cyan' | 'white-pink' | 'white-purple' | 'white-gray';
  children: React.ReactNode;
}

const hoverColorMap = {
  'white-blue': 'hover:text-blueHeading',
  'white-cyan': 'hover:text-cyan',
  'white-pink': 'hover:text-pink',
  'white-purple': 'hover:text-mediumPurple',
  'white-gray': 'hover:text-gray',
};

export function Button({ variant = 'white-blue', children }: ButtonProps) {
  return (
    <button 
      className={`
        border border-white bg-transparent text-white
        hover:bg-white transition-colors
        ${hoverColorMap[variant]}
        rounded-none text-base h-[50px] px-8 leading-[0.75] uppercase font-medium
      `}
    >
      {children}
    </button>
  );
}
```

---

## 6. Form Styling

### Contact Form 7 (CF7) Elements

**CSS:**
```css
input.wpcf7-form-control.wpcf7-text {
    line-height: 1.5;
}

.wpcf7-form-control.wpcf7-submit.btn.btn-accent:hover, 
.wpcf7-form-control.wpcf7-submit.btn.btn-accent:active {
    color: #ffffff !important;
}

.wpcf7-inline-field {
    margin-bottom: 20px;
}
```

**Next.js:** Replace CF7 with custom form or use form library (React Hook Form, Formik).

**Basic form input Tailwind:**
```tsx
<input 
  type="text" 
  className="w-full px-4 py-3 border border-gray-300 rounded-none leading-[1.5]"
/>
```

### Purple Form Theme

**CSS:**
```css
.med-purple-form .wpcf7-text, .med-purple-form .wpcf7-text::placeholder {
    color: #91298c;  /* Medium Purple */
    opacity: 1;
    border-color: #91298c;
}

.med-purple-form .btn-accent {
    background-color: #ffffff!important;
    color: #91298c!important;
    border-color: #91298c!important;
}

.med-purple-form .btn-accent:hover, .med-purple-form .btn-accent:active {
    background-color: #91298c!important;
    color: #ffffff!important;
    border-color: #ffffff!important;
}
```

**Tailwind form component with theme:**
```tsx
interface FormProps {
  theme?: 'purple' | 'cyan';
}

const themeStyles = {
  purple: {
    input: 'border-mediumPurple text-mediumPurple placeholder-mediumPurple',
    button: 'bg-white text-mediumPurple border-mediumPurple hover:bg-mediumPurple hover:text-white hover:border-white',
  },
  cyan: {
    input: 'border-cyan text-cyan placeholder-cyan',
    button: 'bg-white text-cyan border-cyan hover:bg-cyan hover:text-white hover:border-white max-w-[70%]',
  },
};

export function Form({ theme = 'purple' }: FormProps) {
  return (
    <form className="space-y-5">
      <input 
        type="text" 
        className={`w-full px-4 py-3 border-2 rounded-none ${themeStyles[theme].input}`}
      />
      <button 
        type="submit" 
        className={`px-8 py-3 font-medium uppercase transition-colors border-2 rounded-none ${themeStyles[theme].button}`}
      >
        Subscribe
      </button>
    </form>
  );
}
```

### Cyan Form with Width Constraint

```css
.med-seafoam-form .btn-accent {
    max-width: 70%;
}
```

**Tailwind:** Add `max-w-[70%]` to the cyan button variant.

---

## 7. Footer Styling

### Footer Text & Links

**CSS:**
```css
.site-footer p, footer .copyright-custom-row a {
    color: #ffffff;
    font-size: 13px;
    text-transform: uppercase;
}

footer .copyright-custom-row a:hover, footer .copyright-custom-row a:focus {
    color: #fdc405!important;  /* Gold on hover */
}

footer .h5 {
    margin-top: 10px;
}
```

**Tailwind mapping:**
```tsx
export function Footer() {
  return (
    <footer className="bg-dark-1 text-white py-12">
      <p className="text-[13px] uppercase">
        © 2026 Dr. Howard Murad
      </p>
      <a href="/privacy" className="text-[13px] uppercase text-white hover:text-gold transition-colors">
        Privacy Policy
      </a>
      <h5 className="mt-[10px]">Contact</h5>
    </footer>
  );
}
```

### Social Icons

**CSS:**
```css
.footer-social-custom .icon-box-icon, .footer-social-custom .icon-box-content {
    text-align: center;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.footer-social-custom a {
    color: #fdc405;  /* Gold */
}

.footer-social-custom a:hover, .footer-social-custom a:focus {
    color: #ffffff!important;  /* White on hover */
}

.murad-icon {
    margin-bottom: 12px;
    padding-top: 24px!important;
}
```

**Tailwind component:**
```tsx
export function SocialLink({ icon, label, href }) {
  return (
    <a 
      href={href} 
      className="flex flex-col items-center justify-center text-center text-gold hover:text-white transition-colors"
    >
      <div className="text-3xl mb-3 pt-6">
        {icon}
      </div>
      <p className="text-[13px] uppercase font-medium">
        {label}
      </p>
    </a>
  );
}
```

### Back-to-Top Button

**CSS:**
```css
.footer-scroll-top {
    right: 0;
}

.footer-scroll-top.footer-scroll-higher {
    bottom: 0;
}

.footer-scroll-top i {
    border-radius: 0;
    width: 4em;
    height: 4em;
    line-height: 3.8em;
}

.fa-angle-up::before {
    font-size: 38px;
}

.scroll-top .btn-default {
    background-color: #a2a1a0 !important;
    border-color: #a2a1a0 !important;
    opacity: 0.5;
}
```

**Next.js Implementation:**
```tsx
'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-0 right-0 w-16 h-16 bg-[#a2a1a0] text-white opacity-50 hover:opacity-100 transition-opacity rounded-none flex items-center justify-center"
      >
        ↑
      </button>
    )
  );
}
```

---

## 8. Email Modal & Popup Styling

### Popup Container with Gradient Overlay

**CSS:**
```css
.pum.pum-overlay.pum-theme-purple, .pum.pum-overlay.pum-theme-cyan,
.pum.pum-overlay.pum-theme-green-opaque, .pum.pum-overlay.pum-theme-orange-opaque,
.pum.pum-overlay.pum-theme-blue {
    background: linear-gradient(to bottom, rgba(255,255,255,0) 10%, rgba(255,255,255,0.66) 100%);
}

.promo-lead {
    color: #91298c!important;  /* Medium Purple */
    font-weight: 300;
    font-size: 48px;
}

.promo-not-now {
    cursor: pointer;
    color: #707070;
}

.promo-not-now:hover {
    color: #646464;
}

.pum-close.popmake-close {
    display: none;
}
```

**JavaScript:**
```javascript
$('#close-promo').on('click', function(event) {
    $('#pum-65579').popmake('close');
});

var wpcf7Elm = document.querySelector('.wpcf7');
wpcf7Elm.addEventListener('wpcf7submit', function (event) {
    var $form = $(event.target),
        $popup = $form.parents('.pum');
    if (!$popup.length) {
        return;
    }
    
    $popup.trigger('pumSetCookie');
    setTimeout(function () {
        $popup.popmake('close');
    }, 5000);
}, false);
```

**Next.js Modal Component:**
```tsx
'use client';

import { useEffect, useState } from 'react';

interface EmailModalProps {
  theme?: 'purple' | 'cyan';
}

export function EmailModal({ theme = 'purple' }: EmailModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has dismissed modal in session
    const isDismissed = sessionStorage.getItem('email-modal-dismissed');
    if (!isDismissed) {
      // Show after delay or on first load
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('email-modal-dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to Mailchimp API
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white/0 via-white/40 to-white/66">
      <div className="bg-white p-8 rounded-none max-w-md w-full mx-4">
        <h2 className={`text-[48px] font-light text-${theme === 'purple' ? 'mediumPurple' : 'cyan'} mb-6`}>
          Join Our Newsletter
        </h2>
        <Form theme={theme as 'purple' | 'cyan'} onSubmit={handleSubmit} />
        <button 
          onClick={handleClose}
          className="mt-4 text-[#707070] hover:text-[#646464] cursor-pointer"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
```

---

## 9. Carousel (Owl Carousel)

### Carousel Dots

**CSS:**
```css
.owl-dots .owl-dot span {
    width: 10px;
    height: 10px;
    margin: 0px 6px;
}

.owl-dots-inside .owl-dot span {
    box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.3);
}
```

**Current:** Uses Owl Carousel jQuery plugin.

**Next.js Recommendation:** Replace with Swiper or Embla Carousel.

**Swiper example:**
```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

export function Carousel({ items }) {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => 
          `<span class="${className} w-[10px] h-[10px] mx-[6px] shadow-lg"></span>`,
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          {item.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

---

## 10. Responsive Behavior

### Desktop (≥960px)

**CSS:**
```css
@media screen and (min-width: 960px) {
    .menu-wrapper .row-menu .row-menu-inner {
        padding: 0px;
    }
    
    .submenu-light .menu-horizontal .menu-smart ul {
        background-color: #91298c;  /* Medium Purple dropdowns */
    }

    .menu-light .menu-smart a:not(.un-submenu *), 	
    .submenu-light .menu-smart ul a, 
    .submenu-light .overlay-search {
        color: #ffffff!important;
    }

    .menu-light .menu-smart a:hover, 
    .menu-light .menu-smart a:focus {
        color: #fdc405!important;
    }
}
```

**Note:** Submenu background is Medium Purple on desktop. Menu text is white; hover color is Gold.

### Tablet (960px - 1200px)

**CSS:**
```css
@media screen and (min-width: 960px) and (max-width:1024px) {
    .font-size-menu, .menu-container ul.menu-smart > li > a {
        padding-left: 8px;
        padding-right: 8px;
    }
}

@media screen and (max-width:1200px) {
    .menu-wrapper .row-menu .row-menu-inner {
        padding: 0px 8px;
    }
    
    .ce-custom-row-margin .row-inner, .ce-custom-hero .row-inner {
        height: 480px;
    }
    
    .ce-custom-hero .row-inner {
        height: 300px;
    }
    
    .copyright-custom-row {
        padding: 0 5%;
    }
}
```

**Tailwind:** Use `md:` (≥768px) and `lg:` (≥1024px) prefixes.

### Mobile (<960px)

**CSS (extensive):**
```css
@media screen and (max-width: 959px) {
    .submenu-light:not(.isotope-filters):not(.top-menu-enhanced) .menu-smart {
        background-color: #ebebeb;  /* Light Gray dropdowns on mobile */
    }
    
    .ce-mobile-image-only {
        display: block;
    }
    
    .ce-nonmobile-only {
        display: none;
    }
    
    .dhm-button, input[type="submit"], button[type="submit"] {
        font-size: 20px;
        line-height: 0.5;
    }
    
    .tmb-light.tmb .t-entry-text .t-entry-title a {
        font-size: 24px;
    }
    
    .ce-custom-row-margin .row-inner, .ce-custom-hero .row-inner {
        height: 100%;
    }

    .copyright-custom-row {
        display: none;
    }
    
    .copyright-custom-row.mobile {
        display: block;
    }
    
    /* Card styling */
    .ce-custom-row-margin, .col-lg-4.custom-1to1-box, .ce-email-footer-column .row-container {
        margin: 15px !important;
        border-radius: 0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
}

@media screen and (max-width: 570px) {
    input[type="submit"], button[type="submit"] {
        font-size: 17px;
    }
}
```

**Tailwind Strategy:**

Use Tailwind's standard breakpoints (640px, 768px, 1024px) and adjust layout accordingly. For Uncode's 959px breakpoint, either:

**Option A:** Use Tailwind's `lg:` (≥1024px) as closest match
**Option B:** Extend Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        '960': '960px',
      },
    },
  },
};
```

Then use `960:` prefix in Tailwind classes.

**Recommendation:** Use Option A (standard breakpoints) for simplicity. Map:
- Mobile (<640px) — very small
- Tablet (640px–1024px) — medium
- Desktop (≥1024px) — large

**Key mobile behaviors to preserve:**
- Submenu background: Light Gray
- Buttons: 20px font on mobile, 17px on very small screens
- Blog titles: 24px on mobile
- Cards: 15px margin with subtle shadow
- Responsive footer: Hide desktop, show mobile variant
- Mobile/desktop image visibility: Hide `.ce-nonmobile-only`, show `.ce-mobile-image-only`

---

## 11. Blog Post Styling

### Blog Post List

**CSS:**
```css
.t-entry-category a {
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
}

.t-entry-category i.fa {
    display: none;
    visibility: hidden;
}

:not(.tmb-post).tmb .t-entry > *:not(hr) {
    margin: 30px 0px 0px 0px;
}

.tmb-light.tmb .t-entry-text .t-entry-title a {
    color: #464646;
    font-size: 28px;
}

.tmb-light.tmb .t-entry-text .t-entry-title a:hover {
    color: #888888;
}
```

**Category Colors:**
```css
.text-color-159134-color a { color: #015dcf !important; }  /* Blue */
.text-color-169124-color a { color: #6baf1a !important; }  /* Green */
.text-color-364687-color a { color: #09b0a2 !important; }  /* Cyan */
.text-color-130612-color a { color: #c3158a !important; }  /* Pink */
.text-color-103352-color a { color: #91298c !important; }  /* Purple */
.text-color-110583-color a { color: #fc5c0e !important; }  /* Orange */
```

**Tailwind Blog Post Card:**
```tsx
interface PostCardProps {
  title: string;
  categories: Array<{ name: string; slug: string; colorId: string }>;
  image: string;
  href: string;
}

const categoryColorMap: Record<string, string> = {
  'color-159134': 'text-blueHeading',
  'color-169124': 'text-green',
  'color-364687': 'text-cyan',
  'color-130612': 'text-pink',
  'color-103352': 'text-mediumPurple',
  'color-110583': 'text-orange',
};

export function PostCard({ title, categories, image, href }: PostCardProps) {
  return (
    <article className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full aspect-square object-cover" />
      <div className="p-4">
        <div className="flex gap-2 flex-wrap mb-3">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className={`text-[16px] font-medium uppercase ${categoryColorMap[cat.colorId]}`}
            >
              {cat.name}
            </a>
          ))}
        </div>
        <a href={href} className="text-[28px] text-gray hover:text-[#888888] transition-colors block">
          {title}
        </a>
      </div>
    </article>
  );
}
```

---

## 12. Single Post Page

### Image Credit Attribution

**CSS:**
```css
.image-photo-credit {
    padding: 5px;
    font-size: 14px;
}

@media screen and (max-width: 960px) {
    .image-photo-credit {
        padding: 10px 5px 40px 5px;
        font-size: 14px;
    }
}
```

**Tailwind:**
```tsx
<p className="text-[14px] px-1 py-1 md:px-1.5 md:py-2.5 md:pb-10 text-gray-600">
  Photo credit: <a href={creditLink}>{creditText}</a>
</p>
```

### Single Post Lists

**CSS:**
```css
.single-post ul {
    list-style: disc;
    list-style-position: outside;
    margin-left: 15px;
}

li {
    margin-bottom: 18px;
}
```

**Tailwind:**
```tsx
<ul className="list-disc list-outside ml-[15px] space-y-[18px]">
  {items.map((item) => <li key={item}>{item}</li>)}
</ul>
```

### Disclaimer

**CSS:**
```css
.disclaimer {
    font-size: 14px;
}
```

**Tailwind:**
```tsx
<div className="text-[14px] text-gray-600 mt-6 pt-6 border-t border-gray-300">
  {disclaimerText}
</div>
```

---

## Summary of Custom CSS/JS Decisions for Next.js

| Pattern | Current (Uncode) | Next.js Strategy | Priority |
|---------|------------------|------------------|----------|
| **Spacing resets** | Multiple overrides | Clean Tailwind from component level | Low |
| **Hero heights** | Fixed px (580, 300, etc.) | Configurable via ACF + Tailwind variants | High |
| **Aspect ratio boxes** | JS-driven (width=height) | CSS `aspect-square` or React hook | High |
| **Logo shrink** | CSS class toggle via JS | Scroll listener + conditional Tailwind | High |
| **Button styles** | `.dhm-button` global + variants | Tailwind button component with variants | High |
| **Form themes** | `.med-purple-form`, `.med-seafoam-form` | Component props for theme color | High |
| **Modals** | Popup Maker (jQuery) | Custom Next.js `<Modal>` component | High |
| **Collapse plugin** | jQuery Collapse-O-Matic | Native `<details>` or custom React | Medium |
| **Carousel** | Owl Carousel (jQuery) | Swiper or Embla + Tailwind dots | Medium |
| **Responsive visibility** | `.ce-mobile-image-only`, `.ce-nonmobile-only` | Tailwind `hidden lg:block` / `block lg:hidden` | High |
| **Category colors** | Uncode color ID classes | ACF store ID, Tailwind dynamic className | High |
| **Footer variants** | `.copyright-custom-row.mobile` | Conditional rendering or Tailwind display | Medium |
| **Scroll-to-top** | jQuery scroll + DOM manipulation | React hook + Tailwind fixed positioning | Low |

---

## Recommendations

1. **Prioritize the "High" patterns first.** These drive the core appearance and interactivity.
2. **Avoid recreating all custom CSS.** Focus on the 20% of patterns that matter most.
3. **Use ACF to store themeable values** (hero height, button colors, section padding) rather than hardcoding.
4. **Replace jQuery plugins with modern libraries:**
   - Collapse-O-Matic → native `<details>` or custom React component
   - Owl Carousel → Swiper or Embla Carousel
   - Popup Maker → custom Next.js modal with localStorage/sessionStorage
5. **Stick to Tailwind's standard breakpoints** (640px, 768px, 1024px) unless design absolutely requires 960px breakpoint.
6. **Document component variants** as you build so Tailwind config grows organically.
7. **Use Next.js scroll listeners** (useEffect + scroll event) instead of jQuery for header shrink, scroll-to-top, and other dynamic behavior.

---

## Files to Create in Next.js

Based on this analysis, plan these component files:

```
app/
  components/
    Button.tsx          # All button variants
    Form.tsx            # Form with theme props
    EmailModal.tsx      # Email subscription modal
    Header.tsx          # Sticky header with logo shrink
    Footer.tsx          # Footer with social icons
    ScrollToTop.tsx     # Back-to-top button
    Carousel.tsx        # Swiper-based carousel
    Collapsible.tsx     # Collapse component (if needed)
    PostCard.tsx        # Blog post card with categories
    Image.tsx           # Responsive image handling
lib/
  tailwind-config.ts    # Colors, spacing, custom utilities
  hooks/
    useScrollPosition.ts  # Scroll listener utility
    useWindowSize.ts      # Window resize listener
```
