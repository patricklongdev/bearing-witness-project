# Bearing Witness Project — Technical Brief

**Site:** bearingwitnessproject.ca ("Life of Law as Art")
**Repo:** patricklongdev/bearing-witness-project

## What this is

A static Astro site presenting an archive of ~130 Allard Law School student art
projects exploring Indigenous rights, treaty law, and prisoners' rights, curated
by Professor Michael Jackson, KC. Originally a WordPress site; migrated to
Astro + MDX for performance, simplicity, and low hosting cost.

## Stack

- **Astro 4** (static output) with `@astrojs/mdx` and `@astrojs/sitemap`
- **Content**: one MDX file per project in `src/content/projects/`, validated
  against the schema in `src/content/config.ts` (title, order, author, category,
  tags, year, excerpt, thumbnail, pdf, projectLink)
- **Custom MDX components**: `src/components/Slideshow.astro`,
  `src/components/MediaEmbed.astro`
- **Search**: Pagefind, built as a post-build step (`npm run build` runs
  `astro build && pagefind --site dist`)
- **CMS**: Decap CMS (`public/admin/config.yml`), git-backed via GitHub OAuth
  worker at `bwp-oauth.patrickdavidlong.workers.dev`
- **Hosting**: Cloudflare Workers (static assets), deployed via Wrangler
  (`wrangler.toml`, assets served from `dist/`)

## Pages

- `src/pages/index.astro` — homepage (hero, Jackson pull-quote, intro,
  three featured-category sections, closing CTA)
- `src/pages/projects/index.astro` — Archive browse/filter page
- `src/pages/projects/[slug].astro` — individual project page template
- `src/pages/about.astro`, `src/pages/contact.astro`
- `src/pages/admin/index.astro` — Decap CMS entry point
- `src/layouts/Layout.astro` — global shell: header/nav, search overlay,
  footer, global CSS (design tokens, reset, nav/search behavior)

## Design tokens (in `Layout.astro`, `:root`)

`--serif`, `--sans`, `--ink`, `--muted`, `--border`, `--bg`, `--accent`,
`--max` (72rem content width), `--page-pad` (responsive edge padding),
`--header-h`.

**Divider convention**: content-width horizontal rules use a
padded outer wrapper + inner `max-width: var(--max)` element with the
border on the inner element (see `.cat-section`/`.cat-inner`,
`.closing-link-outer`/`.closing-link-wrap` in `index.astro`). Full-bleed
rules are reserved for the nav bottom border and global footer top border.

## Editorial workflow (Decap CMS)

Editors add/update projects through `/admin`. Known quirks:

- **Rich Text mode corrupts custom MDX components** — `{[` gets escaped to
  `{\[`, straight quotes become curly quotes inside code-like syntax. Always
  edit in **Raw mode** for any entry using `<Slideshow>` or `<MediaEmbed>`.
- Media uploads go to `public/assets/` (git-backed, not a separate CDN).

## Assets & Git LFS

- `public/assets/` currently holds ~525MB of project media (images, PDFs,
  audio, video).
- **Git LFS is not used.** The project used LFS earlier on, but the LFS
  storage budget was exceeded, so all large binaries were migrated to
  regular git objects and LFS filter tracking was removed. The `.git`
  directory is ~1GB as a result of storing this media directly.
- `.gitattributes` still marks `*.pdf`, `*.mp3`, `*.mp4` as `-text` — this
  only disables line-ending normalization/diffing for these binary types
  and is unrelated to LFS.
- Do not re-introduce Git LFS (e.g. `git lfs track`, `git lfs install`)
  without discussing it first — mixing LFS pointers with the existing
  plain-binary history would need careful migration.
- Cloudflare Workers static assets have a **25MB per-file limit** — keep
  individual uploaded files under this.

## Build & deploy

```bash
npm run build        # astro build + pagefind index generation
npx wrangler deploy  # publish dist/ to Cloudflare Workers
```

Typical change cycle:

1. `git pull` to pick up any CMS-authored commits
2. Make/verify code changes locally (`npm run dev` or the Astro preview server)
3. `npm run build`
4. `git add` / `git commit` / `git push`
5. `npx wrangler deploy`

There is no CI/CD pipeline — build and deploy are run manually.

## Constraints for anyone (human or AI) editing this repo

- Git LFS is not in use (budget exhausted) — do not re-enable it without
  discussion; commit large binaries directly as before.
- Do not include AI co-author trailers in commit messages.
- Prefer Raw mode over Rich Text mode in the CMS for MDX-component entries.
- Match existing quote/apostrophe conventions (curly `’ “ ”` vs straight)
  on a per-section basis — the homepage currently mixes both across
  different featured-project quotes; new copy should default to curly
  unless told otherwise.
