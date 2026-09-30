<?php
/**
 * JADE Coatings Theme Functions
 *
 * @package JADE_Coatings
 */

if (!defined('ABSPATH')) {
    exit;
}

function jade_coatings_setup() {
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'jade_coatings_setup');

// Document title filter
add_filter('pre_get_document_title', function() {
    return 'JADE Coatings | Advanced Water-based Solutions';
});

// Register rewrite rules for all main site section endpoints & sitemaps
add_action('init', function() {
    $routes = ['about', 'products', 'projects', 'shops', 'stores', 'calculator', 'contact'];
    foreach ($routes as $route) {
        add_rewrite_rule('^' . $route . '/?$', 'index.php?jade_section=' . $route, 'top');
    }
    add_rewrite_rule('^products/([a-z0-9_-]+)/?$', 'index.php?jade_section=products&jade_sub=$matches[1]', 'top');
    add_rewrite_rule('^dealers-admin/?$', 'index.php?jade_dealers_admin=1', 'top');
    add_rewrite_rule('^sitemap(_index|-index)?\.xml$', 'index.php?jade_sitemap_index=1', 'top');
    add_rewrite_rule('^sitemap(-main)?\.xml$', 'index.php?jade_sitemap=1', 'top');
    add_rewrite_rule('^(google30ccde190114b3a3\.html)$', 'index.php?google_verify=1', 'top');
});

add_filter('query_vars', function($vars) {
    $vars[] = 'jade_dealers_admin';
    $vars[] = 'jade_section';
    $vars[] = 'jade_sub';
    $vars[] = 'jade_sitemap';
    $vars[] = 'jade_sitemap_index';
    $vars[] = 'google_verify';
    return $vars;
});

/**
 * Dynamic XML Sitemap Generator for JADE Coatings
 * Dynamically resolves domain (www vs non-www) to match Google Search Console property exactly.
 */
function jade_get_sitemap_xml() {
    $host = $_SERVER['HTTP_HOST'] ?? 'jadecoatings.lk';
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $base_url = $protocol . $host . '/';
    $current_date = date('Y-m-d');

    $urls = [
        [
            'loc' => $base_url,
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '1.0'
        ],
        [
            'loc' => $base_url . 'products/',
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '0.95'
        ],
        [
            'loc' => $base_url . 'shops/',
            'lastmod' => $current_date,
            'changefreq' => 'daily',
            'priority' => '0.90'
        ],
        [
            'loc' => $base_url . 'calculator/',
            'lastmod' => $current_date,
            'changefreq' => 'monthly',
            'priority' => '0.85'
        ],
        [
            'loc' => $base_url . 'projects/',
            'lastmod' => $current_date,
            'changefreq' => 'monthly',
            'priority' => '0.80'
        ],
        [
            'loc' => $base_url . 'about/',
            'lastmod' => $current_date,
            'changefreq' => 'monthly',
            'priority' => '0.80'
        ],
        [
            'loc' => $base_url . 'contact/',
            'lastmod' => $current_date,
            'changefreq' => 'monthly',
            'priority' => '0.80'
        ],
        [
            'loc' => $base_url . 'products/woodshield/',
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '0.85'
        ],
        [
            'loc' => $base_url . 'products/masoguard/',
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '0.85'
        ],
        [
            'loc' => $base_url . 'products/tyreshield/',
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '0.85'
        ],
        [
            'loc' => $base_url . 'dealers-admin/',
            'lastmod' => $current_date,
            'changefreq' => 'monthly',
            'priority' => '0.60'
        ]
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach ($urls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($u['loc'], ENT_XML1, 'UTF-8') . "</loc>\n";
        $xml .= "    <lastmod>" . $u['lastmod'] . "</lastmod>\n";
        $xml .= "    <changefreq>" . $u['changefreq'] . "</changefreq>\n";
        $xml .= "    <priority>" . $u['priority'] . "</priority>\n";
        $xml .= "  </url>\n";
    }

    $xml .= "</urlset>\n";
    return $xml;
}

/**
 * Sitemap Index Generator
 */
function jade_get_sitemap_index_xml() {
    $host = $_SERVER['HTTP_HOST'] ?? 'jadecoatings.lk';
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $base_url = $protocol . $host . '/';
    $current_date = date('Y-m-d');

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    $xml .= "  <sitemap>\n";
    $xml .= "    <loc>" . $base_url . "sitemap-main.xml</loc>\n";
    $xml .= "    <lastmod>" . $current_date . "</lastmod>\n";
    $xml .= "  </sitemap>\n";
    $xml .= "</sitemapindex>\n";
    return $xml;
}

// Early interceptor hook on init priority 1
add_action('init', function() {
    $verify_filename = 'google30ccde190114b3a3.html';
    $verify_content = "google-site-verification: google30ccde190114b3a3.html\n";
    $root_file = ABSPATH . $verify_filename;
    if (!file_exists($root_file)) {
        @file_put_contents($root_file, $verify_content);
    }
    
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], $verify_filename) !== false) {
        status_header(200);
        http_response_code(200);
        header('HTTP/1.1 200 OK');
        header('Status: 200 OK');
        header('Content-Type: text/html; charset=utf-8');
        echo $verify_content;
        exit;
    }

    // Direct endpoint interception for /sitemap_index.xml or /sitemap-index.xml
    if (isset($_SERVER['REQUEST_URI']) && preg_match('#^/sitemap(_index|-index)?\.xml(\?.*)?$#i', $_SERVER['REQUEST_URI'])) {
        status_header(200);
        http_response_code(200);
        header('HTTP/1.1 200 OK');
        header('Status: 200 OK');
        header('Content-Type: application/xml; charset=utf-8');
        header('X-Robots-Tag: noindex, follow', true);
        echo jade_get_sitemap_index_xml();
        exit;
    }

    // Direct endpoint interception for /sitemap.xml or /sitemap-main.xml
    if (isset($_SERVER['REQUEST_URI']) && preg_match('#^/sitemap(-main)?\.xml(\?.*)?$#i', $_SERVER['REQUEST_URI'])) {
        status_header(200);
        http_response_code(200);
        header('HTTP/1.1 200 OK');
        header('Status: 200 OK');
        header('Content-Type: application/xml; charset=utf-8');
        header('X-Robots-Tag: noindex, follow', true);
        echo jade_get_sitemap_xml();
        exit;
    }

    // Ensure section URLs return HTTP 200 OK immediately
    $request_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $valid_sections = ['about', 'products', 'projects', 'shops', 'stores', 'calculator', 'contact'];
    if (in_array(strtolower($request_path), $valid_sections) || preg_match('#^products/(woodshield|masoguard|tyreshield)$#i', $request_path)) {
        status_header(200);
        http_response_code(200);
    }
}, 1);

add_action('template_include', function($template) {
    if (get_query_var('jade_dealers_admin')) {
        $admin_file = get_template_directory() . '/admin.php';
        if (file_exists($admin_file)) {
            return $admin_file;
        }
    }
    if (get_query_var('jade_section')) {
        return get_template_directory() . '/index.php';
    }
    return $template;
});
