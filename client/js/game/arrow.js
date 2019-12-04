class Arrow extends Trapp {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite, angle, vel);
    this.angle = angle;
    this.vel = vel;
  }
}
