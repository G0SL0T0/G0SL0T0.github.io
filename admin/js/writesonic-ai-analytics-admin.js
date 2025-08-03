(function($) {
    'use strict';
	
	/// Check if FontAwesome is already added to avoid adding it more than once
    if (!document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'; // FontAwesome CDN link
        document.head.appendChild(link);
    }

    $(document).ready(function() {
        $('.writesonic-api-key-visibility').on('click', function() {
            const apiKeyField = $('#writesonic_analytics_api_key');
            const icon = $(this).find('span');

            if (apiKeyField.attr('type') === 'password') {
                apiKeyField.attr('type', 'text');
                icon.removeClass('dashicons-visibility').addClass('dashicons-hidden');
            } else {
                apiKeyField.attr('type', 'password');
                icon.removeClass('dashicons-hidden').addClass('dashicons-visibility');
            }
        });

        $('#copy_api_key').on('click', function(e) {
            e.preventDefault();
            const apiKeyField = document.getElementById('writesonic_analytics_api_key');
            
            const originalType = apiKeyField.type;
            apiKeyField.type = 'text';
            
            apiKeyField.select();
            apiKeyField.setSelectionRange(0, 99999); // For mobile devices
            
            document.execCommand('copy');
            
            apiKeyField.type = originalType;
            
            const tooltip = $(this).find('.writesonic-tooltip');
            tooltip.text(writesonic_analytics_vars.copied_text);
            setTimeout(function() {
                tooltip.text(writesonic_analytics_vars.copy_text);
            }, 1500);
        });

        $('#toggle-password').on('click', function() {
			const apiKeyField = $('#writesonic_analytics_api_key');
            const icon = $(this);
            // Toggle the input type between 'password' and 'text'
            if (apiKeyField.attr('type') === 'password') {
                apiKeyField.attr('type', 'text');
                icon.removeClass('fa-eye').addClass('fa-eye-slash'); // Change icon to "eye-slash"
            } else {
                apiKeyField.attr('type', 'password');
                icon.removeClass('fa-eye-slash').addClass('fa-eye'); // Change icon to "eye"
            }
        });

    });

})(jQuery);