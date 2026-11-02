# Shizu — Japanese Interior Design Studio

Website for **Shizu (静)**, a Japanese interior design studio creating homes, cafés, restaurants and offices built around comfort and atmosphere. This is the coded version of the site; a matching Framer version is built from the same design and content.

Built with **Next.js 15 (App Router)**, **GSAP 3** (ScrollTrigger + SplitText) and **Lenis** smooth scrolling.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, philosophy (間 Ma), four space chapters, styles explorer, selected work, testimonials, contact |
| `/work` | Full project index with filter by space |
| `/work/[slug]` | Project detail: summary, meta, cover, story, next project |
| `/spaces/[slug]` | Projects filtered to one space (Home Living, Café & Coffeeshop, Restaurant, Office) |

All pages are statically generated.

## Interactions

- **Preloader** on the first visit of a session, then a **page-transition curtain** between routes
- **Lenis** smooth scroll, synced with GSAP ScrollTrigger
- **Masked line-by-line heading reveals** (SplitText), fade-and-rise reveals, image clip-path wipes
- **Parallax** on hero, cover and CTA images
- **Project index** with a floating image preview that trails and tilts with the cursor, plus a "View" cursor
- **Styles explorer** accordion that cross-fades the featured image
- **Testimonial slider** with autoplay progress bar (pauses on hover)
- **Magnetic buttons**, number counters, hide-on-scroll navigation, full-screen mobile menu
- Respects `prefers-reduced-motion`

Motion is declarative: add `data-split`, `data-reveal`, `data-img-reveal`, `data-parallax`, `data-count` or `data-magnetic` to an element and `components/Animations.tsx` animates it.

## Structure

```
app/            routes, layout, global styles (design tokens live in globals.css)
components/     Nav, Footer, ProjectIndex, StylesExplorer, Testimonials, motion layer
lib/data.ts     all content: spaces, projects, styles, testimonials
lib/gsap.ts     GSAP plugin registration and scroll helpers
```

To edit content, change `lib/data.ts`. To change colours or type, edit the tokens at the top of `app/globals.css`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Deploy

Push to GitHub and import the repo in [Vercel](https://vercel.com/new) (framework preset: Next.js). No environment variables are needed.

## Credits

Placeholder photography from [Unsplash](https://unsplash.com). Fonts: Cormorant Garamond, Manrope and Noto Serif JP (Google Fonts). Project names and figures are sample content.
