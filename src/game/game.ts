/**
 * Call update on every animation frame
 */
export abstract class Game {
  private lastUpdate = 0

  protected startGameLoop() {
    this.lastUpdate = Date.now()
    requestAnimationFrame(() => this._update())
  }

  _update() {
    this.update((Date.now() - this.lastUpdate) / 1000)
    this.lastUpdate = Date.now()
    requestAnimationFrame(() => this._update())
  }

  abstract update(delta: number): void
}
