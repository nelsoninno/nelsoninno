# nelsoninno.com — Project Brief for Claude

Read this at the start of every session. It replaces the need to re-read conversation history.

---

## What this project is

Nelson Inno's personal website, live at **https://nelsoninno.com**. Static HTML site hosted on **GitHub Pages**, custom domain configured via Namecheap DNS. Bilingual: English at `/`, Spanish at `/es/`.

The workspace folder IS the site repository. It is mounted and editable directly.

---

## Repository

- **GitHub repo:** `nelsoninno/nelsoninno` (github.com/nelsoninno/nelsoninno)
- **Branch:** `main`
- **GitHub Pages:** configured to serve from `main` branch root
- **Custom domain:** `nelsoninno.com` via CNAME file in repo root

### ⚠️ Critical git workaround

The workspace folder `.git` directory is **corrupt/locked** — do NOT attempt to run git commands inside it. All git operations must be done from a clean clone in `/tmp`.

**On every new session, run this to set up the git environment:**
```bash
# Check if /tmp/nelsoninno-site exists and is valid
git -C /tmp/nelsoninno-site status 2>/dev/null || {
  git clone https://nelsoninno:PAT@github.com/nelsoninno/nelsoninno.git /tmp/nelsoninno-site
}
```

Replace `PAT` with the fine-grained GitHub Personal Access Token (Contents: Read and Write, scoped to `nelsoninno/nelsoninno`). Nelson must provide this token — it is not stored anywhere in the repo for security.

**Typical push workflow:**
```bash
rsync -av --exclude='.git' /sessions/[session-name]/mnt/nelsoninno-website/ /tmp/nelsoninno-site/
cd /tmp/nelsoninno-site
git add -A
git commit -m "your message"
git push origin main
```

> Note: The bash mount path for the workspace is `/sessions/[session-name]/mnt/nelsoninno-website/`. The session name changes each session — use `mcp__workspace__bash` to discover it or check the system prompt for the current mount path.

---

## File structure

```
nelsoninno-website/
├── index.html              # EN homepage (1800+ lines, all CSS inline)
├── es/
│   └── index.html          # ES homepage (full Spanish translation)
├── images/
│   ├── photos/             # All photos — .webp versions exist for all
│   └── sketches/           # All sketches — .webp versions exist for all
├── favicon.ico             # WeSpark helmet emoji, multi-size (16/32/48px)
├── favicon.png             # 32×32 PNG fallback
├── apple-touch-icon.png    # 180×180 for iOS home screen
├── CNAME                   # nelsoninno.com
├── robots.txt              # Allow all, sitemap reference
├── sitemap.xml             # EN + ES URLs with hreflang
├── llms.txt                # Concise AI-readable profile
├── llms-full.txt           # Full AI-readable profile
└── CLAUDE.md               # This file
```

---

## Technical details

### Images
All images exist in both original format (.jpg/.png) AND .webp. **All HTML references use .webp only.** The originals are kept as local backup but not referenced by the site. Do not re-add .jpg references.

### SEO implemented
- `<link rel="canonical">` on both pages
- `hreflang` en/es/x-default on both pages and in sitemap.xml
- Open Graph + Twitter Card meta tags
- Social share image: `Nelson Inno with the WeSpark Logo Background.webp`
- `og:image` and `twitter:image` both set to the WeSpark Logo Background
- Schema.org `Person` JSON-LD (name, jobTitle, worksFor, alumniOf, sameAs, author)
- `robots.txt` allowing all crawlers
- `sitemap.xml` at https://nelsoninno.com/sitemap.xml
- `llms.txt` and `llms-full.txt` for AI/GEO discoverability
- meta keywords, author, robots content tags

### Language switcher
- EN topbar: `<div class="lang"><span class="active">EN</span> · <a href="/es/">ES</a></div>`
- ES topbar: `<div class="lang"><a href="/">EN</a> · <span class="active">ES</span></div>`
- Same pattern in footer `.lang-toggle`

---

## Backlinks confirmed live
- linkedin.com/in/nelsoninno → nelsoninno.com ✓
- twitter.com/nelsoninno → nelsoninno.com ✓
- instagram.com/nelsoninno → nelsoninno.com ✓
- wespark.io → nelsoninno.com ✓
- unstableinnovation.com → nelsoninno.com ✓
- yourownterms.life → nelsoninno.com ✓

---

## SEO/GEO — completed
- [x] Sitemap submitted to Google Search Console
- [x] Social profiles all link to nelsoninno.com
- [x] robots.txt, sitemap.xml, canonical, hreflang
- [x] Schema.org Person JSON-LD
- [x] llms.txt + llms-full.txt

## SEO/GEO — pending (pick up here)
- [ ] **Bing Webmaster Tools** — submit sitemap at bing.com/webmasters (10 min)
- [ ] **Wikidata entry** — highest-leverage GEO move; feeds Google Knowledge Panel and LLMs
- [ ] **Wikipedia stub** — qualifies based on Forbes, ARD/ZDF, TEDx, national curriculum
- [ ] **Performance: hero image** — add `fetchpriority="high"` to the hero `<img>` tag in both EN and ES
- [ ] **Performance: lazy load** — add `loading="lazy"` to all below-the-fold images
- [ ] **PageSpeed Insights audit** — run https://pagespeed.web.dev on nelsoninno.com
- [ ] **Content freshness** — decide on a writing/updates section (even 4–6 posts/year)
- [ ] **Press backlinks** — confirm existing Forbes/ARD/Cointelegraph articles link to nelsoninno.com; request additions where they don't

---

## Last commits (as of session handoff)
- `ba2b801` — Fix all remaining image src/href references to use .webp (EN and ES)
- `2ea1f6f` — Add llms.txt, llms-full.txt, favicon, apple-touch-icon; update social share image
- `6ac67f3` — Convert all images to .webp and update HTML references in EN and ES pages
- `e4fdd73` — Fix video caption to "1 minute", add "As seen on" / "Visto en"
- `cdcfd5a` — Add Spanish /es/ page and fix language switcher links
- `9d50d50` — SEO meta block (canonical, OG, Twitter Card, robots, sitemap)
