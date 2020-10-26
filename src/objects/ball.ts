import { GameObject } from './gameObject'
import { Direction } from '../utils/intersect'
import { Circle } from './shape'

const speed = 140

/**
 * ball
 */
export class Ball implements GameObject, Circle {
  gameWrapperElement: HTMLDivElement
  gameAreaElement: HTMLDivElement
  ballElement: HTMLDivElement

  x = 0
  y = 185
  r = 30

  vx = 0
  vy = 0

  constructor(
    gameWrapperElement: HTMLDivElement,
    gameAreaElement: HTMLDivElement
  ) {
    this.gameWrapperElement = gameWrapperElement
    this.gameAreaElement = gameAreaElement

    this.x = this.gameWrapperElement.getBoundingClientRect().width / 2 - this.r

    const ball = document.createElement('div')
    ball.setAttribute('id', 'break-game-ball')
    gameWrapperElement.insertBefore(ball, null)
    this.ballElement = ball

    this.vx = speed
    this.vy = -speed
  }

  update(delta: number): void {
    //// prevent the ball to go out of the area
    if (
      this.x > this.gameAreaElement.getBoundingClientRect().width - this.r ||
      this.x < 0
    ) {
      this.vx *= -1
      this.x += this.vx / Math.abs(this.vx)
    }
    if (
      this.y > this.gameAreaElement.getBoundingClientRect().height - this.r ||
      this.y < 0
    ) {
      this.vy *= -1
      this.y += this.vy / Math.abs(this.vy)
    }
    ////

    // calc next position
    this.x = this.x + this.vx * delta
    this.y = this.y + this.vy * delta
    this.ballElement.setAttribute(
      'style',
      `left: ${this.x}px; top: ${this.y}px`
    )
  }

  /**
   * called when hit an object
   * @param d direction to reflect
   */
  onCollide(d: Direction) {
    if (d === Direction.X) {
      this.vx *= -1
      this.x += this.vx / Math.abs(this.vx)
    } else if (d === Direction.Y) {
      this.vy *= -1
      this.y += this.vy / Math.abs(this.vy)
    } else if (d === Direction.XY) {
      this.vx *= -1
      this.vy *= -1
    }
  }

  reset() {
    this.x = this.gameAreaElement.getBoundingClientRect().width / 2 - this.r
    this.y = 185
    this.vx = speed
    this.vy = -speed
    this.ballElement.setAttribute('style', `left: ${this.x}; top: ${this.y}`)
  }
}
