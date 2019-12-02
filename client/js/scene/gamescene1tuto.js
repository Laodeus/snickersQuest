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

    this.load.image("background", "assets/game/background/background-0001.png");
    this.load.image("floor01", "assets/game/platform/floor01.png");
    this.load.image("floor_hole", "assets/game/platform/floor_hole.png");
    this.load.image("box", "assets/game/platform/cardbox-0001.png");
    this.load.image("desk", "assets/game/platform/table-0001.png");
    this.load.image("computer", "assets/game/deco/computer-0001.gif");
  }

  create() {
    console.log("tuto scene");

    //setup the background
    this.add.image(0, 0, "background").setOrigin(0);
    this.add.image(800, 0, "background").setOrigin(0);

    //world for scrolling
    this.physics.world.setBounds(0, 0, 1600, 600);

    //duplicate ground
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(240, 552, "floor01");
    let ground = this.platforms.create(480 + 128, 504, "floor01").setOrigin(0).setScale(2.3,1).refreshBody();
    this.platforms.add(ground);

    // this.holes = this.physics.add.staticGroup();
    this.platforms.create(544, 576, "floor_hole");

    this.player = new Player(this, 50, 460);

    // adding platformGroup
    this.platformUp = new platforms(this.world, this);
    
    // adding an object to the scene
    this.platforms.create(1200,450,'desk').setOrigin(0).refreshBody();
    this.platformUp.create('computer',1275,400).setScale(1.7,1.7).refreshBody();
    this.platforms.create(650, 472, "box");
    this.platforms.create(800, 472, "box");
    this.platforms.create(775, 408, "box");


    //camera stuff it's not in the player because the camera maybe change if the map is bigger
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    //temp
    this.enemy = new EnemyBasic(this, 1100, 478, "dude");

    //colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.world);
    this.physics.add.collider(this.enemy, this.platforms);
  }

  update() {
    this.player.move();
    this.enemy.move();
  }
}
