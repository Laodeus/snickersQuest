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

    this.load.image("pillarLeft", "assets/game/scene2/ground-up-tile-Left.png");
    this.load.image("pillar", "assets/game/scene2/ground-up-tile.png");
    this.load.image(
      "pillarRight",
      "assets/game/scene2/ground-up-tile-Right.png"
    );

    this.load.image("ladder", "assets/game/scene2/ladder.png");

    this.load.image(
      "movingPillar",
      "assets/game/scene2/moving_platform_lvl01.png"
    );

    this.load.image("groundSmall", "assets/game/scene2/groundSmall.png");

    this.load.multiatlas(
      "spritesheet",
      "assets/game/spritesheet.json",
      "assets/game"
    );
  }

  create(data) {
    // seting size of scene
    this.cameras.main.setBackgroundColor("#5aa3dc");
    this.physics.world.setBounds(0, 0, 3200, 1200);
    this.coord = this.add.text(50, 50, "ok");

    // generating group object
    this.platforms = this.physics.add.staticGroup();
    this.platformUp = new Platforms(this.world, this);
    this.movingPlatform = new MovingPlatform(this.world, this);
    this.trapps = new TrappIndustry(this);
    this.enemies = this.physics.add.group();
    this.ladder = new Climbable(this.world, this);

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
    for (; i < 20; i++) {
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
    this.platformUp.createPlatforms(500, 1050, "ground-tile");

    this.platformUp.createPlatforms(606, 970, "pillarLeft");
    this.platformUp.createPlatforms(670, 970, "pillar");
    this.platformUp.createPlatforms(734, 970, "pillarRight");

    this.platformUp.createPlatforms(500, 880, "pillarRight");
    this.platformUp.createPlatforms(436, 880, "pillar");
    this.platformUp.createPlatforms(372, 880, "pillar");
    this.platformUp.createPlatforms(308, 880, "pillarLeft");

    this.platformUp
      .createPlatforms(200, 800, "ground-tile")
      .setScale(0.5, 0.5)
      .refreshBody();

    this.platformUp.createPlatforms(0, 720, "ground-tile");

    this.movingPlatform.createElem(
      120,
      660,
      "movingPillar",
      "platform/cardbox-0002.png",
      { x: 10, y: 0 }, // from where
      { x: 150, y: 0 }, // to where
      { x: 1, y: 0 }, // moving speed
      { x: 1, y: 0 } // if set to 0, dont move , -1 start to move to right, 1 startt to move to left
    );

    this.platformUp.createPlatforms(436, 648, "pillarLeft");
    this.platformUp.createPlatforms(500, 648, "pillar");
    this.platformUp.createPlatforms(564, 648, "pillarRight");

    this.platformUp.createPlatforms(564, 484, "pillarRight");
    this.platformUp.createPlatforms(500, 484, "pillar");
    this.platformUp.createPlatforms(436, 484, "pillar");
    this.platformUp.createPlatforms(372, 484, "pillar");
    this.platformUp.createPlatforms(308, 484, "pillar");
    this.platformUp.createPlatforms(244, 484, "pillar");
    this.platformUp.createPlatforms(180, 484, "pillar");
    this.platformUp.createPlatforms(116, 484, "pillarLeft");

    //lader replacement or see if we dont do a system like that
    this.ladder1 = this.ladder
      .createElem(500, 455, "ladder")
      .setScale(0.8, 0.8)
      .refreshBody();
    this.ladder1.setSize(this.ladder1.width / 5, this.ladder1.height, true);

    this.platformUp.createPlatforms(636, 400, "pillarLeft");
    this.platformUp.createPlatforms(700, 400, "pillar");
    this.platformUp.createPlatforms(764, 400, "pillarRight");

    this.platformUp.createPlatforms(200, 400, "groundSmall");

    this.platformUp.createPlatforms(100, 350, "groundSmall");

    this.platformUp.createPlatforms(0, 300, "groundSmall");

    this.platformUp.createPlatforms(100, 250, "groundSmall");

    this.platformUp.createPlatforms(200, 200, "groundSmall");

    this.platformUp
      .createPlatforms(0, 150, "groundSmall")
      .setScale(2, 1)
      .refreshBody();
    //trapp generation
    this.trapps.createTrap("Arrow", 780, 953, -90, 2500, 900);

    //enemies generation
    this.enemies.add(
      new EnemyBasic(this, 337, 418, "Julie001", null, 174, 560)
    );

    // the player and set it's property
    let hp = 5;
    if (data.player) {
      hp = data.player.hp;
    }
    this.player = new Player(this, 94, 1088, true, hp);

    //Here, i will play with the camera stuff ^^
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    // setting the colider and overlap

    // player colider
    this.containCollidePlayer = [];
    this.containCollidePlayer[0] = this.physics.add.collider(
      this.player,
      this.platforms
    );
    this.containCollidePlayer[1] = this.physics.add.collider(
      this.player,
      this.platformUp.group
    );
    this.containCollidePlayer[2] = this.physics.add.collider(
      this.player,
      this.movingPlatform.group,
      this.movingPlatform.movingObjectWhitPlatform
    );
    this.containCollidePlayer[3] = this.physics.add.overlap(
      this.player,
      this.ladder.group,
      () => {
        this.ladder.onLadderModif(this);
      }
    );

    // enemies colider
    this.physics.add.collider(this.enemies, this.platformsd);
    this.physics.add.collider(
      this.enemies,
      this.movingPlatform.group,
      this.movingPlatform.movingObjectWhitPlatform
    );
    this.physics.add.collider(this.enemies, this.platformUp.group);

    //trap collider
    this.physics.add.collider(this.trapps.group, this.platforms);
    this.physics.add.collider(this.trapps.group, this.platformUp.group);
  }
  update() {
    this.player.move();
    this.enemies.children.iterate(enemy => {
      enemy.move();
    });
    this.movingPlatform.move();

    this.coord.setText(`x:${this.player.x / 1}, y:${this.player.y / 1}`);
    this.coord.x = this.player.x - 50;
    this.coord.y = this.player.y - 100;
  }
}
