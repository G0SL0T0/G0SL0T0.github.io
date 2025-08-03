<?php
/**
 * API Class
 *
 * Handles communication with the WriteSonic API
 */
require_once WRITESONIC_ANALYTICS_DIR . 'includes/class-constants.php';
class WriteSonic_Analytics_API {
    public function send_analytics($analytics_data, $api_key) {
        
        $ingestion_domain = WriteSonic_Analytics_Constants::DEFAULT_INGESTION_DOMAIN;
        $ingestion_route = WriteSonic_Analytics_Constants::API_ENDPOINT_ANALYTICS;
        
        $endpoint = trailingslashit($ingestion_domain) . $ingestion_route;

        $args = array(
            'method'    => 'POST',
            'timeout'   => 5,
            'blocking'  => false,
            'headers'   => array(
                'Content-Type' => 'application/json',
                'x-api-key'    => $api_key,
            ),
            'body'      => json_encode($analytics_data),
            'cookies'   => array(),
        );

        $response = wp_remote_post($endpoint, $args);

        return true;
    }
}