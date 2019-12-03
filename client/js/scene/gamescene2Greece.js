class GameScene2 extends Phaser.Scene {
  constructor() {
    super("GameScene2");
    this.player = null;
  }

  preload() {
      this.load.spritesheet("Leny", "assets/game/leny-sprite.png", {
        frameWidth: 91,
        frameHeight: 95
      });
      this.load.spritesheet("Julie001", "assets/game/julie001.png", {
        frameWidth: 86,
        frameHeight: 120
      });
      this.load.spritesheet("colon_idle", "assets/game/colon_idle.png", {
        frameWidth: 24,
        frameHeight: 41
      });
  
      this.load.spritesheet("colon", "assets/game/colon.png", {
        frameWidth: 35,
        frameHeight: 33
      });
  
      this.load.spritesheet("door", "assets/game/door.png", {
        frameWidth: 96,
        frameHeight: 160
      });
      this.load.image('ground-tile-Left-Border', 'assets/game/scene2/ground-tile-Left-Border.png');
      this.load.image('ground-tile', 'assets/game/scene2/ground-tile.png');
      this.load.image('ground-tile-Right-Border', 'assets/game/scene2/ground-tile-Right-Border.png');
  }

  create(data) {
    
    this.physics.world.setBounds(0, 0, 3200, 1200)
    
    // create plain platform
    this.platforms = this.physics.add.staticGroup();
    // addding platform to the world

    this.platforms.create(0, 536, "ground-tile-Left-Border").setOrigin(0).refreshBody();
    this.platforms.create(64, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(128, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(192, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(256, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(320, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(384, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(448, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(512, 536, "ground-tile").setOrigin(0).refreshBody();
    this.platforms.create(576, 536, "ground-tile").setOrigin(0).refreshBody();
    

    

      if(!data.player){
        
      }else{
        this.player = data.player.scene
        this.player.x = 50;
        this.player.y = 50;
      }

    

  }

  update() {
  }
}
