(function (window, $) {
    'use strict';

    window.funda = window.funda || {
        services: {},
        components: {}
    };

    $(function() {
        var service = new funda.services.StatisticsService();
        
        $('div[data-stats-card]').each(function () {
            var $element = $(this);

            var config = {
                statistic: $element.attr('data-stats-card'),
                title: $element.attr('data-stats-card-title'),
                description: $element.attr('data-stats-card-description')
            };

            var card = new funda.components.StatisticsCard($element, config, service);

            card.load();
        });

    });

})(window, jQuery);