class GameScene1 extends Phaser.Scene {
  constructor() {
    super("GameScene1");
    this.player = null;
    this.cursors;
    this.platforms;
  }

  preload() {
    //will change soon
    this.load.spritesheet("dude", "assets/game/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("Leny", "assets/game/leny-sprite.png", {
      frameWidth: 76,
      frameHeight: 95
    });
    this.load.spritesheet("Julie001", "assets/game/julie001.png", {
      frameWidth: 86,
      frameHeight: 120
    });

    this.load.multiatlas(
      "spritesheet",
      "assets/game/spritesheet.json",
      "assets/game"
    );
  }

  create() {
    console.log("tuto scene");

    //setup the background
    this.add
      .image(0, 0, "spritesheet", "background/background-0001.png")
      .setOrigin(0);
    this.add
      .image(800, 0, "spritesheet", "background/background-0001.png")
      .setOrigin(0);

    //world for scrolling
    this.physics.world.setBounds(0, 0, 1600, 600);

    //duplicate ground
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(240, 552, "spritesheet", "platform/floor01.png");
    let ground = this.platforms
      .create(480 + 128, 504, "spritesheet", "platform/floor01.png")
      .setOrigin(0)
      .setScale(2.3, 1)
      .refreshBody();
    this.platforms.add(ground);

    // this.holes = this.physics.add.staticGroup();
    this.platforms.create(544, 576, "spritesheet", "platform/floor_hole.png");

    // adding platformGroup
    this.platformUp = new Platforms(this.world, this);

    // adding an object to the scene
    this.platforms
      .create(1200, 450, "spritesheet", "platform/table-0001.png")
      .setOrigin(0)
      .refreshBody();

    this.platformUp.createPlatforms(
      1275,
      400,
      "spritesheet",
      "deco/computer-0001.gif"
    );
    this.platforms.create(650, 472, "spritesheet", "platform/cardbox-0001.png");
    this.platforms.create(800, 472, "spritesheet", "platform/cardbox-0001.png");
    this.platforms.create(775, 408, "spritesheet", "platform/cardbox-0001.png");

    //camera stuff it's not in the player because the camera maybe change if the map is bigger

    this.player = new Player(this, 50, 460);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    //temp
    this.enemy = new EnemyBasic(this, 900, 300, "Julie001");

    //colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.world);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.player, this.platformUp);
  }

  update() {
    this.player.move();
    this.enemy.move();
  }
}
