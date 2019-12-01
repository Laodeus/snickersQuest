class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "dude");
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    //some animations
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    // define the key player key
    this.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  move() {
    if (this.keyQ.isDown) {
      this.setVelocityX(-500);
      this.anims.play("left", true);
    } else if (this.keyD.isDown) {
      this.setVelocityX(500);

      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);

      this.anims.play("turn");
    }
    if (this.keyZ.isDown && this.body.touching.down) {
      this.setVelocityY(-400);
    }
  }
}
