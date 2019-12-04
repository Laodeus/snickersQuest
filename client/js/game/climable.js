class Climbable extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.group = this.scene.physics.add.staticGroup();
    this.scene = scene;
  }

  createElem(x, y, sprite, textureFrame) {
    const newObj = this.group.create(x, y, sprite, textureFrame);
    newObj.setOrigin(0).refreshBody();
    return newObj;
  }

  climb(obj, player, f, g) {}
  stopClimb(obj, player) {}

  onLadderModif(scene) {
    scene.player.setGravityY(0);
    scene.player.setVelocityY(-1);
    scene.player.onLadder = true;
  }
}
