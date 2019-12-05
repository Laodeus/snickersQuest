class Bic extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, vel, delay) {
    super(scene, x, y, "bic");
    this.scene = scene;
    // display player
    this.scene.sys.displayList.add(this);
    //??? this make potatoes
    this.scene.sys.updateList.add(this);
    //this activate the physics
    this.scene.sys.arcadePhysics.world.enableBody(this, 0);
    this.body.setAllowGravity(false);

    this.vel = vel;
    this.delay = delay;

    this.scene.physics.add.overlap(this, this.scene.player, this.touchPlayer);
    this.setVelocity(-vel, 0);
    this.setScale(0.6, 0.7);

    setTimeout(() => {
      this.destroy();
    }, this.delay);
  }
  touchPlayer(_, player) {
    player.loseHpBoss();
  }
}
