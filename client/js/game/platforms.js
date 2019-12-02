class platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.scene = scene;
    this.platformsObjec = this.scene.physics.add.staticGroup(); 
    
    this.scene.physics.add.collider(this.platformsObjec,this.scene.player)
    this.newObj = [];
  }
  create(obj){
    this.newObj[this.newObj.length] = this.platformsObjec.create(50, 350, obj);
    this.newObj[this.newObj.length-1].body.checkCollision.down = false;
    this.newObj[this.newObj.length-1].body.checkCollision.left = false;
    this.newObj[this.newObj.length-1].body.checkCollision.right = false;
    
  }
}
