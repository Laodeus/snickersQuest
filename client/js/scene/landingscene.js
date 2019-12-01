class LandingScene extends Phaser.Scene {
  constructor() {
    super("LandingScene");
  }

  preload() {
    this.load.image("sky", "assets/landing/sky.png");
  }

  create() {
    console.log("LandingScene");
    this.add.image(400, 300, "sky");

    this.input.on(
      "pointerup",
      function(pointer) {
        this.scene.start("MenuScene");
      },
      this
    );
  }
}
