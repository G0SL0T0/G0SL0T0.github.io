<?php
/**
 * Admin Class
 *
 * Handles the admin interface for WriteSonic Analytics
 */
class WriteSonic_Analytics_Admin {

    
    public function init() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_filter('plugin_action_links_writesonic-ai-analytics/writesonic-ai-analytics.php', array($this, 'add_settings_link'));        
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }
    
    public function enqueue_admin_assets($hook) {
        if ('settings_page_writesonic-ai-analytics' !== $hook) {
            return;
        }
        
        wp_enqueue_style(
            'writesonic-ai-analytics-admin',
            WRITESONIC_ANALYTICS_URL . 'admin/css/writesonic-ai-analytics-admin.css',
            array(),
            WRITESONIC_ANALYTICS_VERSION
        );
        
        wp_enqueue_script(
            'writesonic-ai-analytics-admin',
            WRITESONIC_ANALYTICS_URL . 'admin/js/writesonic-ai-analytics-admin.js',
            array('jquery'),
            WRITESONIC_ANALYTICS_VERSION,
            true
        );
        
        wp_localize_script(
            'writesonic-ai-analytics-admin',
            'writesonic_analytics_vars',
            array(
                'disable_confirmation' => __('Are you sure you want to disable AI Analytics tracking? No data will be sent to Writesonic while disabled.', 'writesonic-ai-analytics'),
                'copy_text' => __('Copy', 'writesonic-ai-analytics'),
                'copied_text' => __('Copied!', 'writesonic-ai-analytics'),
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('writesonic_analytics_nonce')
            )
        );
    }

    public function add_admin_menu() {
        add_options_page(
            'Writesonic AI Analytics', 
            'Writesonic AI Analytics', 
            'manage_options', 
            'writesonic-ai-analytics', 
            array($this, 'admin_page')
        );
    }

    public function register_settings() {
        register_setting(
            'writesonic_analytics_options',
            'writesonic_analytics_api_key',
            array(
                'type' => 'string',
                'description' => 'Writesonic API Key for AI Analytics tracking',
                'sanitize_callback' => function($input) {
                    $sanitized = sanitize_text_field(wp_unslash($input));
                    
                    if (empty($sanitized)) {
                        add_settings_error(
                            'writesonic_analytics_api_key',
                            'empty_api_key',
                            __('API key cannot be empty.', 'writesonic-ai-analytics')
                        );
                        return get_option('writesonic_analytics_api_key'); // Keep the old value
                    }
                    
                    return $sanitized;
                },
                'show_in_rest' => false,
                'default' => ''
            )
        );
    }


    public function add_settings_link($links) {
        $settings_link = '<a href="options-general.php?page=writesonic-ai-analytics">' . __('Settings', 'writesonic-ai-analytics') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }

    /**
     * Render admin page
     */
    public function admin_page() {
        $api_key = get_option('writesonic_analytics_api_key', '');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div class="writesonic-admin-card">
                <h2><?php esc_html_e('Configuration', 'writesonic-ai-analytics'); ?></h2>
                <form method="post" action="options.php" id="writesonic_analytics_form">
                    <?php settings_fields('writesonic_analytics_options'); ?>
                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="writesonic_analytics_api_key"><?php esc_html_e('API Key', 'writesonic-ai-analytics'); ?></label>
                            </th>
                            <td>
                                <div>
                                    <input type="password" 
                                           id="writesonic_analytics_api_key" 
                                           name="writesonic_analytics_api_key" 
                                           value="<?php echo esc_attr($api_key); ?>" 
                                           class="regular-text" />
                                    <i class="fa fa-eye" id="toggle-password" style="cursor: pointer;"></i>
                                </div>
                                <p class="description-text"><?php esc_html_e('Enter the API key provided by Writesonic.', 'writesonic-ai-analytics'); ?></p>
                            </td>
                        </tr>
                    </table>
                    <?php submit_button(esc_html__('Save Settings', 'writesonic-ai-analytics'), 'button-class'); ?>
                </form>
            </div>
        </div>
        <?php
    }
}