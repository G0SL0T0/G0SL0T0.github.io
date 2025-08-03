<?php
/**
 * Plugin Name: Writesonic AI Analytics
 * Plugin URI: https://writesonic.com
 * Description: Enhance your WordPress website's visibility to LLMs with AI analytics by Writesonic.
 * Version: 1.0.0
 * Author: Writesonic
 * Author URI: https://writesonic.com
 * Text Domain: writesonic-ai-analytics
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('WRITESONIC_ANALYTICS_VERSION', '1.0.0');
define('WRITESONIC_ANALYTICS_DIR', plugin_dir_path(__FILE__));
define('WRITESONIC_ANALYTICS_URL', plugin_dir_url(__FILE__));

require_once WRITESONIC_ANALYTICS_DIR . 'includes/class-request-interceptor.php';
require_once WRITESONIC_ANALYTICS_DIR . 'includes/class-admin.php';
require_once WRITESONIC_ANALYTICS_DIR . 'includes/class-api.php';


function writesonic_analytics_init() {
    $admin = new WriteSonic_Analytics_Admin();
    $admin->init();
    
    $interceptor = new WriteSonic_Analytics_Request_Interceptor();
    $interceptor->init();
}

add_action('init', 'writesonic_analytics_init');

function writesonic_analytics_activate() {
    add_option('writesonic_analytics_api_key', '');
    add_option('writesonic_analytics_enabled', true);
}

function writesonic_analytics_deactivate() {
    delete_option('writesonic_analytics_api_key');
    delete_option('writesonic_analytics_enabled');
}

register_activation_hook(__FILE__, 'writesonic_analytics_activate');
register_deactivation_hook(__FILE__, 'writesonic_analytics_deactivate');