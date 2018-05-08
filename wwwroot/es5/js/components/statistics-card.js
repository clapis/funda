(function(funda, $) {
    'use strict';

    funda.components.StatisticsCard = function($element, config, service) {

        var templates = {
            card:        
                '<div class="card stats-card">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title mb-1">${title}</h5>' +
                        '<p class="card-text mb-3 text-muted">${description}</p>' +
                        '<table class="table table-striped table-sm">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>#</th>' +
                                    '<th>Makelaar</th>' +
                                    '<th>Objects</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            '</tbody>' +
                        '</table>' +
                        '<p class="loading-text">Loading..</p>' +
                        '<p class="error-text text-danger">Oops, couldn\'t load these stats now :(</p>' +
                    '</div>' +
                '</div>',
            row: 
                '<tr>' +
                    '<td>${index}</td>' +
                    '<td>${name}</td>' +
                    '<td>${count}</td>' +
                '</tr>'
        };

        (function() {
            // render card component
            $element.append(getCardHtml());            
        })();

        function load() {
            $element.addClass('loading');

            service.getTopAgents(config.statistic)
                .done(function (data) {
                    renderStatisticsResults(data);
                })
                .fail(function (error) {
                    handleError(error);
                })
                .always(function () {
                    $element.removeClass('loading');
                });
        }

        function getCardHtml() {
            return templates.card
                .replace('${title}', config.title)
                .replace('${description}', config.description);
        }

        function getRowHtml(value, index) {
            return templates.row
                .replace('${index}', index + 1)
                .replace('${name}', value.name)
                .replace('${count}', value.houseCount);
        }

        function renderStatisticsResults(data) {
            var $tbody = $('tbody', $element);

            var rows = data.map(getRowHtml);

            $tbody.append(rows.join());
        }

        function handleError(error) {
            console.log(error);
            $element.addClass('error');
        }

        return {
            load: load
        }
    }
    
})(funda, jQuery);