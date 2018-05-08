import { StatisticsService } from '../../services/statistics.service.js';

class StatisticsCard extends HTMLElement {

    get statistic() {
        return this.getAttribute('statistic');
    }

    constructor() {
        super();
        this.service = new StatisticsService();
    }
    
    connectedCallback() {
        this.render();
        this.loadStatistics();
    }

    render() {
        const root = this.attachShadow({mode: 'open'});
        const html = document.querySelector('link[rel="import"][href$="statistics-card.html"]');
        const template = html.import.getElementById('stats-card-template');

        root.appendChild(template.content.cloneNode(true));
    }

    loadStatistics() {
        this.classList.add('loading');
        this.service.getTopAgents(this.statistic)
            .then(data => this.renderStatsResults(data))
            .catch(error => this.handleError(error))
            .finally(() => this.classList.remove('loading'));
    }

    renderStatsResults(data) {
        const rows = data.map((v, i) =>
            `<tr>
                <td>${i + 1}</td>
                <td>${v.name}</td>
                <td>${v.houseCount}</td>
            </tr>`
        ).join('');

        this.shadowRoot.querySelector('tbody').innerHTML = rows;
    }

    handleError(error) {
        console.log(error);
        this.classList.add('error');
    }
}

window.customElements.define('stats-card', StatisticsCard);