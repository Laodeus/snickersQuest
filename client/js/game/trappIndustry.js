class TrappIndustry {
  constructor(scene) {
    this.scene = scene;
    this.group = this.scene.physics.add.staticGroup();
  }

  createTrap(type, x, y, angle, delay, power) {
    if (type.toLowerCase() === "arrow") {
      this.group.add(new TrappArrow(this.scene, x, y, angle, delay, power));
    }
  }

  move() {
    this.group.children.iterate(child => {
      trap.trigger();
    });
  }
}
