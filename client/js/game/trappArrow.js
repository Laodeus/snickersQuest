class TrappArrow extends Trapp {
  constructor(scene, x, y, angle, delay, power) {
    super(scene, x, y, "trap-arrow.bottom");
    this.angle = angle;
    this.delay = delay;
    this.power = power;
    this.arrows = [];
    this.shoot();
  }

  shoot() {
    this.arrows.push(
      new Arrow(
        this.scene,
        this.x,
        this.y,
        "arrowB",
        this.angle,
        200,
        this.power
      )
    );
    setTimeout(() => {
      this.shoot();
    }, this.delay);
  }
}
