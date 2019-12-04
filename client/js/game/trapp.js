class Trapp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    // display player
    this.scene.sys.displayList.add(this);
    //??? this make potatoes
    this.scene.sys.updateList.add(this);
    //this activate the physics
    this.scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0);
    this.setCollideWorldBounds(true);

    this.firstX = x;
    this.firstY = y;
  }
  move() {}

  trigger() {}

  reset() {
    //fluid movement ?
    this.x = this.firstX;
    this.y = this.firstY;
  }
}
