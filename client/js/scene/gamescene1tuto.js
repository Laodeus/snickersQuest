class GameScene1 extends Phaser.Scene {
  constructor() {
    super("GameScene1");
    this.player = null;
    this.cursors;
    this.platforms;
  }

  preload() {
    this.load.spritesheet("dude", "assets/game/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.image("background", "assets/game/background/background-0001.png");
    this.load.image("ground", "assets/game/ground.png");
    this.load.image("desk", "assets/game/platform/table-0001.png");
  }

  create() {
    console.log("tuto scene");

    //setup a "palmier"
    this.add.image(0, 0, "background").setOrigin(0);
    this.add.image(800, 0, "background").setOrigin(0);

    //world for scrolling
    this.physics.world.setBounds(0, 0, 1600, 600);

    //duplicate ground
    this.platforms = this.physics.add.staticGroup({
      key: "ground",
      repeat: 42,
      setXY: { x: -350, y: 536, stepX: 64 }
    });

    this.player = new Player(this, 50, 50);

    // adding platformGroup
    this.platformUp = new platforms(this.world, this);
    // adding an object to the platform
    this.platformUp.create('desk');
    //camera stuff it's not in the player because the camera maybe change if the map is bigger
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    //colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.world);
  }

  update() {
    this.player.move();
  }
}
