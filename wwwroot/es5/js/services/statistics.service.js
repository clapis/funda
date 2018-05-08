(function (funda, $) {
    'use strict';

    funda.services.StatisticsService = function () {

        function getTopAgents(options) {
            return $.ajax({
                method: 'GET',
                url: '/api/statistics/top-agents?options=' + options,
                contentType: 'application/json'
            });
        }

        return {
            getTopAgents: getTopAgents
        };
    }

})(funda, jQuery);