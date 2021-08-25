import Phaser from "phaser";
import { screen } from "./config.json";
import Reel from "./classes/Reel";
import Reels from "./classes/Reels";
import Button from "./classes/Button";

class MyGame extends Phaser.Scene {
  preload() {
    Reel.preload(this);
  }

  create() {
    const reels: Reels = this.add["reels"](
      screen.width / 2,
      screen.height * screen.reelYrel,
      screen.width * screen.reelWidthRel
    );

    const button: Button = this.add["button"](
      screen.width / 2,
      screen.height * screen.buttonYrel,
      "Spin!",
      () => {
        reels.spin((spinState: boolean) => {
          button.busy = spinState;
        });
      }
    );
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: screen.width,
  height: screen.height,
  scene: MyGame,
};

const game = new Phaser.Game(config);
