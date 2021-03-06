import { Element } from 'engine';

const DEFAULT_HREF = 'javascript:void(0);'; // eslint-disable-line no-script-url

export default class NavItem extends Element {
    @api href = DEFAULT_HREF;

    state = {
        selected: false,
    };

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('itemregister', {
                bubbles: true,
                cancelable: true,
                composable: true,
            })
        );
    }
}