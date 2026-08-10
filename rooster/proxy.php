<?php
// proxy.php — zet dit bestand naast parknest-rooster.html op je Plesk server
// Accepteert ?url= parameter voor meerdere Google Calendar ICS feeds

// Whitelist: alleen deze Google Calendar URLs zijn toegestaan
$allowed_prefixes = [
    'https://calendar.google.com/calendar/ical/',
];

// Haal de gevraagde URL op
$requested_url = isset($_GET['url']) ? $_GET['url'] : null;

// Fallback naar de standaard rooster-URL als geen url opgegeven
if (!$requested_url) {
    $requested_url = 'https://calendar.google.com/calendar/ical/f0a70a3f3862ea4c0202a62f4bd8b3298a1cd69d53e57944c0dcaeab39b54dc6%40group.calendar.google.com/public/basic.ics';
}

// Whitelist-check
$allowed = false;
foreach ($allowed_prefixes as $prefix) {
    if (strpos($requested_url, $prefix) === 0) {
        $allowed = true;
        break;
    }
}

if (!$allowed) {
    http_response_code(403);
    die('URL niet toegestaan.');
}

// Cache per URL: hash van de URL als bestandsnaam
$cache_dir  = sys_get_temp_dir();
$cache_file = $cache_dir . '/parknest_ics_' . md5($requested_url) . '.txt';
$cache_time = 900; // 15 minuten
$force_refresh = isset($_GET['refresh']) && $_GET['refresh'] === '1';

if (!$force_refresh && file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_time) {
    $data = file_get_contents($cache_file);
} else {
    $ctx = stream_context_create(['http' => [
        'timeout'    => 10,
        'user_agent' => 'Parknest-Rooster/1.0',
    ]]);
    $data = @file_get_contents($requested_url, false, $ctx);
    if ($data !== false) {
        file_put_contents($cache_file, $data);
    } elseif (file_exists($cache_file)) {
        $data = file_get_contents($cache_file); // gebruik verlopen cache als fallback
    } else {
        http_response_code(502);
        die('Kon agenda niet ophalen.');
    }
}

header('Content-Type: text/calendar; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
// Keep the 15 minute cache inside this proxy only. Browser/intermediate caches
// would otherwise hide manual refreshes and add a second cache layer.
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
echo $data;
