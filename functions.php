<?php

// EditURI link
remove_action( 'wp_head', 'rsd_link' );

// Category feed links
remove_action( 'wp_head', 'feed_links_extra', 3 );

// Post and comment feed links
remove_action( 'wp_head', 'feed_links', 2 );

// Windows Live Writer
remove_action( 'wp_head', 'wlwmanifest_link' );

// Index link
remove_action( 'wp_head', 'index_rel_link' );

// Previous link
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );

// Start link
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );

// Canonical
remove_action('wp_head', 'rel_canonical', 10, 0 );

// Shortlink
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );

// Links for adjacent posts
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

// WP version
remove_action( 'wp_head', 'wp_generator' );

// DNS prefetch link
remove_action( 'wp_head', 'wp_resource_hints', 2);

// Disable Emojis
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// REST route link
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );

// oEmbed discovery links.
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );

// oEmbed-specific JavaScript from the front-end and back-end
remove_action( 'wp_head', 'wp_oembed_add_host_js' );

// Turn on thumbnails
add_theme_support( 'post-thumbnails' );

// Turn on titles
add_theme_support( 'title-tag' );

// Disable jpeg-compress
add_filter( 'jpeg_quality', function( $arg ) { return 100; } );

// Turn on HTML5 search form
add_theme_support( 'html5', array( 'search-form' ) );

// Connect CSS and JS
function inception_assets() {
    wp_enqueue_style( 'normalize', get_stylesheet_directory_uri() . '/libs/normalize.css' );
    wp_enqueue_style( 'slick', get_stylesheet_directory_uri() . '/libs/slick/slick.css', array( 'normalize' ) );
    wp_enqueue_style( 'slick-theme', get_stylesheet_directory_uri() . '/libs/slick/slick-theme.css', array( 'normalize', 'slick' ) );
    wp_enqueue_style( 'style', get_stylesheet_uri(), array( 'normalize', 'slick', 'slick-theme' ) );

    wp_enqueue_script( 'slick', get_stylesheet_directory_uri() . '/libs/slick/slick.min.js', array( 'jquery' ), NULL, true );
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/scripts.js', array( 'jquery', 'slick' ), NULL, true );
}

add_action( 'wp_enqueue_scripts', 'inception_assets' );

// Register menus
register_nav_menus( array(
    'primary' => esc_html__( 'primary', 'inception-base' )
) );

// New image types
// add_image_size('work_list', 500, 350, true);

// add_action( 'carbon_fields_register_fields', 'crb_register_custom_fields' );
// function crb_register_custom_fields() {
//   require_once __DIR__ . '/includes/carbon-fields/theme_options.php';
// }
