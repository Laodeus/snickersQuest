class Colon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, vel) {
    super(scene, x, y, "colon");
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    //some animations
    scene.anims.create({
      key: "basic",
      frames: scene.anims.generateFrameNumbers("colon", {
        start: 0,
        end: 0
      }),
      frameRate: 4,
      repeat: -1
    });
    this.setVelocityX(vel);
    this.setVelocityY(-75);

    this.scene.physics.add.collider(this, scene.platforms);
    this.scene.physics.add.overlap(
      this,
      scene.enemies,
      this.hitEnemy,
      null,
      this
    );
    setTimeout(() => {
      this.destroy();
    }, 1000);
  }

  hitEnemy(_, enemy) {
    console.log("hit");
    // enemy.destroy();
  }
}
