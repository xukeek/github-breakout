import { Breakout } from './game/breakout'

/**
 * called on github page loaded
 */
function main() {
  const biliPlayerArea = document.querySelector<HTMLDivElement>(
    '#bilibili-player .bilibili-player-area'
  )
  const biliVideoWrap = document.querySelector<HTMLDivElement>(
    '#bilibili-player .bilibili-player-video-wrap'
  )
  if (!biliPlayerArea || !biliVideoWrap) return
  new Breakout(biliPlayerArea, biliVideoWrap)
}

main()
