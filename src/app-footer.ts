import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

const NAME = 'app-footer'

@customElement(NAME)
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid blue;
      justify-content: center;
    }
  `
  render() {
    return html`
      <footer>
        <slot><p>THE END</p></slot>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AppFooter
  }
}
