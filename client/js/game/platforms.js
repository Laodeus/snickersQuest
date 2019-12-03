class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.group = this.scene.physics.add.staticGroup(); 
    this.scene = scene;
  }

  createPlatforms(x, y, sprite, textureFrame) {
    const newObj = this.group.create(x, y, sprite, textureFrame);

    newObj.body.checkCollision.down = false;
    newObj.body.checkCollision.left = false;
    newObj.body.checkCollision.right = false;
    newObj.setOrigin(0).refreshBody();
    return newObj;
  }
}
