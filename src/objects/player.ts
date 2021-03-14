import { GameObject } from './gameObject'
import { Rect } from './shape'
import { createDivElementInGameWrapper, createShape } from '../utils/domUtils'

/**
 * player
 */
export class Player implements GameObject, Rect {
  x = 0
  y = 190
  width = 150
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

  biliPlayerVideoWrap: HTMLDivElement
  el: HTMLDivElement

  vx = 0

  isLeftKeyDown = false
  isRightKeyDown = false

  constructor(biliPlayerVideoWrap: HTMLDivElement) {
    this.biliPlayerVideoWrap = biliPlayerVideoWrap
    this.el = createDivElementInGameWrapper(
      biliPlayerVideoWrap,
      'break-game-player',
      ''
    )

    addEventListener('keydown', (e) => {
      if (e.key === 'a') this.isLeftKeyDown = true
      if (e.key === 'd') this.isRightKeyDown = true
    })
    addEventListener('keyup', (e) => {
      if (e.key === 'a') this.isLeftKeyDown = false
      if (e.key === 'd') this.isRightKeyDown = false
    })
  }

  update(delta: number): void {
    if (this.isLeftKeyDown === this.isRightKeyDown) this.vx = 0
    else if (this.isLeftKeyDown) this.vx = -300
    else if (this.isRightKeyDown) this.vx = 300
    this.x += this.vx * delta
    this.el.style.left = this.x.toString() + 'px'
  }

  reset(): void {
    this.x =
      this.biliPlayerVideoWrap.getBoundingClientRect().width / 2 -
      this.width / 2
    this.el.style.left = this.x.toString() + 'px'
  }
}
