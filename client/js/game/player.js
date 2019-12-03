class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, colon = false) {
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

    //somes variables
    this.jumpVel = 200; //jump Velocity
    this.direction = "right"; //direction of the player
    this.colon = colon; //does he have the colon ?

    this.unbreakablesAnims = ["attackColonLeft", "attackColonRight"];

    //some animations
    scene.anims.create({
      key: "idleLenyRight",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: "idleLenyLeft",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 27,
        end: 30
      }),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: "rightLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 14,
        end: 17
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "leftLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 18,
        end: 21
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpRightLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 14,
        end: 14
      }),
      frameRate: 3,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpLeftLeny",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 18,
        end: 18
      }),
      frameRate: 3,
      repeat: -1
    });

    scene.anims.create({
      key: "attackColonRight",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 9,
        end: 13
      }),
      frameRate: 10
    });

    scene.anims.create({
      key: "attackColonLeft",
      frames: scene.anims.generateFrameNumbers("Leny", {
        start: 22,
        end: 26
      }),
      frameRate: 10
    });

    // define the key player key
    this.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.cursors = scene.input.keyboard.createCursorKeys();

    this.anims.play("idleLenyRight", true);
  }

  move() {
    //at the end of the unbreakabke animations, just start a idle animation + launch the attack
    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      if (this.unbreakablesAnims.includes(this.anims.currentAnim.key))
        if (
          ["attackColonLeft", "attackColonRight"].includes(
            this.anims.currentAnim.key
          )
        ) {
          console.log("start attack");
        }
      if (this.direction === "left") {
        this.anims.play("idleLenyLeft", true);
      } else if (this.direction === "right") {
        this.anims.play("idleLenyRight", true);
      }
    });
    //move to left || right is the body is touching the ground
    if (
      this.body.touching.down &&
      !this.keySpace.isDown &&
      !this.unbreakablesAnims.includes(this.anims.currentAnim.key)
    ) {
      if (this.keyQ.isDown) {
        this.setVelocityX(-500);
        this.anims.play("leftLeny", true);
      } else if (this.keyD.isDown) {
        this.setVelocityX(500);
        this.anims.play("rightLeny", true);
      }
      if (this.keyZ.isDown) {
        this.setVelocityY(-300);
        this.jumpVel = 450;
      }
    }
    //move to left || right during the jump with a decrease of the velocity
    else if (
      !this.keySpace.isDown &&
      !this.unbreakablesAnims.includes(this.anims.currentAnim.key)
    ) {
      if (this.keyQ.isDown) {
        this.setVelocityX(-this.jumpVel);
        this.anims.play("jumpLeftLeny", true);
      } else if (this.keyD.isDown) {
        this.setVelocityX(this.jumpVel);
        this.anims.play("jumpRightLeny");
      }
      if (this.jumpVel - 5 >= 0) {
        this.jumpVel -= 3;
      }
    }

    //do the attack animation and stop the player
    if (
      this.keySpace.isDown &&
      !this.unbreakablesAnims.includes(this.anims.currentAnim.key)
    ) {
      this.setVelocityX(0);
      //attack item (boolean) + key to use the attack
      if (this.colon && this.keySpace.isDown) {
        if (this.direction === "left") {
          this.anims.play("attackColonLeft", true);
        } else {
          this.anims.play("attackColonRight", true);
        }
      }
      //put other attack here with the same pattern but don't forget to add the animation
      /*
        if(this.ITEM && this.keyNEEDED.isDown){
          if (this.direction === "left") {
            this.anims.play("attackITEMLeft", true);
          } else {
            this.anims.play("attackITEMRight", true);
          }
        }
       */
      else {
        if (this.direction === "left") {
          this.anims.play("idleLenyLeft", true);
        } else if (this.direction === "right") {
          this.anims.play("idleLenyRight", true);
        }
      }
    }

    //change the direction of the player (this direction is using for the attack)
    if (this.keyD.isDown) {
      this.direction = "right";
    } else if (this.keyQ.isDown) {
      this.direction = "left";
    }

    //play idle and stop the player when any key isn't isDown
    if (
      !this.keyQ.isDown &&
      !this.keyD.isDown &&
      !this.keySpace.isDown &&
      !this.unbreakablesAnims.includes(this.anims.currentAnim.key)
    ) {
      this.setVelocityX(0);
      if (this.direction === "left") {
        this.anims.play("idleLenyLeft", true);
      } else if (this.direction === "right") {
        this.anims.play("idleLenyRight", true);
      }
    }
  }
}
