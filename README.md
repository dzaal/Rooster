# Parknest Rooster

Volunteer schedule web app (PWA) for **Stichting Buurtbelang Parknest**.

Live at: [parknest.nl/rooster.html](https://parknest.nl/rooster.html)
Version: 1.02

## Features

- Week and day view with smooth swipe/slide navigation
- Crew shifts color-coded per volunteer
- Background event layer from Google Calendar (main events / watermarks)
- Appointments shown in all-day row
- Dutch public holidays and school vacations
- Share calendar as image (native share sheet on mobile) or copy URL link
- URL hash deep-linking: `#week/2026-05-11` or `#day/2026-05-10`
- Print to A4 landscape or portrait with auto-fit zoom, pastel shift colors
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

### Branding
| Key | Description |
|-----|-------------|
| `branding.version` | App version shown in header badge |
| `branding.appName` | Full app name |
| `branding.themeColor` | Header / PWA theme color |

### Crew
Array of `{name, color, bday?}` objects. Name is matched case-insensitively against ICS event summaries.

### Defaults
| Key | Description |
|-----|-------------|
| `calendarUrl` | ICS URL for volunteer shifts (primary layer) |
| `appointmentUrl` | ICS URL for appointments (all-day row) |
| `mainEventCalendarUrl` | ICS URL for background event watermarks |
| `googleClientId/ApiKey/CalendarId` | Google OAuth for write (beheer) mode |
| `fontScale` | Screen font size multiplier (1 = no change) |
| `printFontScale` | Week-view print font size multiplier (2 = double) |
| `filterKeywords` | Event titles to exclude from shift list |

## Calendar Layers (bottom to top)

1. `mainEventCalendarUrl` — full-column background watermarks
2. `appointmentUrl` — all-day row blocks (blue)
3. `calendarUrl` — volunteer shifts (crew colors)
4. Built-in Dutch holidays + school vacations

## Deployment

Server: `root@juno.digizaal.net`
Root: `/var/www/vhosts/parknest.nl/httpdocs/`

Deploy changed files:
```bash
scp rooster.html root@juno.digizaal.net:/var/www/vhosts/parknest.nl/httpdocs/rooster.html
scp rooster/rooster.js rooster/rooster.css rooster/rooster-config.js \
    root@juno.digizaal.net:/var/www/vhosts/parknest.nl/httpdocs/rooster/
```

## Git

- Local branch: `main` (tracks `origin/master`)
- Remote: `https://github.com/dzaal/Rooster.git`
- Push: `git push origin main:master`
