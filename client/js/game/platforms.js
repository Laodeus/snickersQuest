class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.scene = scene;
    this.platformsObjec = this.scene.physics.add.staticGroup(); 
    
    this.scene.physics.add.collider(this.platformsObjec,this.scene.player)
    this.newObj = [];
  }
  create(x,y,sprite,textureFrame){
    const newObj = this.platformsObjec.create(x, y, sprite,textureFrame);
    newObj.body.checkCollision.down = false;
    newObj.body.checkCollision.left = false;
    newObj.body.checkCollision.right = false;
    newObj.setOrigin(0).refreshBody();
    return newObj;
  }
}
