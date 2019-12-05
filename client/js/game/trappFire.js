class TrappFire extends Trapp {
  constructor(scene, x, y, angle, delay, power) {
    super(scene, x, y, "trappFire");
    this.body.setAllowGravity(false);
    this.angle = angle;
    this.delay = delay;
    this.power = power;
    this.lastTrigger = 0;
    this.canTrigger = true;
    this.debug = true;
    this.initAnimation();
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
      this.canTrigger = false;
      this.Openanim = this.scene.anims.get("ALLTrappFire"); // define a listener on the opendoor anims
      this.anims.play("ALLTrappFire");

      this.Openanim.on("complete", () => {
        this.anims.play("startTrappFire");
        this.lastTrigger = Date.now();
        this.canTrigger = true;
        this.debug = false;
      });
    }
  }
}
