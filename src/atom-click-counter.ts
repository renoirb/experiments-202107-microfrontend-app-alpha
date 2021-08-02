import { LitElement, html, nothing } from 'lit'
import { customElement } from 'lit/decorators'

const NAME = 'atom-click-counter'

const COUNTER_MODEL = [
  'only-once-up',
  'only-once-down',
  'only-once-both',
] as const

export type AtomClickCounterModel = typeof COUNTER_MODEL[number]

export interface AtomClickCounterState {
  count: number
  model: AtomClickCounterModel
  targetChannel: string
}

const dispatchEvent = (host: AtomClickCounter, data: AtomClickCounterState) => {
  const detail: AtomClickCounterState = {
    ...data,
    count: data.count ?? 0,
    targetChannel: data.targetChannel ?? '',
  }
  const eventName = `${NAME}:${detail.targetChannel}`
  host.dispatchEvent(
    new CustomEvent<AtomClickCounterState>(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }),
  )
}

@customElement(NAME)
export class AtomClickCounter extends LitElement {
  protected count = 0
  protected targetChannel: '' | string = ''
  protected model: AtomClickCounterModel = 'only-once-both'

  static get properties() {
    return {
      count: { state: true, type: Number },
      targetChannel: { attribute: 'target-channel', type: String },
      model: { type: String },
    }
  }

  private handleClick = (event: HTMLElementEventMap['click']) => {
    const { currentTarget = {} } = event
    const { dataset = {} } = currentTarget as HTMLElement
    const { intent = 'increment' } = dataset
    this.count = intent === 'decrement' ? this.count - 1 : this.count + 1
    if (this.targetChannel !== '') {
      const detail: AtomClickCounterState = {
        count: this.count,
        model: this.model,
        targetChannel: this.targetChannel,
      }
      dispatchEvent(this, detail)
    }
    if (/^only-once/.test(this.model)) {
      this.querySelectorAll('[data-intent]').forEach((e) => {
        e.setAttribute('disabled', '')
      })
    }
  }

  public render() {
    return html`
      <div>
        ${/(both|down)$/.test(this.model)
          ? html`<button data-intent="decrement" @click=${this.handleClick}>
              -
            </button>`
          : nothing}
        ${this.count}
        ${/(both|up)$/.test(this.model)
          ? html`<button data-intent="increment" @click=${this.handleClick}>
              +
            </button>`
          : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: AtomClickCounter
  }
}
