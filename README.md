# nelsoninno.com — site package

Version 2 (dark). Last updated April 2026.

---

## Folder structure

```
nelsoninno-site/
├── index.html               ← the entire site (single file)
├── presskit.zip             ← press kit download (replace with real zip)
├── README.md                ← this file
└── images/
    ├── photos/              ← YOUR photos go here (see list below)
    ├── sketches/            ← WeSpark sketches (loaded from CDN, no action needed)
    ├── logos/               ← logo strip image (see below)
    └── book/                ← optional: real book cover scan
```

---

## Photos to replace

Drop your files into `images/photos/` using these exact filenames.
Any format works (jpg, jpeg, png, webp) as long as the filename matches.
The site will display them immediately in your local preview.

| Filename | Where it appears | Recommended size |
|---|---|---|
| `portrait-hero.jpg` | Hero section, top of page (also gallery slot 1) | min 1200 × 1500px |
| `gallery-02.jpg` | Gallery grid, slot 2 | min 800 × 800px |
| `gallery-03.jpg` | Gallery grid, slot 3 | min 800 × 800px |
| `gallery-04.jpg` | Gallery grid, slot 4 | min 800 × 800px |
| `gallery-05.jpg` | Gallery grid, slot 5 | min 800 × 800px |
| `gallery-06.jpg` | Gallery grid, slot 6 | min 800 × 800px |
| `gallery-07.jpg` | Gallery grid, slot 7 | min 800 × 800px |
| `gallery-08.jpg` | Gallery grid, slot 8 | min 800 × 800px |
| `work-bitcoin-diploma.jpg` | Featured work card 1 (Bitcoin Diploma 2.0) | min 800 × 600px |
| `work-gloria-kriete.jpg` | Featured work card 2 (Gloria Kriete Foundation) | min 800 × 600px |
| `work-government.jpg` | Featured work card 3 (Government of El Salvador) | min 800 × 600px |

**Photo suggestions:**
- `portrait-hero.jpg` → the orange-background headshot (your strongest single portrait)
- `gallery-02.jpg` → TEDxVaduz, on stage with or without the helmet
- `gallery-03.jpg` → Iceland youth workshop (August 2020)
- `gallery-04.jpg` → Book signing / holding Unstable Innovation
- `gallery-05.jpg` → Workshop in action (participants visible)
- `gallery-06.jpg` → Bitcoin Histórico announcement (November 2025)
- `gallery-07.jpg` → At the office / desk photo
- `gallery-08.jpg` → Speaker portrait (profile or 3/4 angle)
- `work-bitcoin-diploma.jpg` → The Bitcoin Diploma book or the WeSpark team working on it
- `work-gloria-kriete.jpg` → The MoU signing photo or a workshop with GKF youth
- `work-government.jpg` → The Presidential House training session photo

---

## Logo strip

The "Worked with" section currently shows text placeholders.
To use the real logo image (Image 3 you uploaded):

1. Save it as `images/logos/logos-strip.png`
2. In `index.html`, find the section with class `logos` (around line 620)
3. Replace the entire `<div class="logos">...</div>` block with:

```html
<div class="logos-img-wrap" style="margin-top: 1rem;">
  <img src="images/logos/logos-strip.png" alt="Selected partners" style="width: 100%; filter: invert(1) brightness(0.6);">
</div>
```

The `filter: invert(1) brightness(0.6)` makes the black-on-grey logos work on the dark background.
Adjust brightness (0.4–0.7) to taste.

---

## Press kit

Replace `presskit.zip` with a real zip containing:
- 3–5 high-res portrait photos (minimum 2000px wide)
- `bio-en.txt` — short bio in English (the 3-sentence version from the site)
- `bio-es.txt` — same bio in LATAM Spanish (coming after Spanish version is drafted)
- Optional: WeSpark logo files

---

## Sketches

The eight WeSpark sketches (gamification, wisdom, helmet, etc.) load from the WeSpark CDN
and need no action. In production, you may want to host them locally for speed and
independence. If so, download them and update the `src` paths in `index.html` from
`https://static.wixstatic.com/...` to `images/sketches/sketch-name.png`.

---

## Deploying to GitHub Pages

1. Create a new public GitHub repository — e.g. `nelsoninno-site`
2. Push the entire `nelsoninno-site/` folder contents to the `main` branch
   (the `index.html` must be at the root of the repo, not inside a subfolder)
3. Go to repo Settings → Pages → Source: Deploy from branch → main → / (root)
4. GitHub will give you a `https://nelsoninno.github.io/nelsoninno-site` URL within minutes
5. To use `nelsoninno.com`, go to your domain registrar and set:
   - A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME for `www` → `nelsoninno.github.io`
6. Back in GitHub Pages settings, add `nelsoninno.com` as Custom Domain
7. Check "Enforce HTTPS" — GitHub auto-provisions SSL

Total time from repo creation to live site: 15–30 minutes.

---

## Next steps (in order)

- [ ] Drop your photos into `images/photos/` and preview locally
- [ ] Replace `presskit.zip` with the real press kit zip
- [ ] Add the logo strip image and update `index.html` (see above)
- [ ] Review and approve the English copy (already in `index.html`)
- [ ] Draft + add the Spanish version at `/es/index.html`
- [ ] Update `nelsoninno.com` DNS to point to GitHub Pages
- [ ] Update LinkedIn headline to "Founder & CEO, WeSpark" (sync canonical title)
- [ ] Update wespark.io/nelson to link to nelsoninno.com as the canonical bio
- [ ] Update wespark.io/story line 44 (CEO → CVO note) to reflect current title

---

## Editing the copy

All text is inside `index.html`. Search for the section you want to update:
- Hero pitch: search `He builds AI-powered`
- Short bio: search `Salvadoran entrepreneur`
- What he's building now: search `Nelson's current focus`
- Timeline: search `timeline-wrap`
- Philosophy: search `three directional preferences`

No build tools, no dependencies, no framework. Open the file, edit, save, done.

---

Built by Claude (Anthropic) · April 2026
