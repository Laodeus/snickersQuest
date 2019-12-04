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

    this.load.image(
      "wall-tileBottom",
      "assets/game/scene2/wall-tileBottom.png"
    );
    this.load.image("wall-tile", "assets/game/scene2/wall-tile.png");
    this.load.image("wall-tileTop", "assets/game/scene2/wall-tileTop.png");

    this.load.image("arrowB", "assets/game/scene2/arrowB.png");
    this.load.image(
      "trap-arrow.bottom",
      "assets/game/scene2/trap-arrow.bottom.png"
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
    this.platforms = this.physics.add.staticGroup();
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

    //creating first ground
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Right-Border");

    // creating wal realtive to this ground
    const firstWallX = (i + 1) * 64 - 32;
    const firstWallStarty = 1200 - 64 - 32;
    this.platforms
      .create(firstWallX, firstWallStarty, "wall-tileBottom")
      .setOrigin(0)
      .refreshBody();
    i = 0;
    this.platformUp.createPlatforms(i * 64, 1136, "ground-tile-Left-Border");
    for (; i < 23; i++) {
      this.platforms
        .create(firstWallX, firstWallStarty - i * 32, "wall-tile")
        .setOrigin(0)
        .refreshBody();
    }
    this.platforms
      .create(firstWallX, firstWallStarty - i * 32, "wall-tileTop")
      .setOrigin(0)
      .refreshBody();

    //first juming party
    this.platformUp.createPlatforms(450, 1050, "ground-tile");

    this.platformUp.createPlatforms(606, 970, "ground-tile");
    this.platformUp.createPlatforms(670, 970, "ground-tile");
    this.platformUp.createPlatforms(734, 970, "ground-tile");

    this.platformUp.createPlatforms(500, 880, "ground-tile");
    this.platformUp.createPlatforms(436, 880, "ground-tile");
    this.platformUp.createPlatforms(372, 880, "ground-tile");
    this.platformUp.createPlatforms(308, 880, "ground-tile");

    this.platformUp
      .createPlatforms(200, 800, "ground-tile")
      .setScale(0.5, 0.5)
      .refreshBody();

    this.platformUp.createPlatforms(50, 720, "ground-tile");

    this.platformUp.createPlatforms(110, 660, "ground-tile"); // this will be replaced by a trap

    this.platformUp.createPlatforms(436, 580, "ground-tile");
    this.platformUp.createPlatforms(500, 580, "ground-tile");
    this.platformUp.createPlatforms(564, 580, "ground-tile");

    this.platformUp.createPlatforms(436, 420, "ground-tile");
    this.platformUp.createPlatforms(500, 420, "ground-tile");
    this.platformUp.createPlatforms(564, 420, "ground-tile");

    //lader replacement or see if we dont do a system like that

    this.platformUp.createPlatforms(500, 548, "wall-tile");
    this.platformUp.createPlatforms(500, 516, "wall-tile");
    this.platformUp.createPlatforms(500, 484, "wall-tile");
    this.platformUp.createPlatforms(500, 452, "wall-tile");
    this.platformUp.createPlatforms(500, 420, "wall-tile");

    this.platformUp.createPlatforms(764, 304, "ground-tile");
    this.platformUp.createPlatforms(700, 304, "ground-tile");
    this.platformUp.createPlatforms(636, 304, "ground-tile");
    this.trapps;

    // the player and set it's property
    this.player = new Player(this, 50, 1080);
    if (data.player) {
      console.log(data.player.colon);
      this.player.colon = data.player.colon;
      // if we have a player in the data, we can set the property of this player at this one's. and i know my english is poor phil, no need to say it :p
    } else {
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
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.platformUp.group);
    this.physics.add.collider(
      this.player,
      this.movingPlatform.group,
      this.movingPlatform.movingObjectWhitPlatform
    );

    // enemies colider
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(
      this.enemies,
      this.movingPlatform.group,
      this.movingPlatform.movingObjectWhitPlatform
    );
    this.physics.add.collider(this.enemies, this.platformUp.group);
  }

  update() {
    this.player.move();
    this.enemies.children.iterate(enemy => {
      enemy.move();
    });
    this.movingPlatform.move();
  }
}
