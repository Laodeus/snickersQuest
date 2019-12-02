class MovingPlatform extends Platforms {
    constructor(world, scene) {
        super(world, scene);
    }

    create(obj,x,y,movingFrom,movingTo){
        const newObj = this.platformsObjec.create(x, y, sprite,textureFrame);
        newObj.body.checkCollision.down = false;
        newObj.body.checkCollision.left = false;
        newObj.body.checkCollision.right = false;
        newObj.setOrigin(0).refreshBody();
        newObj.movingFrom = movingFrom;
        newObj.movingTo = newObj;
        return newObj;
      }
}