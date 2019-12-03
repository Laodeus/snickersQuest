class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
    this.btnStart = null;
  }

  preload() {}

  create() {
    console.log("MenuScene");

    this.btnStart = this.add.text(16, 16, "Start", {
      fontFamily: "Impact",
      fontSize: "32px",
      fill: "#FFF"
    });

    this.btnStart.setInteractive();

    this.btnStart.on(
      "pointerover",
      function() {
        this.btnStart.setText("Give me all the snickers... Now !"); // set the button texture to sprBtnPlayHover
      },
      this
    );

    this.btnStart.on("pointerout", function() {
      this.setText("Start");
    });

    this.btnStart.on(
      "pointerdown",
      function() {
        this.scene.start("GameScene1", {});
      },
      this
    );
  }
}
