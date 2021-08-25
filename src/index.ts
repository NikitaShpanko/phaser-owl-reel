import Phaser from "phaser"
import { screen } from "./config.json"
import Reel from "./classes/Reel"
import Reels from "./classes/Reels"
import Button from "./classes/Button"

class MyGame extends Phaser.Scene {
  preload() {
    Reel.preload(this)
  }

  create() {
    const reels = new Reels(
      this,
      screen.width / 2,
      screen.height * screen.reelYrel,
      screen.width * screen.reelWidthRel
    )
    this.add.existing(reels)

    const button = new Button(
      this,
      screen.width / 2,
      screen.height * screen.buttonYrel,
      "Spin!",
      () => {
        reels.spin((spinState: boolean) => {
          button.busy = spinState
        })
      }
    )
    this.add.existing(button)
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: screen.width,
  height: screen.height,
  scene: MyGame,
}

const game = new Phaser.Game(config)
