import { GameObject } from './gameObject'
import { Rect } from './shape'

export class Block implements GameObject, Rect {
  blockElement: HTMLDivElement

  left: number
  right: number
  top: number
  bottom: number

  originalLife: number
  originalColor: string

  life: number

  constructor(gameWrapperElement: HTMLDivElement, el: HTMLDivElement) {
    this.blockElement = el

    // calculating coordinates in SVG
    const r = el.getBoundingClientRect()
    const rr = gameWrapperElement.getBoundingClientRect()
    this.left = r.left - rr.left
    this.right = this.left + r.width
    this.top = rr.height - (r.top - rr.top)
    this.bottom = this.top - r.height

    this.originalLife = Number(el.getAttribute('data-count'))
    this.life = this.originalLife
    this.originalColor = el.getAttribute('fill') || '#ebedf0'
  }

  update(delta: number) {
    console.log(delta)
  }

  /**
   * called when hit the ball
   */
  onCollide() {
    this.life = 0 // breaks at once
    this.blockElement.setAttribute('style', `left: -100px; `)
  }

  reset() {
    this.life = this.originalLife
    this.blockElement.setAttribute('fill', this.originalColor)
    this.blockElement.setAttribute('data-count', this.originalLife.toString())
  }
}
