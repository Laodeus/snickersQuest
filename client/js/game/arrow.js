class Arrow extends Trapp {
  constructor(scene, x, y, sprite, angle, vel, power) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.angle = angle;
    this.vel = vel;
    this.power = power;
    this.body.setAllowGravity(false);
    if (angle === -90) this.setVelocity(-this.power, 0);
    else if (angle === 90) this.setVelocity(this.power, 0);
    else if (angle === 0) this.setVelocity(0, -this.power);
    this.scene.physics.add.overlap(this, this.scene.player, this.touchPlayer);
  }
  touchPlayer(_, player) {
    player.loseHp();
  }
}
