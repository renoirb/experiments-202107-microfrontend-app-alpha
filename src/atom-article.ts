import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators'
import { classMap } from 'lit/directives/class-map'

import './atom-click-counter'

const ATOM_TRANSITIONS = ['create', 'update', 'remove'] as const

export type AtomArticleStateTransition = typeof ATOM_TRANSITIONS[number]

export interface AtomArticleState {
  articleId: string
  title?: string
  summary?: string
}

export interface FullAtomArticleState extends AtomArticleState {
  transition: AtomArticleStateTransition
}

const NAME = 'atom-article'

const namesMap = new Map()
ATOM_TRANSITIONS.forEach((current) =>
  namesMap.set(current, `${NAME}:${current}`),
)

export const dispatchEvent = (
  host: AtomArticle,
  data: AtomArticleState,
  transition: AtomArticleStateTransition = 'create',
) => {
  const detail: AtomArticleState = {
    articleId: data.articleId ?? '',
  }
  if (!namesMap.has(transition)) {
    throw new TypeError(`Invalid event name ${transition}`)
  }
  const eventName = namesMap.get(transition)
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
    :host {
      font-family: 'Open Sans', sans-serif;
      border: 1px solid hotpink;
      display: block;
    }
    :host(.is-empty) {
      background-color: hotpink;
    }
  `

  @property({ attribute: 'data-article-id', type: String })
  protected articleId: string = ''

  @property({ state: true, type: String })
  protected transitionState: AtomArticleStateTransition | 'updated' = 'create'

  @property({ state: true, type: String })
  protected articleTitle: string = ''

  @property({ state: true, type: String })
  protected articleSummary: string = ''

  constructor() {
    super()
    this.addEventListener(
      'atom-article',
      (event: CustomEvent<FullAtomArticleState>) => {
        const {
          title = '',
          summary = '',
          transition = 'update',
          articleId = '',
        } = event.detail
        if (this.articleId === articleId) {
          if (title !== '' && title !== this.articleTitle) {
            this.articleTitle = title
          }
          if (summary !== '' && summary !== this.articleSummary) {
            this.articleSummary = summary
          }
          this.transitionState =
            transition === 'update' ? 'updated' : transition
        }
      },
    )
  }

  connectedCallback() {
    super.connectedCallback()
    const detail: AtomArticleState = { articleId: this.articleId }
    dispatchEvent(this, detail, 'create')
  }

  render() {
    const classListMap = {
      'is-empty': this.transitionState === 'create',
      'is-loaded': this.transitionState !== 'create',
      'is-article': this.title !== '',
    }
    return html`
      <article
        ?data-article-id=${this.articleId}
        class=${classMap(classListMap)}
      >
        <header>
          <h2>
            ${this.articleTitle !== ''
              ? this.articleTitle
              : html`Article
                ${this.articleId ? html`<em>${this.articleId}</em>` : nothing}`}
          </h2>
        </header>
        ${this.articleSummary !== ''
          ? this.articleSummary
          : html` <slot> Loading... </slot>`}
        <section>
          <span>Likes</span
          ><atom-click-counter
            model="only-once-both"
            target-channel=${this.articleId}
          ></atom-click-counter>
        </section>
      </article>
    `
  }
}

declare global {
  interface HTMLElementEventMap {
    // https://open-wc.org/guides/knowledge/events/
    // https://github.com/WICG/webcomponents/issues/908
    readonly [NAME]: CustomEvent<FullAtomArticleState>
  }

  interface HTMLElementTagNameMap {
    readonly [NAME]: AtomArticle
  }
}
