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

    //generating the first ground ground

    // adding object to the world
    let i = 0;
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Left-Border");
    for (; i < 12; i++) {
      this.platformUp.createPlatforms(i * 64, 1136, "ground-tile");
    }
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Right-Border");

    this.gate = new Gate(
      this,
      500,
      975,
      "spritesheet",
      "deco/door-0001.png",
      "GameScene2"
    );
    this.add.sprite(545, 950, "spritesheet", "deco/exitpannel.png");
    
    // the player and set it's property
    this.player = new Player(this, 50, 1080, false);
    if (data.player) {
      // if we have a player in the data, we can set the property of this player at this one's. and i know my english is poor phil, no need to say it :p
    
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

    //enemies colider
    // this.physics.add.collider(
    //   this.enemies,
    //   this.movingPlatform.group,
    //   this.movingPlatform.movingObjectWhitPlatform
    // );
    // this.physics.add.collider(
    //   this.enemies,
    //   this.platformUp.group,
    // );
    
    //door colider
    this.physics.add.collider(this.gate, this.movingPlatform.group);
    this.physics.add.collider(this.gate, this.platformUp.group);
    this.physics.add.overlap(this.gate, this.player, (door, player) => {
      if (!this.doorOverlapped) {
        this.gate.passTheGate(door, player);
      }
      this.doorOverlapped = true;
    });
  }

  update() {
    this.player.move();
    //this.enemies.move();
    this.movingPlatform.move();
  }
}
