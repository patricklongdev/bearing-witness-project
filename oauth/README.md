# Decap CMS OAuth worker

This is a **separate Cloudflare Worker** from the main site. It is not built or
deployed by anything in the parent Astro project — it has its own
`wrangler.toml` and its own deploy step.

## What it does

Handles the GitHub OAuth handshake for Decap CMS at `/admin` on the main site
(`public/admin/config.yml`, backend `github`):

- `GET /auth` — redirects the browser to GitHub's OAuth authorize endpoint
  using `GITHUB_CLIENT_ID`.
- `GET /callback` — receives GitHub's authorization `code`, exchanges it for
  an access token via `https://github.com/login/oauth/access_token` using
  `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET`, then posts the token back to
  the Decap popup window via `window.postMessage`.

## Deployed name and URL

- Worker name: `bwp-oauth` (per `wrangler.toml`)
- URL: `https://bwp-oauth.patrickdavidlong.workers.dev`
- `public/admin/config.yml`'s `backend.base_url` must match this worker's URL
  exactly — if this worker is ever renamed or redeployed under a different
  name/URL, that config value has to be updated to match.

## Deploying this worker

This is independent of the main site's deploy process. From this directory:

```bash
cd oauth
npx wrangler deploy
```

Running `npx wrangler deploy` from the repo root (or from `output/`) deploys
the **main site**, not this worker — they are separate Workers with separate
`wrangler.toml` files.

## Secrets — not in this repo, not recoverable from it

`GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are Worker secrets, set with:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

They are **not stored in this repo** and cannot be recovered from source
control. They originate from a **GitHub OAuth App**, whose Client ID/Secret
and settings (Homepage URL, Authorization callback URL) live on GitHub, not
here. Reproducing this worker from scratch requires access to both:

- The Cloudflare account this Worker is deployed under, and
- The GitHub OAuth App these credentials belong to.
