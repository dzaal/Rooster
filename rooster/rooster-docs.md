# Parknest Rooster – Documentatie

## Overzicht

**Parknest Rooster** is een webapplicatie die meerdere Google Agenda's combineert in één roosterview. Het toont diensten, afspraken en achtergrondgebeurtenissen in een week- of dagweergave, inclusief Nederlandse feestdagen en schoolvakanties.

De applicatie bestaat uit:

| Bestand | Doel |
|---|---|
| `rooster.html` | Vrijwilligersrooster (leesmodus) |
| `rooster-beheer.html` | Beheerinterface (schrijfmodus) |
| `rooster/rooster.js` | Alle logica: ophalen, parsen, renderen |
| `rooster/rooster.css` | Stijlen |
| `rooster/rooster-config.js` | **Configuratie – hier pas je alles aan** |
| `rooster/rooster-manifest.json` | PWA-manifest (installeerbaar als app) |
| `rooster/proxy.php` | Server-side CORS-proxy voor ICS-feeds |
| `rooster/rooster-docs.md` | Deze documentatie |

---

## Versienummering

De versie van de applicatie wordt bijgehouden in `rooster/rooster-config.js` onder `branding.version`:

```js
branding: {
  version: '1.0.0',
  appName: 'Parknest Vrijwilligersrooster',
  ...
}
```

Het versienummer volgt **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Type | Wanneer verhogen |
|---|---|
| `MAJOR` | Ingrijpende wijziging in structuur, config-formaat of incompatibele breuk |
| `MINOR` | Nieuwe functionaliteit, nieuwe config-opties, nieuwe talen |
| `PATCH` | Bugfixes, stijlcorrecties, kleine aanpassingen |

Het versienummer verschijnt automatisch op:
- De **browsertabbladtitel** (`Parknest Vrijwilligersrooster v1.0.0`)
- Als klein badge **in de header** (naast het logo, zichtbaar op desktop)
- In de **PWA-beschrijving** (`rooster/rooster-manifest.json`)

Bij elke release: update `version` in `rooster-config.js` én in `rooster/rooster-manifest.json` (in het `description`-veld).

---

## De vier kalenderlagen

De applicatie combineert vier typen kalenders in één weergave. Ze worden over elkaar heen gelegd in vaste volgorde, van onder naar boven:

---

### 1. Hoofdevenementenkalender (`mainEventCalendarUrl`)

Een achtergrondlaag die altijd **onder** alle andere elementen wordt weergegeven. Bedoeld voor terugkerende blokken die de context aangeven, zoals "Reguliere dag", "Gesloten" of een extern evenement.

**Weergave:**
- Lichtgroen vlak met gestippelde rand over de volledige kolomhoogte van het evenement
- Naam van het evenement diagonaal (gedraaid) als watermerk in het blok
- Diensten die er bovenop vallen zijn licht transparant, zodat de achtergrond doorschijnt

**Configuratie:**
```js
mainEventCalendarUrl: 'https://calendar.google.com/calendar/ical/JOUW_KALENDER_ID%40gmail.com/public/basic.ics'
```

**Woordenfilter:**
Evenementen waarvan de naam een woord uit `filterKeywords` bevat, worden niet getoond — ook niet in de achtergrondlaag. Gebruik dit om interne planningsgebeurtenissen die je niet wilt laten zien eruit te filteren (zie §filterKeywords hieronder).

---

### 2. Afsprakenkalender (`appointmentUrl`)

Een aparte Google Agenda voor afspraken die niet aan een specifiek persoon zijn gekoppeld. Afspraken verschijnen als blokken in de **all-day rij** bovenaan het rooster (ook als ze een starttijd hebben), met een blauwe kleur.

**Weergave:**
- Compacte blokken in de bovenste strook van de dagkolom
- Blauwe achtergrond (`#e8f0fe`) met blauwe rand

**Configuratie:**
```js
appointmentUrl: 'https://calendar.google.com/calendar/ical/AFSPRAKEN_ID%40group.calendar.google.com/public/basic.ics'
```

**Typisch gebruik:** vergaderingen, onderhoudsmomenten, bezoekersafspraken — zaken die het rooster beïnvloeden maar geen dienstblok zijn.

---

### 3. Dienstroosterkalender (`calendarUrl`)

De primaire kalender. Elke gebeurtenis stelt een **dienst van een vrijwilliger** voor. De naam van het evenement wordt gebruikt om de kleur op te zoeken in de `crew`-lijst.

**Weergave:**
- Gekleurde blokken in de tijdgrid op basis van start- en eindtijd
- Kleur wordt bepaald door de naam in de `crew`-tabel; onbekende namen krijgen een automatisch gegenereerde kleur
- Bij overlapping worden blokken naast elkaar geplaatst (tot 3 breed in weekweergave, tot 6 in dagweergave); extra blokken komen in een overloopstrook onderaan

**Configuratie:**
```js
calendarUrl: 'https://calendar.google.com/calendar/ical/DIENSTEN_ID%40group.calendar.google.com/public/basic.ics'
```

Schrijftoegang (toevoegen/verwijderen vanuit `rooster-beheer.html`) vereist ook `googleClientId`, `googleApiKey` en `googleCalendarId`.

---

### 4. Feestdagen & schoolvakanties (ingebouwd + optioneel ICS)

Nederlandse officiële feestdagen worden **automatisch berekend** (Pasen, Pinksteren, Hemelvaart, etc.) en verschijnen als rode labels in de kolomkoppen en als pill in de all-day rij.

Schoolvakanties verschijnen als blauwe labels in de kolomkoppen.

**Standaard (ingebouwd – Amsterdam/Noord-Holland):**
Zonder extra configuratie worden de schoolvakanties gebruikt zoals die gelden voor regio **Noord-Holland** (Amsterdam). Dit zijn vaste benaderingsdata die in de broncode zijn opgeslagen.

**Instellen voor een andere regio (`schoolHolidayCalendarUrl`):**
Door een externe ICS-URL op te geven worden de ingebouwde Amsterdamse data volledig vervangen door de kalender uit die URL. De Nederlandse overheid publiceert officiële schoolvakantiedata per regio als ICS-bestand.

Beschikbare ICS-feeds van de rijksoverheid:

| Regio | ICS-URL |
|---|---|
| Noord (o.a. Amsterdam) | `https://www.schoolvakanties-nederland.nl/ical/noord/` |
| Midden (o.a. Utrecht) | `https://www.schoolvakanties-nederland.nl/ical/midden/` |
| Zuid (o.a. Eindhoven) | `https://www.schoolvakanties-nederland.nl/ical/zuid/` |

**Configuratie:**
```js
schoolHolidayCalendarUrl: 'https://www.schoolvakanties-nederland.nl/ical/midden/'
```

Als de URL niet bereikbaar is, valt de applicatie automatisch terug op de ingebouwde Amsterdamse data.

---

## Volledig rooster-config.js overzicht

```js
window.ROOSTER_CONFIG = {

  // ── BRANDING ──────────────────────────────────────────────────────────────
  branding: {
    version:         '1.0.0',                              // Versienummer (SemVer)
    appName:         'Parknest Vrijwilligersrooster',  // Titel in tabblad en header
    appShortName:    'Parknest',                        // Naam op homescreen (PWA)
    appDescription:  'Vrijwilligersrooster van ...',   // PWA-beschrijving
    logoUrl:         'https://...',                     // URL naar logo (PNG/SVG)
    themeColor:      '#1a3d2b',                         // Kleur statusbalk (mobiel)
    siteUrl:         'https://parknest.nl',             // Hoofdsite URL
    startUrl:        'https://parknest.nl/rooster.html',// PWA startpagina
    defaultLocation: 'Parknest',                        // Locatienaam bij nieuwe diensten
    shareFilePrefix: 'parknest',                        // Prefix bij geëxporteerde bestanden
  },

  // ── CREW (dienstkleur per naam) ────────────────────────────────────────────
  // De naam moet exact overeenkomen met de samenvatting in Google Agenda
  // (hoofdlettergevoelig wordt genegeerd).
  crew: [
    { name: 'Dirk',    color: '#52b788' },
    { name: 'Chris',   color: '#5a9fd4' },
    { name: 'Fenna',   color: '#e8739a' },
    // voeg toe zoveel als nodig; onbekende namen krijgen een automatische kleur
  ],

  // ── KALENDERS & API ────────────────────────────────────────────────────────
  defaults: {

    // Tijdzone voor het aanmaken van nieuwe diensten via Google API
    timeZone: 'Europe/Amsterdam',

    // Standaardduur (minuten) van een nieuwe dienst in beheer
    shiftDurationMinutes: 120,

    // ── Laag 3: Dienstrooster ─────────────────────────────────────────────
    calendarUrl: 'https://calendar.google.com/calendar/ical/DIENSTEN_ID%40group.calendar.google.com/public/basic.ics',

    // Voor schrijftoegang via rooster-beheer.html (Google OAuth):
    googleClientId:    '1234567890-abc.apps.googleusercontent.com',
    googleApiKey:      'AIzaSy...',
    googleCalendarId:  'DIENSTEN_ID@group.calendar.google.com',

    // ── Laag 2: Afspraken ─────────────────────────────────────────────────
    appointmentUrl: 'https://calendar.google.com/calendar/ical/AFSPRAKEN_ID%40group.calendar.google.com/public/basic.ics',

    // ── Laag 1: Hoofdevenementen (achtergrond) ────────────────────────────
    mainEventCalendarUrl: 'https://calendar.google.com/calendar/ical/HOOFD_ID%40gmail.com/public/basic.ics',

    // ── Laag 4: Schoolvakanties (optioneel, overschrijft ingebouwde data) ─
    // schoolHolidayCalendarUrl: 'https://www.schoolvakanties-nederland.nl/ical/midden/',

    // ── Woordenfilter ─────────────────────────────────────────────────────
    filterKeywords: ['reguliere dag'],

  }
};
```

---

## `crew` – kleuren per vrijwilliger

Elk object in de `crew`-array koppelt een naam aan een kleur. De naam moet overeenkomen met het begin van de Google Agenda-samenvatting (hoofdlettergevoeligheid wordt genegeerd).

```js
crew: [
  { name: 'Anna',    color: '#e8739a' },   // roze
  { name: 'Bas',     color: '#52b788' },   // groen
  { name: 'Carmen',  color: '#f4c430' },   // geel
]
```

Onbekende namen (niet in `crew`) krijgen automatisch een kleur op basis van een hash van de naam — altijd consistent, nooit willekeurig.

---

## `filterKeywords` – evenementen verbergen

Een JSON-array van woorden (of zinsdelen). Elk evenement waarvan de titel een van deze woorden bevat (hoofdletterongevoelig) wordt **volledig genegeerd** — in alle vier lagen.

```js
filterKeywords: ['reguliere dag', 'intern', 'concept']
```

---

## `branding` – huisstijl aanpassen

| Veld | Doel | Voorbeeld |
|---|---|---|
| `version` | Versienummer (SemVer) | `'1.0.0'` |
| `appName` | Volledige naam (tabbladtitel, print) | `'Mijn Organisatie Rooster'` |
| `appShortName` | Naam op homescreen (PWA) | `'Rooster'` |
| `logoUrl` | URL van het logo (38×38 px aanbevolen) | `'https://mijn.site/logo.png'` |
| `themeColor` | Kleur statusbalk op mobiel | `'#1a3d2b'` |
| `startUrl` | PWA startpagina | `'https://mijn.site/rooster.html'` |
| `defaultLocation` | Standaard locatie bij nieuwe dienst | `'De Buurt'` |
| `shareFilePrefix` | Bestandsnaamprefix bij exporteren | `'mijnorg'` |

---

## ICS-URL ophalen uit Google Agenda

1. Ga naar **Google Agenda** → ⚙ Instellingen → kies de agenda
2. Scroll naar **"Agenda-integratie"**
3. Kopieer de **"Openbaar ICS-adres"**
4. Plak de URL in de juiste config-sleutel

---

## Minimale configuratie (voorbeeld nieuw project)

```js
window.ROOSTER_CONFIG = {
  branding: {
    version:      '1.0.0',
    appName:      'Buurtcentrum De Hoek – Rooster',
    appShortName: 'De Hoek',
    themeColor:   '#2c5f8a',
    startUrl:     'https://dehoek.nl/rooster.html',
  },
  crew: [
    { name: 'Jan',   color: '#52b788' },
    { name: 'Petra', color: '#e8739a' },
  ],
  defaults: {
    timeZone:    'Europe/Amsterdam',
    calendarUrl: 'https://calendar.google.com/calendar/ical/JOUW_ID%40group.calendar.google.com/public/basic.ics',
  }
};
```
