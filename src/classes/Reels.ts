import Phaser from "phaser"
import Reel from "./Reel"
import { reel, reelCount } from "../config.json"

export default class Reels extends Phaser.GameObjects.Container {
  list: Reel[]

  constructor(scene: Phaser.Scene, x: number, y: number, width: number) {
    let reelList: Reel[] = []
    const widthDiff = width - reel.element.width
    const minX = -widthDiff / 2
    const stepX = widthDiff / (reelCount - 1)
    for (let i = 0; i < reelCount; i++) {
      reelList.push(new Reel(scene, minX + stepX * i, 0))
    }
    super(scene, x, y, reelList)
  }

  get isSpinning() {
    return this.list.some((reel: Reel) => reel.isSpinning)
  }

  spin(callback?: Function) {
    if (this.isSpinning) return
    let spinCount = 0
    if (callback) callback(true)

    this.list.forEach((reel) => {
      reel.spin((spinState) => {
        if (spinState) spinCount++
        else spinCount--
        if (!spinCount && callback) callback(false)
      })
    })
  }
}
