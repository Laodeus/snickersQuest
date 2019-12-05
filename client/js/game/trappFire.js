class TrappFire extends Trapp {
  constructor(scene, x, y, angle, delay, power) {
    super(scene, x, y, "trappFire");
    //Remove this later
    this.rngId = Phaser.Math.Between(0, 100);
    // this.textBubble = this.scene.add.text(this.x, this.y, this.rngId, {
    //   fontFamily: '"Roboto Condensed"',
    //   color: "black"
    // });

    this.body.setAllowGravity(false);

    this.angle = angle;
    this.correctAngle();

    this.delay = delay;
    this.power = power;
    this.lastTrigger = 0;
    this.canTrigger = true;
    this.initAnimation();
  }
  correctAngle() {
    //replace hitbox + offset
    if (this.angle % 90 != 0) {
      this.angle = 0;
      console.warn("the angle of the fire trapp must be a multiple of 90");
    }
    if (this.angle === 0) {
      this.setSize(this.width / 1.9, this.width / 2).setOffset(23, 1);
    } else if (this.angle === -180) {
      this.setSize(this.width / 1.9, this.width / 2).setOffset(
        23,
        160 + this.width / 2
      );
    } else if (this.angle === 90) {
      this.setSize(this.width / 2.5, this.width / 1.9).setOffset(125, 100);
    } else if (this.angle === -90) {
      this.setSize(this.width / 2.5, this.width / 1.9).setOffset(-68, 100);
    }
  }

  initAnimation() {
    this.scene.anims.create({
      key: "startTrappFire",
      frames: this.scene.anims.generateFrameNumbers("trappFire", {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: 0
    });
    this.scene.anims.create({
      key: "shootTrappFire",
      frames: this.scene.anims.generateFrameNumbers("trappFire", {
        start: 16,
        end: 27
      }),
      frameRate: 10,
      repeat: 0
    });

    this.scene.anims.create({
      key: "ALLTrappFire",
      frames: this.scene.anims.generateFrameNumbers("trappFire", {
        start: 0,
        end: 28
      }),
      frameRate: 10,
      repeat: 0
    });
  }

  trigger() {
    if (Date.now() - this.lastTrigger > this.delay && this.canTrigger) {
      this.timeTrigger = Date.now();
      this.canTrigger = false;
      this.Openanim = this.scene.anims.get("ALLTrappFire"); // define a listener on the opendoor anims
      this.anims.play("ALLTrappFire");

      this.Openanim.on("complete", () => {
        if (
          this.anims &&
          Date.now() - this.timeTrigger >= this.Openanim.duration - 200
        ) {
          this.lastTrigger = Date.now();
          this.anims.play("startTrappFire");
          this.canTrigger = true;
        }
      });
    }
  }
}
