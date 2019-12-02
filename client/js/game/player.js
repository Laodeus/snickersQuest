class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "Leny");
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0);
    this.setCollideWorldBounds(true);

    //some animations
    scene.anims.create({
      key: "idleLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 0,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: "rightLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 9,
        end: 12
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "leftLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 13,
        end: 16
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpRightLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 9,
        end: 9
      }),
      frameRate: 3,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpLeftLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 16,
        end: 16
      }),
      frameRate: 3,
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
    if (this.body.touching.down) {
      if (this.keyQ.isDown) {
        this.setVelocityX(-500);
        this.anims.play("leftLeny", true);
      } else if (this.keyD.isDown) {
        this.setVelocityX(500);

        this.anims.play("rightLeny", true);
      } else if (this.keyS.isDown) {
        this.y += 4;
        this.anims.play("idleLeny", true);
      } else {
        this.setVelocityX(0);

        this.anims.play("idleLeny", true);
      }
      if (this.keyZ.isDown) {
        this.setVelocityY(-300);
      }
    } else {
      //TODO velocity decrease during the jump
      if (this.keyQ.isDown) {
        this.setVelocityX(-450);
        this.anims.play("jumpLeftLeny", true);
      } else if (this.keyD.isDown) {
        this.setVelocityX(450);
        this.anims.play("jumpRightLeny");
      } else {
        this.setVelocityX(0);
      }
    }
  }
}
