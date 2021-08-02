import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

const NAME = 'app-header'

@customElement(NAME)
export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      font-family: Manrope, sans-serif;
      justify-content: center;
    }
  `
  render() {
    return html`<div class="inner">
      <div class="top"><slot>My site</slot></div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AppHeader
  }
}
