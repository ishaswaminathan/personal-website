# Isha Swaminathan · Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Motion · Three.js · Lenis · Lucide

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Editing content

**Everything lives in [`content/site.ts`](content/site.ts).** Name, headline, roles, bio, experience,
projects and case studies, skills, leadership stats, education, and links all live there.
Search the file for `TODO` to find placeholders that still need real details.

- **Add an experience:** push an object onto `experience`. The timeline alternates sides automatically.
- **Add a project:** push onto `projects`. `link` is where the arrow button goes; `caseStudy` is the story that
  opens in place when someone clicks the card. Only put verified numbers in `stats`.
- **Publications:** push onto `publications`; they show under the projects.
- **Project art:** `visual` picks a code-drawn preview (`museum`, `medconnect`, `gaze`)
  in `components/visuals/ProjectVisual.tsx`. Add a new case there for a new style.
- **Photos:** `public/images/portrait.jpg` (About) and `public/images/tartans.jpg` (Education).
- **GitHub:** set `site.contact.github` and the link appears in Contact automatically.

## Structure

```
app/                 layout (fonts, SEO, JSON-LD), home page, sitemap, robots
components/sections  Hero, NameSignature, About, Experience, Projects, Constellation, Skills,
                     Leadership, Education, Contact
components/ui        Intro, Nav, Cursor, Cutout (paper letters), Magnetic, TiltCard, Reveal, CountUp
components/visuals   HeroField (Three.js data terrain), ProjectVisual
content/site.ts      all copy and data
```

## Motion & accessibility

- The intro plays once per browser session. A "Skip intro" button is always available.
- `prefers-reduced-motion` turns off the intro, smooth scrolling, pinning, parallax, and the custom cursor.
  Content is then shown statically.
- Heavy pieces are lazy-loaded: the Three.js hero field and the below-the-fold sections ship as separate chunks.
- The hero field renders fewer points on small screens and pauses when it is off-screen.
