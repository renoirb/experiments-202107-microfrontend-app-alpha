import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators'

import './atom-click-counter'

export type AtomArticleStateTransition = 'create' | 'update'

export interface AtomArticleState {
  articleId: string
}

const NAME = 'atom-article'

export const dispatchEvent = (
  host: AtomArticle,
  data: AtomArticleState,
  transition: AtomArticleStateTransition = 'create',
) => {
  const detail: AtomArticleState = {
    articleId: data.articleId ?? '',
  }
  const eventName = `${NAME}:${transition}`
  host.dispatchEvent(
    new CustomEvent<AtomArticleState>(eventName, {
      detail,
      bubbles: true,
      composed: true,
    }),
  )
}

@customElement(NAME)
export class AtomArticle extends LitElement {
  static styles = css`
    article {
      padding: 20px;
      font-family: 'Open Sans', sans-serif;
    }
  `

  @property({ attribute: 'data-article-id', type: String })
  protected articleId: string = ''

  connectedCallback() {
    const detail: AtomArticleState = { articleId: this.articleId }
    dispatchEvent(this, detail, 'create')
  }

  render() {
    return html`
      <article data-article-id=${this.articleId}>
        <header>
          <slot name="header">Article <em>${this.articleId}</em></slot>
        </header>
        <slot>
          <p>
            Manage complexity by building large, complex components out of
            smaller, simpler components that do one thing well.
          </p>
        </slot>
        <p>
          <span>Likes</span
          ><atom-click-counter
            model="only-once-both"
            target-channel=${this.articleId}
          ></atom-click-counter>
        </p>
      </article>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AtomArticle
  }
}
