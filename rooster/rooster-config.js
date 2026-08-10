window.ROOSTER_CONFIG = {

  // ── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    version:          '1.02',
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
    {name: 'Bert',      color: '#8d6e63'},
    {name: 'Cato',      color: '#ff9f1c', bday: '04-04'},
    {name: 'Chris',     color: '#5a9fd4', bday: '08-04'},
    {name: 'Dirk',      color: '#52b788', bday: '18-07'},
    {name: 'Dirk2',     color: '#e43ed6', bday: '28-01'},
    {name: 'Elisabeth', color: '#7e57c2'},
    {name: 'Fenna',     color: '#e8739a', bday: '07-06'},
    {name: 'Flavia',    color: '#ff6b35'},
    {name: 'Frankie',   color: '#2f42e5'},
    {name: 'Frenkie',   color: '#3d5afe'},
    {name: 'Inge',      color: '#32939c', bday: '14-12'},
    {name: 'Iwan',      color: '#00a6a6', bday: '23-08'},
    {name: 'Jos',       color: '#e055e0', bday: '20-07'},
    {name: 'Khatera',   color: '#c44569'},
    {name: 'Lijn',      color: '#9b59b6', bday: '25-08'},
    {name: 'Lucas',     color: '#118ab2'},
    {name: 'Laetitia',  color: '#6c63ff', bday: '08-11'},
    {name: 'Letitia',   color: '#6c63ff', bday: '08-11'},
    {name: 'Manon',     color: '#55e08a'},
    {name: 'Mariska',   color: '#17a2b8', bday: '03-02'},
    {name: 'Mika',      color: '#f77f00', bday: '22-02'},
    {name: 'Maud',      color: '#c6e055', bday: '08-03'},
    {name: 'Natascha',  color: '#d45087'},
    {name: 'Niels',     color: '#1a28c4'},
    {name: 'Rico',      color: '#ef476f', bday: '21-04'},
    {name: 'Rob',       color: '#2a9d8f'},
    {name: 'Roland',    color: '#2dbfd0'},
    {name: 'Rolf',      color: '#06d6a0'},
    {name: 'Roos',      color: '#93014d', bday: '29-11'},
    {name: 'Rosanne',   color: '#ad1457', bday: '29-11'},
    {name: 'Suus',      color: '#80ed99', bday: '15-12'},
    {name: 'SuzyW',     color: '#f4c430', bday: '13-05'},
    {name: 'Zdeno',     color: '#0096c7'},
    {name: 'Zilan',     color: '#48cae4', bday: '01-10'},
    {name: 'Emma',      color: '#5575e0'},
    {name: 'Victoria',  color: '#ef476f'},
    {name: 'Zirk',      color: '#52b788'}
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
    mainEventCalendarUrl: 'https://calendar.google.com/calendar/ical/media%40parknest.nl/public/full.ics',
    // schoolHolidayCalendarUrl: '',  // optional: ICS URL to replace built-in Amsterdam school dates
    filterKeywords:       ['reguliere dag','reguliere midddag'],
    fontScale:            1,    // screen font size factor (1 = no change)
    printFontScale:       2,    // week-view print font size factor (2 = twice as large; day view always prints at 1×)
  }
};
