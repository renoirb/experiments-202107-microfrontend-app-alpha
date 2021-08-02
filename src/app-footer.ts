import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

const NAME = 'app-footer'

@customElement(NAME)
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      bottom: 0;
      font-family: Manrope, sans-serif;
      left: 0;
      position: absolute;
      right: 0;
    }
    footer {
      display: flex;
      position: relative;
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
