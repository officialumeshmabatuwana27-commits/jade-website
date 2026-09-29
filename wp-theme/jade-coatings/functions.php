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

add_action('template_include', function($template) {
    if (get_query_var('jade_dealers_admin')) {
        $admin_file = get_template_directory() . '/admin.php';
        if (file_exists($admin_file)) {
            return $admin_file;
        }
    }
    return $template;
});
