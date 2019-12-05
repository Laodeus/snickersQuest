class Colon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, vel, dmg) {
    super(scene, x, y, "colon");
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0.3);
    this.setCollideWorldBounds(true);

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

    //collider with platforms
    this.collider = this.scene.physics.add.collider(this, this.scene.platforms);
    this.collider = this.scene.physics.add.collider(
      this,
      this.scene.movingPlatform.group,
      this.scene.movingPlatform.movingObjectWhitPlatform
    );
    this.collider = this.scene.physics.add.collider(
      this,
      this.scene.platformUp.group
    );

    //overlap for enemies
    this.scene.physics.add.overlap(
      this,
      this.scene.enemies,
      this.hitEnemy,
      null,
      this
    );
    //active overlap with the player with a little delay
    setTimeout(() => {
      this.scene.physics.add.overlap(
        this,
        this.scene.player,
        this.comeBack,
        null,
        this
      );
    }, 100);

    setTimeout(() => {
      if (this.scene) {
        this.comeBack();
      }
    }, 5000);

    this.dmg = dmg;
  }

  hitEnemy(_, enemy) {
    enemy.takeDmg(this.dmg);
  }

  comeBack() {
    //comeback
    if (this.scene) {
      this.scene.player.colon = true;
    }
    this.destroy();
  }
}
