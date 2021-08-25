import Phaser from "phaser";
import { reel } from "../config.json";

const { element, visibleLength, animation } = reel;
const reelHeight = element.height * reel.length;
const { baseMovement, indexMovement, randomMovement, backSpeedSlower } =
  animation;

export default class Reel extends Phaser.GameObjects.TileSprite {
  static counter = 0;
  static preload = function (scene) {
    scene.load.spritesheet("elements", "../assets/" + element.sprite, {
      frameWidth: element.width,
      frameHeight: element.height,
      endFrame: element.count,
    });
  };

  index;
  baseMovement;
  backDurationPerPixel;
  isSpinning = false;

  constructor(scene, x, y, index = Reel.counter) {
    const texName = `reel${Reel.counter}`;
    const tex = scene.textures.createCanvas(texName, element.width, reelHeight);

    for (let i = 0; i < reel.length; i++) {
      tex.drawFrame(
        "elements",
        Phaser.Math.Between(0, element.count - 1),
        0,
        element.height * i
      );
    }

    super(scene, x, y, element.width, visibleLength * element.height, texName);

    this.index = index;
    this.baseMovement = baseMovement + indexMovement * this.index;
    this.backDurationPerPixel =
      (animation.duration / this.baseMovement) * backSpeedSlower;
    this.delay = animation.indexDelay * this.index;

    Reel.counter++;
  }

  spin(callback) {
    if (this.isSpinning) return;
    this.isSpinning = true;
    if (typeof callback === "function") callback(true);

    this.move(
      this.baseMovement + Phaser.Math.Between(0, randomMovement),
      this.delay,
      animation.duration,
      animation.ease,
      () => {
        //Stabilize the reel after movement:
        let diff = this.tilePositionY % element.height;
        if (diff < -element.height / 2) diff += element.height;
        this.move(
          diff,
          0,
          Math.abs(diff) * this.backDurationPerPixel,
          animation.easeBack,
          () => {
            this.isSpinning = false;
            if (typeof callback === "function") callback(false);
          }
        );
      }
    );
  }

  move(downY, delay, duration, ease, onComplete) {
    const curY = this.tilePositionY % reelHeight;
    this.scene.tweens.addCounter({
      from: curY,
      to: curY - downY,
      duration,
      ease,
      onUpdate: (tween) => {
        this.tilePositionY = tween.getValue();
      },
      onComplete,
      delay,
    });
  }
}

Phaser.GameObjects.GameObjectFactory.register("reel", function (x, y) {
  const reel = new Reel(this.scene, x, y);
  this.displayList.add(reel);
  //   this.updateList.add(reel);
  return reel;
});
