class EnemyBasic extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.direction = "right";

    //some animations
    scene.anims.create({
      key: "leftEnemy1",
      frames: scene.anims.generateFrameNumbers("Julie001", {
        start: 4,
        end: 7
      }),
      frameRate: 5,
      repeat: -1,
      options: {
        scaleX: -1
      }
    });

    scene.anims.create({
      key: "rightEnemy1",
      frames: scene.anims.generateFrameNumbers("Julie001", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });
  }

  move() {
    if (this.body.touching.right) {
      this.direction = "left";
    } else if (this.body.touching.left) {
      this.direction = "right";
    }
    if (this.direction === "right") {
      this.setVelocityX(100);
      this.anims.play("rightEnemy1", true);
    } else if (this.direction === "left") {
      this.setVelocityX(-100);
      this.anims.play("leftEnemy1", true);
    }
  }
}
