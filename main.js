// Import the LitElement and html from the CDN:
import { LitElement, html } from 'https://unpkg.com/lit-element?module';


//In order to nest another component, you need to import it first.
import './anotherComponent.js';

// In order to use this class somewhere else, you need to add the keyword "export"
export class MainRoot extends LitElement {

    // This function is required to initialize the component:
    connectedCallback() {
        // ALWAYS add the suport.connectedCallback(), or else, you get some bugs.
        super.connectedCallback();
        console.log('lit element connected');
    }

    // The render method is the one that converts your html code here into a real html code in the index.html file.
    render() {
        return html`
        <h1>This is the new element!</h1>

        <!-- You can nest other components here as long as they are imported above -->
        <another-component></another-component>
        `;
    }
}

// You have to use this in order to define your tag name
customElements.define('main-root', MainRoot);