class TrappArrow extends Trapp {
  constructor(scene, x, y, sprite, angle) {
    super(scene, x, y, sprite);
    this.angle = angle;
    this.shoot();
    this.arrows = [];
  }

  shoot() {
    this.arrows.push(new Arrow(this.scene, this.x, this.y, "arrowB"));
  }
}
