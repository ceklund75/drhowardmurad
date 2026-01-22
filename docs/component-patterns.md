# Component Implementation Patterns

Code snippets and implementation details for Next.js components referenced in `layout-patterns.md` and `page-color-mapping.md`.

---

## Hero with Opaque Content Box (Innovator Pattern)

Used when hero has full-cover background image + centered content container with theme-color overlay.

```tsx
interface HeroContentBoxProps {
  backgroundImage: string;
  heading: string;
  body: string;
  themeColor: string;  // Tailwind color class (e.g., 'bg-blueHeading')
  containerClass?: string;
}

export function HeroContentBox({
  backgroundImage,
  heading,
  body,
  themeColor,
  containerClass = '',
}: HeroContentBoxProps) {
  return (
    <section className="relative w-full min-h-[580px] md:min-h-[480px] bg-cover bg-center overflow-hidden">
      <img
        src={backgroundImage}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <div
          className={`${themeColor} border-4 border-white p-8 md:p-12 text-center max-w-md ${containerClass}`}
        >
          <h1 className="text-white text-[42px] md:text-[48px] font-heading mb-6 leading-tight">
            {heading}
          </h1>
          <p className="text-white text-[16px] md:text-[18px] leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## TextImage Section (Alternating Left/Right)

Alternating content/image layout with solid background color, optional background image.

```tsx
interface TextImageSectionProps {
  bgColor: string;              // Tailwind bg color class
  bgImage?: string;              // Optional background image URL
  contentAlignment: 'left' | 'right';
  heading: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
  themeColor: string;           // For heading and button color
  image?: string;               // Optional foreground image
  imagePosition?: 'left' | 'right';
}

export function TextImageSection({
  bgColor,
  bgImage,
  contentAlignment,
  heading,
  body,
  buttonLabel,
  buttonUrl,
  themeColor,
  image,
  imagePosition,
}: TextImageSectionProps) {
  const contentClass = `flex-1 flex flex-col justify-center ${
    contentAlignment === 'left' ? 'order-1' : 'order-2'
  }`;

  const imageClass = `flex-1 ${contentAlignment === 'left' ? 'order-2' : 'order-1'}`;

  return (
    <section
      className={`w-full py-12 md:py-16 ${bgColor} relative`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Content Block */}
          <div className={contentClass}>
            <h2
              className={`text-[42px] md:text-[48px] font-heading mb-6 text-${themeColor}`}
            >
              {heading}
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-700 mb-8 leading-relaxed">
              {body}
            </p>
            <a
              href={buttonUrl}
              className={`inline-block px-8 py-3 text-white bg-${themeColor} hover:opacity-90 transition-opacity rounded-none uppercase font-semibold text-[14px] border border-${themeColor}`}
            >
              {buttonLabel}
            </a>
          </div>

          {/* Image Block */}
          {image && (
            <div className={imageClass}>
              <img
                src={image}
                alt={heading}
                className="w-full h-auto object-cover rounded-none"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## Hero Video Background (Home Page)

Desktop: video background with image overlay. Mobile: static image.

```tsx
interface HeroVideoProps {
  videoUrl: string;
  fallbackImage: string;
  mobileImage?: string;
  heading: string;
  subheading: string;
  rightImage: string;
}

export function HeroVideo({
  videoUrl,
  fallbackImage,
  mobileImage,
  heading,
  subheading,
  rightImage,
}: HeroVideoProps) {
  return (
    <section className="relative w-full min-h-[580px] md:min-h-[480px] flex items-center overflow-hidden">
      {/* Video Background (Desktop Only) */}
      <div className="absolute inset-0 hidden md:block overflow-hidden">
        <video
          autoPlay
          muted
          loop={false}
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <img src={fallbackImage} alt="hero" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Mobile Static Image */}
      <img
        src={mobileImage || fallbackImage}
        alt="hero mobile"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      />

      {/* Content Grid */}
      <div className="relative z-10 w-full h-full">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex flex-col md:flex-row items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-white">
            {subheading && (
              <p className="text-[18px] md:text-[20px] text-mediumPurple font-medium mb-4 animate-fade-in">
                {subheading}
              </p>
            )}
            <h1 className="text-[42px] md:text-[58px] text-blueHeading font-heading leading-tight animate-fade-in delay-200">
              {heading}
            </h1>
          </div>

          {/* Right: Image Overlay */}
          {rightImage && (
            <div className="hidden md:flex flex-1 justify-end">
              <img
                src={rightImage}
                alt="hero right"
                className="max-w-full h-auto animate-fade-in delay-300"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## Card Grid (Books/Publications)

2-column grid of cards with individual color theming.

```tsx
interface CardProps {
  image: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
  themeColor: string;  // Card-specific color
}

interface CardGridProps {
  cards: CardProps[];
  bgImage?: string;
}

export function CardGrid({ cards, bgImage }: CardGridProps) {
  return (
    <section
      className="w-full py-12 md:py-16 px-4"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.heading}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-none overflow-hidden"
            >
              {/* Card Image */}
              <div className="aspect-square md:aspect-auto md:h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8">
                <h3
                  className={`text-[28px] md:text-[32px] font-heading mb-4 text-${card.themeColor}`}
                >
                  {card.heading}
                </h3>
                <p className="text-[16px] text-gray-700 mb-6 leading-relaxed">
                  {card.body}
                </p>
                <a
                  href={card.buttonUrl}
                  className={`inline-block px-6 py-2 text-white bg-${card.themeColor} hover:opacity-90 transition-opacity rounded-none uppercase font-semibold text-[14px] border border-${card.themeColor}`}
                >
                  {card.buttonLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Newsletter CTA Section

Full-width strip with email form and modal trigger.

```tsx
interface NewsletterCTAProps {
  bgColor: string;  // Tailwind bg color
  heading: string;
  subheading?: string;
  onSubmit?: (email: string) => Promise<void>;
  buttonLabel?: string;
}

export function NewsletterCTA({
  bgColor,
  heading,
  subheading,
  onSubmit,
  buttonLabel = 'Subscribe',
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      setLoading(true);
      try {
        await onSubmit(email);
        setEmail('');
        // Show success message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className={`w-full py-10 md:py-16 px-4 ${bgColor}`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Text Block */}
          <div className="flex-1 text-white">
            <h2 className="text-[32px] md:text-[42px] font-heading mb-2">
              {heading}
            </h2>
            {subheading && (
              <p className="text-[16px] md:text-[18px] opacity-90">
                {subheading}
              </p>
            )}
          </div>

          {/* Form Block */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-none border-none text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-white text-mediumPurple font-semibold uppercase rounded-none hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : buttonLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
```

---

## Post Card (Blog Grid)

Individual blog post card component.

```tsx
interface PostCardProps {
  image: string;
  categories: Array<{ name: string; slug: string; color: string }>;
  title: string;
  url: string;
}

export function PostCard({ image, categories, title, url }: PostCardProps) {
  return (
    <article className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-none overflow-hidden">
      {/* Post Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Post Content */}
      <div className="p-4 md:p-6">
        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className={`text-[14px] md:text-[16px] font-semibold uppercase text-${cat.color} hover:opacity-80 transition-opacity`}
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* Title */}
        <a href={url} className="block text-[22px] md:text-[28px] font-heading text-gray-900 hover:text-gray-600 transition-colors">
          {title}
        </a>
      </div>
    </article>
  );
}
```

---

## Scroll-to-Top Button

Back-to-top fixed button with fade-in/out.

```tsx
'use client';

import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gray-400 text-white opacity-50 hover:opacity-100 transition-opacity rounded-none flex items-center justify-center"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null;
}
```

---

## Header with Logo Shrink

Sticky header with scroll-triggered logo shrinking.

```tsx
'use client';

import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-[102px]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="Dr. Howard Murad"
          className={`transition-all duration-300 ${
            isScrolled ? 'h-12' : 'h-20'
          }`}
        />

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          {/* Menu items go here */}
        </nav>
      </div>
    </header>
  );
}
```

---

## Collapsible Section (Accordion)

Native HTML `<details>` or custom React component.

```tsx
/**
 * Option A: Native HTML (Simplest)
 */
export function CollapsibleNative({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="my-[30px] border border-gray-300 rounded-none">
      <summary className="uppercase underline font-medium text-[16px] cursor-pointer p-4 hover:bg-gray-100">
        {title}
      </summary>
      <div className="ml-0 mt-4 p-4 border-t border-gray-300">
        {children}
      </div>
    </details>
  );
}

/**
 * Option B: Custom React Component (More Control)
 */
'use client';

import { useState } from 'react';

export function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-[30px] border border-gray-300 rounded-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left uppercase underline font-medium text-[16px] cursor-pointer p-4 hover:bg-gray-100 flex items-center justify-between"
      >
        {title}
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      {isOpen && (
        <div className="ml-0 mt-0 p-4 border-t border-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}
```

---

## Email Modal (Popup Maker Replacement)

Modal trigger with form submission.

```tsx
'use client';

import { useEffect, useState } from 'react';

interface EmailModalProps {
  theme?: 'purple' | 'cyan';
  onClose?: () => void;
}

export function EmailModal({ theme = 'purple', onClose }: EmailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('email-modal-dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('email-modal-dismissed', 'true');
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const themeClasses = {
    purple: 'bg-mediumPurple text-white',
    cyan: 'bg-cyan text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white/0 via-white/40 to-white/66">
      <div className={`bg-white p-8 rounded-none max-w-md w-full mx-4 shadow-lg`}>
        <h2 className={`text-[48px] font-light mb-6 text-${theme}`}>
          Join Our Newsletter
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-none"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-${theme} text-white font-semibold uppercase rounded-none hover:opacity-90 transition-opacity disabled:opacity-50`}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <button
          onClick={handleClose}
          className="mt-4 text-center w-full text-gray-600 hover:text-gray-800 text-[14px]"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
```

---

## Usage Notes

- All components use Tailwind CSS for styling
- Color classes reference the semantic tokens defined in `tailwind.config.ts`
- Components are designed for Next.js 13+ with `'use client'` directives where needed
- Images use Next.js `<Image>` component in production (replace `<img>` for optimization)
- Forms integrate with `/api/subscribe` endpoint (to be implemented)
- Animations use CSS classes or Framer Motion (configure as needed)
