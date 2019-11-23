class SceneB extends Phaser.Scene {
  constructor() {
    super("SceneB");
  }

  preload() {
    this.load.spritesheet("dude", "asset/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  create() {
    let player = new player();
    console.log("SceneB");
    this.lights.enable();
    this.input.keyboard.on("keydown-Z", player.movePlayer);
  }
}
