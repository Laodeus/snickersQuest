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
    this.load.image("ground", "assets/game/ground.png");
    this.load.image("box", "assets/game/platform/cardbox-0001.png");
  }

  create() {
    console.log("tuto scene");

    //setup the background
    this.add.image(0, 0, "background").setOrigin(0);
    this.add.image(800, 0, "background").setOrigin(0);

    //world for scrolling
    this.physics.world.setBounds(0, 0, 1600, 600);

    //duplicate ground
    this.platforms = this.physics.add.staticGroup({
      key: "ground",
      repeat: 42,
      setXY: { x: -350, y: 500, stepX: 64 }
    });

    this.platforms.create(400, 475, "box");
    this.platforms.create(50, 475, "box");

    this.player = new Player(this, 50, 50);

    //camera stuff it's not in the player because the camera maybe change if the map is bigger
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    //temp
    this.enemy = new EnemyBasic(this, 200, 200, "dude");

    //endtemp

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
