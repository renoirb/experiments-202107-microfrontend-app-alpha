import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat'

import './atom-article'
import './app-footer'
import './app-header'

const NAME = 'app-root'

const fromAttribute = (value: string): string[] => value.split(',')
const toAttribute = (value: string[]): string => value.join(',')

@customElement(NAME)
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      border: 1px solid blue;
      display: block;
    }
    atom-article + atom-article {
      margin-top: 20px;
    }
  `

  @property({
    attribute: 'data-article-ids',
    type: Array,
    converter: { fromAttribute, toAttribute },
  })
  protected articleIds: string[] = []

  render() {
    return html`
      <app-header></app-header>
      ${repeat(
        this.articleIds,
        (articleId) =>
          html`<atom-article
            class="aaaa"
            data-article-id=${articleId}
          ></atom-article>`,
      )}
      <app-footer></app-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AppRoot
  }
}
