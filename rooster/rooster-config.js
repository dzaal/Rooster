window.ROOSTER_CONFIG = {

  // ── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    version:          '1.0.0',
    appName:          'Parknest Vrijwilligersrooster',
    appShortName:     'Parknest',
    appDescription:   'Vrijwilligersrooster van Stichting Buurtbelang Parknest',
    logoUrl:          'https://parknest.nl/wp-content/uploads/2024/09/Parknest-logo-transp-shadow.png',
    themeColor:       '#1a3d2b',
    siteUrl:          'https://parknest.nl',
    startUrl:         'https://parknest.nl/rooster.html',
    defaultLocation:  'Parknest',
    shareFilePrefix:  'parknest',
  },

  // ── CREW ─────────────────────────────────────────────────────────────────
  crew: [
    {name: 'Dirk',    color: '#52b788', bday: '18-07'},
    {name: 'SusyW',   color: '#f4c430'},
    {name: 'Chris',   color: '#5a9fd4'},
    {name: 'Fenna',   color: '#e8739a'},
    {name: 'Lijn',    color: '#9b59b6'},
    {name: 'Inge',    color: '#32939c'},
    {name: 'Dirk2',   color: '#e43ed6', bday: '28-01'},
    {name: 'Roland',  color: '#2dbfd0'},
    {name: 'Manon',   color: '#55e08a'},
    {name: 'Frankie', color: '#2f42e5'},
    {name: 'Jos',     color: '#e055e0', bday: '20-07'},
    {name: 'Maud',    color: '#c6e055'},
    {name: 'Emma',    color: '#5575e0'},
    {name: 'Niels',   color: '#1a28c4'},
    {name: 'Roos',    color: '#93014d'},
    {name: 'Zirk',    color: '#570be2', bday: '18-07'}
  ],

  // ── DEFAULTS & API KEYS ──────────────────────────────────────────────────
  defaults: {
    shiftDurationMinutes: 120,
    timeZone:             'Europe/Amsterdam',
    googleClientId:       '187727297128-08r7krnfdkojkmjnmq5jc0csvgbii7pm.apps.googleusercontent.com',
    googleApiKey:         'AIzaSyB9nxpM86zV8JJNelQ5T_BuhcUWe1LlAdc',
    googleCalendarId:     'f0a70a3f3862ea4c0202a62f4bd8b3298a1cd69d53e57944c0dcaeab39b54dc6@group.calendar.google.com',
    calendarUrl:          'https://calendar.google.com/calendar/ical/f0a70a3f3862ea4c0202a62f4bd8b3298a1cd69d53e57944c0dcaeab39b54dc6%40group.calendar.google.com/public/basic.ics',
    appointmentUrl:       'https://calendar.google.com/calendar/ical/f99b1ad32b1aa1f543623c166d7b74e45155aee446a941d7d0342b38b41da904%40group.calendar.google.com/public/basic.ics',
    mainEventCalendarUrl: 'https://calendar.google.com/calendar/ical/parknestflevopark%40gmail.com/public/full.ics',
    // schoolHolidayCalendarUrl: '',  // optional: ICS URL to replace built-in Amsterdam school dates
    filterKeywords:       ['reguliere dag','reguliere midddag']
  }
};
