class MovingPlatform extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene) {
      super(world, scene);
      this.group = this.scene.physics.add.staticGroup(); 
      this.scene = scene;
    }

    createElem(x,y,sprite,textureFrame,movingFrom,movingTo,speed,direction){
        const newObj = this.group.create(x, y, sprite,textureFrame);
        newObj.body.checkCollision.down = false;
        newObj.body.checkCollision.left = false;
        newObj.body.checkCollision.right = false;
        newObj.setOrigin(0).refreshBody();
        newObj.origin = {x:x,y:y};
        newObj.movingFrom = movingFrom;
        newObj.movingTo = movingTo;
        newObj.speed = speed;
        newObj.direction = direction;

        return newObj;
      }

      move(){
          this.group.children.iterate((child)=>{
                if(child.direction.x < 0){
                    if(child.x >= child.origin.x - child.movingFrom.x){
                        child.x -= child.speed.x
                    }
                    else{
                        child.direction.x = 1;
                    }
                }
                else if(child.direction.x > 0){
                    if(child.x <= child.origin.x + child.movingFrom.x){
                        child.x += child.speed.x
                    }
                    else{
                        child.direction.x = -1;
                    }
                }
                else{
                    
                }

                if(child.direction.y < 0){
                    if(child.y >= child.origin.y - child.movingFrom.y){
                        child.y -= child.speed.y
                    }
                    else{
                        child.direction.y = 1;
                    }
                }
                else if(child.direction.y > 0){
                    if(child.y <= child.origin.y + child.movingFrom.y){
                        child.y += child.speed.y
                    }
                    else{
                        child.direction.y = -1;
                    }
                }
                else{
                    
                }
                child.setOrigin(0).refreshBody();

          })
      }

      movingObjectWhitPlatform(obj,platform){

          if(platform.direction.x < 0){
            obj.x -= platform.speed.x
          }
          else if(platform.direction.x > 0){
            obj.x += platform.speed.x
          }
          if(platform.direction.y < 0){
            obj.y -= platform.speed.y
          }
          else if(platform.direction.y > 0){
            obj.y += platform.speed.y
          }
      }

      


}