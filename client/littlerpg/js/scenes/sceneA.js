class SceneA extends Phaser.Scene {
  constructor() {
    super("SceneA");
  }

  preload() {
    this.load.image("sky", "asset/sky.png");
  }

  create() {
    console.log("SceneA");
    this.lights.enable();

    this.lights.addLight(300, 300, 300, 0xff0000, 1);
    this.lights.addLight(400, 300, 300, 0x00ff00, 1);
    this.lights.addLight(600, 500, 300, 0x0000ff, 1);

    this.input.on(
      "pointerup",
      function(pointer) {
        this.scene.start("SceneB");
      },
      this
    );
  }
}
