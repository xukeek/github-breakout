import { GameObject } from './gameObject'
import { Rect } from './shape'
import { createDivElementInGameWrapper, createShape } from '../utils/domUtils'

/**
 * player
 */
export class Player implements GameObject, Rect {
  x = 0
  y = 190
  width = 70
  height = 5

  get left() {
    return this.x
  }

  get right() {
    return this.x + this.width
  }

  get top() {
    return this.y
  }

  get bottom() {
    return this.y + this.height
  }

  svg: HTMLDivElement
  el: HTMLDivElement

  vx = 0

  isLeftKeyDown = false
  isRightKeyDown = false

  constructor(svg: HTMLDivElement) {
    this.svg = svg
    this.el = createDivElementInGameWrapper(svg, 'break-game-player', '')

    addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.isLeftKeyDown = true
      if (e.key === 'ArrowRight') this.isRightKeyDown = true
    })
    addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') this.isLeftKeyDown = false
      if (e.key === 'ArrowRight') this.isRightKeyDown = false
    })
  }

  update(delta: number): void {
    if (this.isLeftKeyDown === this.isRightKeyDown) this.vx = 0
    else if (this.isLeftKeyDown) this.vx = -300
    else if (this.isRightKeyDown) this.vx = 300
    this.x += this.vx * delta
    this.el.setAttribute('x', this.x.toString())
  }

  reset(): void {
    this.x = this.svg.getBoundingClientRect().width / 2 - this.width / 2
    this.el.setAttribute('x', this.x.toString())
  }
}
