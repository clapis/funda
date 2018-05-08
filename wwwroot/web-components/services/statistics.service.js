export class StatisticsService {
    getTopAgents(options) {
        let url = `/api/statistics/top-agents?options=${options}`;
        return fetch(url).then(response => response.json());
    } 
}