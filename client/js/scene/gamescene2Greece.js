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
    this.load.image(
      "ground-tile-Left-Border",
      "assets/game/scene2/ground-tile-Left-Border.png"
    );
    this.load.image("ground-tile", "assets/game/scene2/ground-tile.png");
    this.load.image(
      "ground-tile-Right-Border",
      "assets/game/scene2/ground-tile-Right-Border.png"
    );
    this.load.multiatlas(
      "spritesheet",
      "assets/game/spritesheet.json",
      "assets/game"
    );
  }

  create(data) {
    // seting size of scene
    this.physics.world.setBounds(0, 0, 3200, 1200);

    // generating group object
    this.platformUp = new Platforms(this.world, this);
    this.movingPlatform = new MovingPlatform(this.world, this);
    this.enemies = this.physics.add.group();

    //generating the first ground ground

    // adding object to the world
    let i = 0;
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Left-Border");
    for (; i < 12; i++) {
      this.platformUp.createPlatforms(i * 64, 1136, "ground-tile");
    }
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Right-Border");

    // the player and set it's property
    this.player = new Player(this, 50, 1080);
    if (data.player) {
      console.log(data.player.colon);
      this.player.colon = data.player.colon;
      // if we have a player in the data, we can set the property of this player at this one's. and i know my english is poor phil, no need to say it :p
    }
    else{
      this.player.colon = true; // for debug
    }
    
    //Here, i will play with the camera stuff ^^
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    // setting the colider

    // player colider
    this.physics.add.collider(this.player, this.platformUp.group);
    this.physics.add.collider(this.player,this.movingPlatform.group,this.movingPlatform.movingObjectWhitPlatform);

    // enemies colider
    this.physics.add.collider(
      this.enemies,
      this.movingPlatform.group,
      this.movingPlatform.movingObjectWhitPlatform
    );
    this.physics.add.collider(
      this.enemies,
      this.platformUp.group,
    );
  }

  update() {
    this.player.move();
    //this.enemies.move();
    this.movingPlatform.move();
  }
}
