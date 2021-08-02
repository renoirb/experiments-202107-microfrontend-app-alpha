import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import './atom-article.ts'
import './app-footer.ts'
import './app-header.ts'

const NAME = 'app-root'

@customElement(NAME)
export class AppRoot extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <atom-article data-article-id="hello-world">?</atom-article>
      <app-footer></app-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AppRoot
  }
}
