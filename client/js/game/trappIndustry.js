class TrappIndustry {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;

    this.group = this.scene.physics.add.staticGroup();
  }
  move() {}
}
