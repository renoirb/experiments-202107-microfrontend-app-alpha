import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import './atom-article.ts'
import './app-rooter.ts'

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <slot>in slot</slot>
      <atom-article data-article-id="hello-world"></atom-article>
      <app-footer></app-footer>
    `
  }
}
