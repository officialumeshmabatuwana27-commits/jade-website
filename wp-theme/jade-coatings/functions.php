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

// Allow /dealers-admin or /admin-portal page routing
add_action('init', function() {
    add_rewrite_rule('^dealers-admin/?$', 'index.php?jade_dealers_admin=1', 'top');
});

add_filter('query_vars', function($vars) {
    $vars[] = 'jade_dealers_admin';
    return $vars;
});

// Ensure Google verification file exists in web root and intercept with 200 OK
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
}, 1);

/**
 * XML Sitemap Generator for JADE Coatings
 */
function jade_get_sitemap_xml() {
    $home_url = trailingslashit(home_url());
    $current_date = date('Y-m-d');
    
    // Core pages and product imagery for rich Google indexing
    $urls = [
        [
            'loc' => $home_url,
            'lastmod' => $current_date,
            'changefreq' => 'weekly',
            'priority' => '1.0',
            'images' => [
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Logo.png', 'title' => 'JADE Coatings Official Logo'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/deck-restored.jpg', 'title' => 'JADE Woodshield Restored Teak Timber Deck'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/JADE%20woodshield%20wood%20putty%20after.png', 'title' => 'JADE WOODSHIELD Wood Putty'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/JADE%20Woodshield%20stain%20after.png', 'title' => 'JADE WOODSHIELD Wood Stains'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/JADE%20woodshield%20top%20coat%20After.png', 'title' => 'JADE WOODSHIELD Top Coat'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Masoguard%20All%20in%20one%20After.png', 'title' => 'JADE MASOGUARD All in One Water Proof Paint'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/JADE%20Roof%20%26%20WAll%20Shield%20After.png', 'title' => 'JADE Roof and Wall Shield'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/JADE%20Easy%20Floor%20After.png', 'title' => 'JADE Easy Floor Coating'],
                ['loc' => 'https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Wet%20Look%20Paving%20Sealer%20After.png', 'title' => 'JADE Wet Look Paving Sealer']
            ]
        ]
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
    $xml .= '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

    foreach ($urls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($u['loc'], ENT_XML1, 'UTF-8') . "</loc>\n";
        $xml .= "    <lastmod>" . $u['lastmod'] . "</lastmod>\n";
        $xml .= "    <changefreq>" . $u['changefreq'] . "</changefreq>\n";
        $xml .= "    <priority>" . $u['priority'] . "</priority>\n";
        if (!empty($u['images'])) {
            foreach ($u['images'] as $img) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($img['loc'], ENT_XML1, 'UTF-8') . "</image:loc>\n";
                if (!empty($img['title'])) {
                    $xml .= "      <image:title>" . htmlspecialchars($img['title'], ENT_XML1, 'UTF-8') . "</image:title>\n";
                }
                $xml .= "    </image:image>\n";
            }
        }
        $xml .= "  </url>\n";
    }

    $xml .= "</urlset>\n";
    return $xml;
}

// Serve XML Sitemap at /sitemap.xml
add_action('init', function() {
    add_rewrite_rule('^sitemap\.xml$', 'index.php?jade_sitemap=1', 'top');

    // Auto-sync static sitemap.xml & robots.txt to web root if writable
    $sitemap_path = ABSPATH . 'sitemap.xml';
    $xml_content = jade_get_sitemap_xml();
    if (!file_exists($sitemap_path)) {
        @file_put_contents($sitemap_path, $xml_content);
    }

    $robots_path = ABSPATH . 'robots.txt';
    if (file_exists($robots_path)) {
        $curr_robots = @file_get_contents($robots_path);
        if ($curr_robots && strpos($curr_robots, 'sitemap.xml') === false) {
            @file_put_contents($robots_path, rtrim($curr_robots) . "\n\nSitemap: https://jadecoatings.lk/sitemap.xml\n");
        }
    }

    // Direct endpoint interception for /sitemap.xml
    if (isset($_SERVER['REQUEST_URI']) && preg_match('#^/sitemap\.xml(\?.*)?$#i', $_SERVER['REQUEST_URI'])) {
        status_header(200);
        http_response_code(200);
        header('HTTP/1.1 200 OK');
        header('Status: 200 OK');
        header('Content-Type: application/xml; charset=utf-8');
        header('X-Robots-Tag: noindex, follow', true);
        echo $xml_content;
        exit;
    }
}, 1);

add_filter('query_vars', function($vars) {
    $vars[] = 'jade_sitemap';
    return $vars;
});

add_action('template_redirect', function() {
    if (get_query_var('jade_sitemap')) {
        status_header(200);
        http_response_code(200);
        header('HTTP/1.1 200 OK');
        header('Status: 200 OK');
        header('Content-Type: application/xml; charset=utf-8');
        header('X-Robots-Tag: noindex, follow', true);
        echo jade_get_sitemap_xml();
        exit;
    }
});

add_action('template_include', function($template) {
    if (get_query_var('jade_dealers_admin')) {
        $admin_file = get_template_directory() . '/admin.php';
        if (file_exists($admin_file)) {
            return $admin_file;
        }
    }
    return $template;
});
