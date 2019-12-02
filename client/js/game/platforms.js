class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.scene = scene;
    this.newObj = [];
  }

  createPlatforms(x, y, sprite, textureFrame) {
    const newObj = this.scene.add.image(x, y, sprite, textureFrame);

    // newObj.body.checkCollision.down = false;
    // newObj.body.checkCollision.left = false;
    // newObj.body.checkCollision.right = false;
    // newObj.setOrigin(0).refreshBody();
    return newObj;
  }
}
