class AppRoot extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const root = this.attachShadow({ mode: 'open' });
        const html = document.querySelector('link[rel="import"][href$="app-root.html"]');
        const template = html.import.getElementById('app-root-template');

        root.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-root', AppRoot);