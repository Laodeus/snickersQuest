class Arrow extends Trapp {
  constructor(scene, x, y, sprite, angle, vel, power, delay) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.angle = angle;
    this.vel = vel;
    this.power = power;
    this.delay = delay;
    this.body.setAllowGravity(false);
    if (angle === -90) this.setVelocity(-this.power, 0);
    else if (angle === 90) this.setVelocity(this.power, 0);
    else if (angle === 0) this.setVelocity(0, -this.power);
    this.scene.physics.add.overlap(this, this.scene.player, this.touchPlayer);
    this.scene.physics.add.collider(this, this.scene.platforms);
    this.setSize(this.whidth, this.height * 0.3);
    setTimeout(() => {
      this.destroy();
    }, this.delay);
  }
  touchPlayer(_, player) {
    player.loseHp();
  }
}
