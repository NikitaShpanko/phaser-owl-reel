import Phaser from "phaser";
import { colors } from "../config.json";

export default class Button extends Phaser.GameObjects.Text {
  #busy = false;
  #hover = false;

  get busy() {
    return this.#busy;
  }

  set busy(busy) {
    this.#busy = busy;
    if (this.#hover) this.changeState();
  }

  get hover() {
    return this.#hover;
  }

  changeState() {
    if (this.#busy) {
      this.setColor(colors.busy);
      this.scene.input.setDefaultCursor("wait");
    } else {
      this.setColor(colors.hover);
      this.scene.input.setDefaultCursor("pointer");
    }
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: Function
  ) {
    super(scene, x, y, text, {
      fontSize: "64px",
      color: colors.text,
      align: "center",
    });
    this.setOrigin(0.5);
    this.setInteractive({ cursor: "wait" });
    this.on("pointerup", onClick);
    this.on("pointerover", () => {
      this.#hover = true;
      this.changeState();
    });
    this.on("pointerout", () => {
      this.#hover = false;
      this.setColor(colors.text);
      this.scene.input.setDefaultCursor("auto");
    });
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "button",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    text: string,
    onClick: Function
  ) {
    const button = new Button(this.scene, x, y, text, onClick);
    this.displayList.add(button);
    // this.updateList.add(button);
    return button;
  }
);
