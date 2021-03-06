# [Simple animation](https://nikitashpanko.github.io/phaser-owl-reel/) of spinning slot

Implemented using [Phaser 3](https://phaser.io/).

Assets were taken from [Clipart Library](http://clipart-library.com/owl-clip-art.html).

Three classes were implemented: [Reels](./src/classes/Reels.ts) for a set of reels, [Reel](./src/classes/Reel.ts) for a single reel and [Button](./src/classes/Button.ts) for the "Spin!" button. All of them extend Phaser's `GameObject` classes.

Both `Reels` and `Reel` have custom `spin(callback)` method which starts the spinning.  Optional parameter `callback` is a function, which is called as `callback(true)` upon spinning start and as `callback(false)` upon spinning stop. This mechanism was used to alter button's appearance.

This game relies on Phaser 3 built-in random generator.
Reels are generated randomly on game start.

Vast majority of game settings can be tweaked in [config.json](./src/config.json).
