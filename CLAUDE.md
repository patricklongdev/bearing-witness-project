# CLAUDE.md

## Project

Life of Law as Art Archive — a legal archive of student creative work from
Professor Michael Jackson, KC's UBC Allard School of Law seminars, 1999–2023.

- Production domain: **lawasart.ca** — NOT bearingwitnessproject.ca (that name
  was dropped over a naming conflict; treat any occurrence in the codebase as
  stale and flag it).
- Full technical/editorial detail lives in [PROJECT_BRIEF.md](PROJECT_BRIEF.md)
  — read it before non-trivial work. This file is just an operational summary.

## Repo layout — read this first

This has caused failed sessions before:

- The git repo and Astro project root is **`bwp/output/`**, not the parent `bwp/`.
- The parent `bwp/` holds the original WordPress export and one-off migration
  scripts — it is not part of the live site.
- **Always confirm `pwd` ends in `.../bwp/output`** before running any `git` or
  `npm` command.

## Stack

Astro 4 static site. MDX content in `src/content/projects/`, validated by a Zod
schema. Pagefind search. Decap CMS at `/admin` (GitHub OAuth worker, commits
directly to GitHub). Hosted on Cloudflare Workers via Wrangler. See
PROJECT_BRIEF.md for schema fields, page structure, and design tokens.

## Deploy (manual, no CI/CD)

```
git pull                              # pick up Decap CMS commits
# verify locally
npm run build                         # astro build + pagefind --site dist
git add / commit / push
npx wrangler deploy
```

Always `git pull` before starting work — content edits arrive as Decap CMS
commits straight to GitHub, so the remote is often ahead.

### Deploy target

Per `wrangler.toml`:

- Worker name: **`bearing-witness-project`** — this is what `npx wrangler
  deploy` publishes to.
- `wrangler.toml` sets no explicit `[routes]` or custom domain — the
  production domain (lawasart.ca) is attached to the Worker via the
  Cloudflare dashboard (Worker → Settings → Domains & Routes), not in this
  repo. Don't expect to find it here.
- The Worker's `*.workers.dev` subdomain (`bearing-witness-project.<account>.workers.dev`)
  is a preview/dev URL, not the production entry point — don't treat it as
  public.

## Constraints

- **No Git LFS** — ~525MB of media lives as plain git objects, deliberately
  (LFS budget was exhausted previously). Do not re-enable LFS.
- Cloudflare asset limit: **25MB per file**.
- Decap CMS: use **Raw mode** for entries with MDX components (`<Slideshow>`,
  `<MediaEmbed>`) — Rich Text mode corrupts them.
- Internal links must be **absolute paths**.

## Copy conventions (non-negotiable)

- "Professor Michael Jackson, **KC**" — never OC, never QC.
- "**Prisoners' Rights**" — not "Penal Policy".
- Three categories only: Aboriginal Rights · Treaty Rights · Prisoners' Rights.
- "**the Archive**" — capitalized as a proper noun, site-wide.
- First-person voice **only** on the Introduction page; neutral voice elsewhere.
- Prefer conservative figures ("over 120 works", "over more than two decades").
  NOTE: the Archive contains ~129 entries — "over 120" is a deliberate
  editorial choice by Professor Jackson, not a stale number. Do not "correct"
  it to the actual count.

## Design rules

- All page headers (Introduction, The Archive, Contact, project template)
  share **one** title component: Source Serif 4 Display at project-title
  scale, anchored to the wide left margin. Don't create one-off header styles.
- Dividers are content-width (padded outer wrapper + inner `max-width: var(--max)`
  element). Full-bleed rules are reserved for the nav bottom border and footer
  top border only.
- Typography: Source Serif 4 Display (display), Source Serif 4 (body),
  Instrument Sans (UI).

## Working style

- Locate files by anchor-phrase search; never guess paths.
- Always show the full diff before saving.
- Never commit without explicit review and go-ahead.
- Editorial authority: curatorial commentary, pull-quotes, credits, and any
  copy in Professor Jackson's first-person voice require his sign-off. Draft
  or flag changes to these — never author or alter them unilaterally.
- Design and copy decisions are made jointly by Patrick Long, Professor
  Michael Jackson, KC, and David Khang. Surface options; don't settle
  contested choices in a commit.
