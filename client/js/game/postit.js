class PostIt extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, vel, delay) {
    super(scene, x, y, "postit");
    this.scene = scene;
    // display player
    this.scene.sys.displayList.add(this);
    //??? this make potatoes
    this.scene.sys.updateList.add(this);
    //this activate the physics
    this.scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.vel = vel;
    this.delay = delay;

    this.scene.physics.add.overlap(this, this.scene.player, this.touchPlayer);
    this.setVelocityY(this.vel);

    setTimeout(() => {
      this.destroy();
    }, this.delay);
  }
  touchPlayer(_, player) {
    player.loseHpBoss();
  }
}
