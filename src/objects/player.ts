import { GameObject } from './gameObject'
import { Rect } from './shape'
import { createDivElementInGameWrapper } from '../utils/domUtils'

/**
 * player
 */
export class Player implements GameObject, Rect {
  x = 0
  y = 10
  width = 150
  height = 10

  get left() {
    return this.x
  }

  get right() {
    return this.x + this.width
  }

  get top() {
    return this.y + this.height
  }

  get bottom() {
    return this.y
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
    this.el.style.width = `${this.width}px`
    this.el.style.height = `${this.height}px`
    this.reset()

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
