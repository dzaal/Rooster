# Parknest Workflow

The live app is served from:

- Public page: `/var/www/vhosts/parknest.nl/httpdocs/rooster.html`
- Admin page: `/var/www/vhosts/parknest.nl/httpdocs/rooster-beheer.html`
- Assets: `/var/www/vhosts/parknest.nl/httpdocs/rooster/`

The existing GitHub remote in production is:

- `https://github.com/dzaal/Rooster.git`

## Source Of Truth

Right now the practical source of truth is the live server, because the original local checkout was incomplete and production contains the full file set. This repo has been synced to that live layout so work can continue locally.

## Working Flow

1. Edit locally in this repo.
2. Test against the local HTML entry points:
   - `rooster.html`
   - `rooster-beheer.html`
3. Commit locally.
4. Push to GitHub once `origin` is configured in this checkout.
5. Deploy the changed files to Juno.

## Deploy Paths

- `rooster.html` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster.html`
- `rooster-beheer.html` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster-beheer.html`
- `rooster/rooster.js` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster/rooster.js`
- `rooster/rooster.css` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster/rooster.css`
- `rooster/rooster-config.js` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster/rooster-config.js`
- `rooster/proxy.php` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster/proxy.php`
- `rooster/rooster-manifest.json` -> `/var/www/vhosts/parknest.nl/httpdocs/rooster/rooster-manifest.json`

## Current Git Gap

- Local branch here: `main`
- GitHub default branch in the existing repo: `master`
- This checkout tracks `origin/master`

The remaining structural issue is branch naming. Local work happens on `main`, while the existing GitHub repo and production checkout use `master`.

Before standardizing the workflow, decide whether the project should keep `master` or rename the remote default branch to `main`.

## Suggested Normal Routine

1. Make changes locally.
2. Review `git diff`.
3. Commit.
4. Push to GitHub.
5. Pull or export the same commit to Juno.
6. Verify `https://parknest.nl/rooster.html`.
