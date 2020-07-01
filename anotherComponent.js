import { LitElement, html } from 'https://unpkg.com/lit-element?module';

const paragraph = html`
<p>Here where I use to play football!</p>
`;

export class AnotherComponent extends LitElement {
    connectedCallback() {
        super.connectedCallback();
        console.log('AnotherComponent connected');
    }



    render() {
        return html`
        <h3>And yeah, this is the second one!</h3>
        ${paragraph}
        `;
    }

}

customElements.define('another-component', AnotherComponent);