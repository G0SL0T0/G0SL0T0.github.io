<?php
class WriteSonic_Analytics_Request_Interceptor {

    public function init() {
        add_action('template_redirect', array($this, 'intercept_request'), 1);
    }

    public function intercept_request() {
        if (!get_option('writesonic_analytics_enabled', true)) {
            return;
        }

        $api_key = get_option('writesonic_analytics_api_key', '');
        if (empty($api_key)) {
            return;
        }

        $this->send_analytics_async();
    }

    private function send_analytics_async() {
        // This sends data after page is delivered, non-blocking
        add_action('shutdown', array($this, 'send_analytics_data'));
    }

    public function send_analytics_data() {
        if (is_admin()) {
            return;
        }

        $analytics_data = $this->gather_request_data();
        $api_key = get_option('writesonic_analytics_api_key', '');

        $api = new WriteSonic_Analytics_API();
        $api->send_analytics($analytics_data, $api_key);
    }

    private function gather_request_data() {
        $all_headers = $this->get_all_headers();
        
        $user_agent = isset($all_headers['User-Agent']) ? $all_headers['User-Agent'] : '';
        $referrer = isset($all_headers['Referer']) ? $all_headers['Referer'] : '';
        $ip = $this->get_client_ip();
        
        $host = isset($_SERVER['HTTP_HOST']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_HOST'])) : '';
        $request_uri = isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '';
        
        if (strpos($host, 'http://') === 0 || strpos($host, 'https://') === 0) {
            $url = esc_url_raw($host . $request_uri);
        } else {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $url = esc_url_raw($protocol . '://' . $host . $request_uri);
        }
        
        $method = isset($_SERVER['REQUEST_METHOD']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD'])) : 'GET';
        $response_status = http_response_code();

        return array(
            'ua' => $user_agent,
            'referrer' => $referrer,
            'ip' => $ip,
            'country_code' => $this->get_country_code(),
            'url' => $url,
            'method' => $method,
            'x_forwarded_for' => isset($all_headers['X-Forwarded-For']) ? $all_headers['X-Forwarded-For'] : '',
            'x_real_ip' => isset($all_headers['X-Real-IP']) ? $all_headers['X-Real-IP'] : $ip,
            'response_status' => (string) $response_status,
            'integration_name' => 'wordpress',
            'wp_version' => get_bloginfo('version'),
            'site_title' => get_bloginfo('name'),
        );
    }

    private function get_all_headers() {
        $headers = array();
        
        // Use getallheaders() if available
        if (function_exists('getallheaders')) {
            return getallheaders();
        }
        
        // Fallback method to get headers from $_SERVER
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) === 'HTTP_') {
                $header_name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
                $headers[$header_name] = sanitize_text_field(wp_unslash($value));
            } else if ($name === 'CONTENT_TYPE' || $name === 'CONTENT_LENGTH') {
                $header_name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', $name))));
                $headers[$header_name] = sanitize_text_field(wp_unslash($value));
            }
        }
        
        return $headers;
    }

    /**
     * Get client IP address
     */
    private function get_client_ip() {
        $ip_keys = array(
            'HTTP_CF_CONNECTING_IP',
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        );

        foreach ($ip_keys as $key) {
            if (isset($_SERVER[$key]) && filter_var(wp_unslash($_SERVER[$key]), FILTER_VALIDATE_IP)) {
                return sanitize_text_field(wp_unslash($_SERVER[$key]));
            }
        }

        return '';
    }

    private function get_country_code() {
        $headers = $this->get_all_headers();
        
        if (!empty($headers['CF-IPCountry'])) {
            return $headers['CF-IPCountry'];
        }
        
        // Try other common headers
        $country_headers = array(
            'HTTP_X_COUNTRY_CODE',
            'HTTP_GEOIP_COUNTRY_CODE',
            'HTTP_X_COUNTRY'
        );
        
        foreach ($country_headers as $header) {
            if (isset($_SERVER[$header])) {
                return sanitize_text_field(wp_unslash($_SERVER[$header]));
            }
        }
        
        // Try geoPlugin if available
        if (function_exists('geoplugin_countryCode')) {
            $country_code = geoplugin_countryCode();
            if (!empty($country_code)) {
                return $country_code;
            }
        }
        
        return '';
    }
}