# Parknest Rooster

A lightweight, installable web app that combines multiple Google Calendars into a single volunteer schedule — shareable, printable, and fully configurable.

Built for **Parknest**, a group of volunteers in Amsterdam Flevopark.

It reads several ICS feeds (Google Calendar must be set to share all information publicly) and presents them together as a colour-coded week or day view. Volunteer names, colours and optional birthdays are configured in one file. A keyword filter lets you hide recurring background events that would otherwise clutter the schedule.

Live at: [parknest.nl/rooster.html](https://parknest.nl/rooster.html) — v1.02

## Features

- Week and day view with smooth swipe/slide navigation
- Crew shifts colour-coded per volunteer
- Background event layer from Google Calendar (main events / watermarks)
- Appointments shown in all-day row
- Dutch public holidays and school vacations
- Share calendar as image (native share sheet on mobile — WhatsApp-ready) or copy URL link
- URL hash deep-linking: `#week/2026-05-11` or `#day/2026-05-10`
- Print to A4 landscape or portrait with auto-fit zoom, pastel shift colours
- Configurable font scale for screen and print
- Installable PWA (add to home screen)
- No database — everything from Google Calendar ICS feeds

## File Structure

```
rooster.html              Entry point (read-only, no auth)
rooster/
  rooster.js             All app logic (~2280 lines)
  rooster.css            All styles
  rooster-config.js      Configuration (crew, calendars, branding)
  rooster-manifest.json  PWA manifest
  proxy.php              Server-side CORS proxy for ICS feeds
  rooster-docs.md        Dutch user documentation
```

## Configuration

All runtime configuration lives in `rooster/rooster-config.js`.

### Crew
Array of objects — one per volunteer:
```js
{ name: 'Dirk', color: '#52b788', bday: '18-07' }
```
- `name` — matched case-insensitively against event titles in the ICS feed
- `color` — hex colour for that volunteer's shift blocks
- `bday` — optional birthday (`DD-MM`), shown as a small indicator

### Calendar URLs
All calendars must be set to **share all information** (not just free/busy) in Google Calendar settings.

| Key | Description |
|-----|-------------|
| `calendarUrl` | ICS feed for volunteer shifts (primary colour-coded layer) |
| `appointmentUrl` | ICS feed for appointments (shown in all-day row) |
| `mainEventCalendarUrl` | ICS feed for background event watermarks |

### Filtering
```js
filterKeywords: ['reguliere dag', 'reguliere middag']
```
Event titles containing any of these strings (case-insensitive) are hidden from the schedule. Use this to suppress recurring placeholder events.

### Print & Display
| Key | Default | Description |
|-----|---------|-------------|
| `fontScale` | `1` | Screen font size multiplier |
| `printFontScale` | `2` | Week-view print font size multiplier |

### Branding
| Key | Description |
|-----|-------------|
| `branding.version` | Version shown in header badge |
| `branding.appName` | Full app name (browser tab + PWA) |
| `branding.themeColor` | Header and PWA theme colour |

## Calendar Layers (bottom to top)

1. `mainEventCalendarUrl` — full-column background watermarks
2. `appointmentUrl` — all-day row blocks
3. `calendarUrl` — volunteer shifts (crew colours)
4. Built-in Dutch public holidays + school vacations

## Deployment

Server: `root@juno.digizaal.net`
Root: `/var/www/vhosts/parknest.nl/httpdocs/`

```bash
scp rooster.html root@juno.digizaal.net:/var/www/vhosts/parknest.nl/httpdocs/rooster.html
scp rooster/rooster.js rooster/rooster.css rooster/rooster-config.js \
    root@juno.digizaal.net:/var/www/vhosts/parknest.nl/httpdocs/rooster/
```

## Git

- Local branch: `main` (tracks `origin/master`)
- Remote: `https://github.com/dzaal/Rooster.git`
- Push: `git push origin main:master`
