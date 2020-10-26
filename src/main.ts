import { Breakout } from './game/breakout'

/**
 * called on github page loaded
 */
function main() {
  const player = document.querySelector<HTMLDivElement>(
    '#bilibili-player .bilibili-player-area'
  )
  const playerArea = document.querySelector<HTMLDivElement>(
    '#bilibili-player .bilibili-player-video-wrap'
  )
  if (!player || !playerArea) return
  new Breakout(player, playerArea)
}

main()
