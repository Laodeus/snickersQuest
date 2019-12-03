class Gate extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture,frame,sceneToStart){
  super(scene, x, y, texture,frame);
    this.scene = scene;
    this.texture = texture;
    this.sceneToStart = sceneToStart;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);
    

    this.setOrigin(0);

    console.log(this)

  // only for the test
  scene.anims.create({
    key: "doorOpen",
    frames: scene.anims.generateFrameNumbers("Leny", {
      start: 9,
      end: 12
    }),
    frameRate: 10,
    repeat: 0, 
    
  });

  }

  passTheGate(door,player){
    this.Openanim = this.scene.anims.get("doorOpen");// define a listener on the opendoor anims

    door.anims.play('doorOpen', true);

    this.Openanim.on('complete', ()=>{
      this.scene.scene.start(this.sceneToStart)
    });
  }
}
