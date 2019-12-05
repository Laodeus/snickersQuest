class Gate extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, sceneToStart) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.texture = texture;
    this.sceneToStart = sceneToStart;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setOrigin(0);

    // only for the test

    scene.anims.create({
      key: "doorOpen",
      frames: scene.anims.generateFrameNumbers("door", {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: 0
    });
  }

  passTheGate(door, player) {
    this.Openanim = this.scene.anims.get("doorOpen"); // define a listener on the opendoor anims
    door.anims.play("doorOpen", true);

    this.Openanim.on("complete", () => {
      console.log(this)
      this.scene.cameras.main.fade(2000, 0, 0, 0, null, (event, state) => {
        if (state == 1) {
          this.scene.scene.start("GameScene2", { player: this.scene.player });
          this.scene.doorOverlapped = false;
        }
      });
    });
  }
}
