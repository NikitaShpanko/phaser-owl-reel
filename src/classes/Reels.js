import Phaser from "phaser";
import Reel from "./Reel";
import { reel, reelCount } from "../config.json";

export default class Reels extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width) {
    const reelList = [];
    const widthDiff = width - reel.element.width;
    const minX = -widthDiff / 2;
    const stepX = widthDiff / (reelCount - 1);
    for (let i = 0; i < reelCount; i++) {
      reelList.push(new Reel(scene, minX + stepX * i, 0));
    }
    super(scene, x, y, reelList);
  }

  get isSpinning() {
    return this.list.some((reel) => reel.isSpinning);
  }

  spin(callback) {
    if (this.isSpinning) return;
    let spinCount = 0;
    if (typeof callback === "function") callback(true);

    this.list.forEach((reel) => {
      reel.spin((spinState) => {
        if (spinState) spinCount++;
        else spinCount--;
        if (!spinCount && typeof callback === "function") callback(false);
      });
    });
  }
}

Phaser.GameObjects.GameObjectFactory.register("reels", function (x, y, width) {
  const reels = new Reels(this.scene, x, y, width);
  this.displayList.add(reels);
  //   this.updateList.add(reel);
  return reels;
});
