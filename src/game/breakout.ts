import { Ball } from '../objects/ball'
import { Block } from '../objects/block'
import { Game } from './game'
import { Player } from '../objects/player'
import { createDivElementInGameWrapper } from '../utils/domUtils'
import { getHighScore } from '../utils/score'

enum State {
  Ready,
  Playing,
  Done,
}

export class Breakout extends Game {
  state: State = State.Ready
  score = 0

  ball!: Ball
  blocks!: Block[]
  player!: Player

  headerElement!: HTMLElement | null
  button!: HTMLDivElement
  footerElement!: HTMLDivElement
  scoreElement!: HTMLDivElement

  biliPlayerArea: HTMLDivElement
  biliPlayerVideoWrap: HTMLDivElement

  constructor(
    biliPlayerArea: HTMLDivElement,
    biliPlayerVideoWrap: HTMLDivElement
  ) {
    super()
    this.biliPlayerArea = biliPlayerArea
    this.biliPlayerVideoWrap = biliPlayerVideoWrap
    ;(async () => {
      this.initGameObject()
      await this.initUI()
      this.startGameLoop()
    })()
  }

  initGameObject() {
    this.ball = new Ball(this.biliPlayerArea, this.biliPlayerVideoWrap)
    this.player = new Player(this.biliPlayerVideoWrap)
    this.blocks = [
      ...this.biliPlayerArea.querySelectorAll<HTMLDivElement>(
        '#bilibili-player .b-danmaku'
      ),
    ]
      .filter((e) => e.getAttribute('data-count') !== '0')
      .map((e) => new Block(this.biliPlayerArea, e))
  }

  async initUI() {
    this.scoreElement = createDivElementInGameWrapper(
      this.biliPlayerArea,
      'break-game-score',
      ''
    )

    this.headerElement = document.querySelector<HTMLElement>(
      '.js-yearly-contributions h2'
    )

    this.button = createDivElementInGameWrapper(
      this.biliPlayerArea,
      'break-game-button',
      'Play'
    )
    this.button.onclick = () => {
      this.onButtonClick()
    }

    const hs = await getHighScore()
    this.footerElement = createDivElementInGameWrapper(
      this.biliPlayerArea,
      'break-game-footer',
      'Press the arrow keys to play ←→'
    )
  }

  /**
   * game loop
   * @param delta time elapsed since the last time update was called
   */
  update(delta: number) {
    if (this.state !== State.Playing) return

    // update objects
    this.ball.update(delta)
    this.player.update(delta)
  }

  /**
   * update score and contribution label
   * @param contributons remaining contributions
   */
  updateLabel(contributons: number) {
    const tmp = this.headerElement?.textContent?.match(/.*?[0-9,]+([\s\S]*)/m)
    if (this.headerElement && tmp)
      this.headerElement.textContent = `${contributons.toLocaleString()}${tmp[1].replace(
        /\n/,
        ''
      )}`
    this.scoreElement.textContent = `score: ${this.score}`
  }

  /**
   * footer button
   */
  onButtonClick() {
    // Can't play? Let's write the code!
    // TODO 根据弹幕个数判断
    // if (this.blocks.length === 0) {
    //   location.href = 'https://github.com/new'
    //   return
    // }

    switch (this.state) {
      case State.Ready:
        this.state = State.Playing
        this.button.textContent = 'Reset'
        break
      case State.Playing:
        this.reset()
        break
      case State.Done:
        this.reset()
        break
    }
  }

  /**
   * Reset all status
   */
  async reset() {
    this.state = State.Ready
    let life = 0
    this.blocks.forEach((b) => {
      b.reset()
      life += b.originalLife
    })
    this.player.reset()
    this.ball.reset()
    this.score = 0
    this.button.textContent = 'Play!'
    this.scoreElement.textContent = ''
    this.footerElement.textContent = `HighScore: ${await getHighScore()}`
    this.updateLabel(life)
  }
}
