class TrappArrow extends Trapp {
  constructor(scene, x, y, angle, delay, power) {
    super(scene, x, y, "trap-arrow.bottom");
    this.body.setAllowGravity(false);
    this.angle = angle;
    this.delay = delay;
    this.power = power;
    this.arrows = [];
    this.lastTrigger = 0;
    this.lastRemove = 0;
  }

  trigger() {
    if (Date.now() - this.lastTrigger >= this.delay) {
      this.arrows.push(
        new Arrow(
          this.scene,
          this.x,
          this.y,
          "arrowB",
          this.angle,
          200,
          this.power,
          this.delay
        )
      );

      this.lastTrigger = Date.now();
    }
    //delete de l'arrow
    if (Date.now() - this.lastRemove >= this.delay) {
      this.arrows = this.arrows.slice(0, 1);
      this.lastRemove = Date.now();
    }
  }
}
