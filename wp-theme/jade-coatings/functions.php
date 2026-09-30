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

add_action('template_include', function($template) {
    if (get_query_var('jade_dealers_admin')) {
        $admin_file = get_template_directory() . '/admin.php';
        if (file_exists($admin_file)) {
            return $admin_file;
        }
    }
    return $template;
});
