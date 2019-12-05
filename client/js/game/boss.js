class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      
      this.scene = scene;
      // display
      scene.sys.displayList.add(this);
      //??? this make potatoes
      scene.sys.updateList.add(this);
      //this activate the physics
      scene.sys.arcadePhysics.world.enableBody(this, 0);
  
      this.setBounce(0.2);
      this.setCollideWorldBounds(true);
      this.hp = 20;



      this.height = 420;
      this.width = 300;

    //   this.setSize(300,420);

    //   this.refreshBody();
      console.log();
  
  
      //some animations
      this.scene.anims.create({
        key: "LazyBoss",
        frames: scene.anims.generateFrameNumbers("Boss", {
          start: 1,
          end: 9
        }),
        frameRate: 5,
        repeat: -1,
        options: {
          scaleX: -1
        }
      });

      // launch animation.

      this.anims.play("LazyBoss")
    }

  
    // move() {
        
    // }
  
    // takeDmg(dmg) {
    //   this.hp -= dmg;
    //   if (this.hp <= 0) {
    //     this.destroy();
    //     this.bubble.destroy();
    //     this.textBubble.destroy();
    //     delete this.bubble;
    //     delete this.textBubble;
    //   }
    // }
  
    // bubbleShow() {
    //   let spaceX = 20;
    //   let spaceY = -60;
  
    //   this.bubble = this.scene.add
    //     .image(this.x + spaceX, this.y + spaceY, "emptyBubble")
    //     .setOrigin(0);
  
    //   this.textBubble = this.scene.add.text(
    //     this.x + spaceX,
    //     this.y + spaceY,
    //     this.texts[0],
    //     {
    //       fontFamily: '"Roboto Condensed"',
    //       color: "black"
    //     }
    //   );
    // }

    // bubbleUpdate() {
    //   this.bubble.x = this.x + 20;
    //   this.bubble.y = this.y - 60;
    //   this.textBubble.x = this.x + 20;
    //   this.textBubble.y = this.y - 60;
    // }
  
    // bubleChangeText() {
    //   if (this.textBubble && this.bubble) {
    //     let rng = Phaser.Math.Between(0, this.texts.length - 1);
    //     this.textBubble.text = this.texts[rng];
    //     setTimeout(() => {
    //       this.bubleChangeText();
    //     }, 1000);
    //   }
    // }
  }
  