# Parknest Rooster

Volunteer schedule web app for **Stichting Buurtbelang Parknest**.

Live at: [parknest.nl/rooster.html](https://parknest.nl/rooster.html)

## Repo Status

This checkout is aligned to `origin/master`.

The live app is served from:

- `/var/www/vhosts/parknest.nl/httpdocs/rooster.html`
- `/var/www/vhosts/parknest.nl/httpdocs/rooster-beheer.html`
- `/var/www/vhosts/parknest.nl/httpdocs/rooster/`

## File Structure

```text
rooster.html
rooster-beheer.html
rooster.js
rooster/
  rooster.js
  rooster.css
  rooster-config.js
  proxy.php
  rooster-manifest.json
  rooster-docs.md
```

`rooster.js` at repo root is kept for now, but the active app loads `rooster/rooster.js`.

## Configuration

Runtime configuration lives in [rooster/rooster-config.js](/Users/dirkzaal/parknest-rooster/rooster/rooster-config.js:1).

Main keys:

- `defaults.calendarUrl`
- `defaults.appointmentUrl`
- `defaults.mainEventCalendarUrl`
- `defaults.googleClientId`
- `defaults.googleApiKey`
- `defaults.googleCalendarId`
- `crew`
- `branding`

## Deployment

See [WORKFLOW.md](/Users/dirkzaal/parknest-rooster/WORKFLOW.md:1) for the local/GitHub/Juno workflow.
