class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.scene = scene;
    // display
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.hp = 20;

    this.texts = [
      "Ou en sont les workshop bordel!!",
      "Attention! BIIIIIIIIIIIIIIIIIIIIIIIIICS !",
      "Leny, je comprend pas ton API!!!!",
      "La pizza 4 fromage, Plus jamais... Ho, une pizza."
    ];

    //some animations
    this.scene.anims.create({
      key: "LazyBoss",
      frames: scene.anims.generateFrameNumbers("Boss", {
        start: 1,
        end: 10
      }),
      frameRate: 5,
      repeat: -1,
      options: {
        scaleX: -1
      }
    });

    this.scene.anims.create({
      key: "boobs-it",
      frames: scene.anims.generateFrameNumbers("Boss", {
        start: 11,
        end: 20
      }),
      frameRate: 5,
      repeat: 0,
      options: {
        scaleX: -1
      }
    });

    // boobs creation
    this.boobs = this.scene.add.image(this.x+10, this.y+40).setSize(80,40);
    this.boobs.texture === Phaser.Cache.DEFAULT; //-> true


    // launch animation.
    this.anims.play("LazyBoss");

    // lanche some things to do
    this.init();
    this.bubbleShow();
  }

  init() {
    const min = 2000;
    const max = 6000;
    const time = Math.floor(Math.random() * (max - min) + min);

    console.log(time);

    setTimeout(() => {
      this.boobSlap();
      this.init();
    }, time);
  }

  bubbleShow() {
    let spaceX = 20;
    let spaceY = -60;

    this.textBubble = this.scene.add.text(
      this.x + spaceX,
      this.y + spaceY,
      this.texts[0],
      {
        fontFamily: '"Roboto Condensed"',
        color: "black"
      }
    );
    setTimeout(() => {
      this.textTimeout = this.bubleChangeText();
    }, 5000);
  }

  bubleChangeText() {
    let rng = Phaser.Math.Between(0, this.texts.length - 1);
     this.textBubble.text = this.texts[rng];
     this.textTimeout = setTimeout(() => {
      this.bubleChangeText();
    }, 5000);
  }

  boobSlap() {
    this.anims.play("boobs-it");
    const thisAZnims = this.scene.anims.get("boobs-it");

    //textSet
    clearTimeout(this.textTimeout);
    this.textBubble.text = "BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOBS!!!!";
    this.textTimeout = setTimeout(() => {
      this.bubleChangeText();
    }, 1000);

    thisAZnims.on("complete", () => {
      this.anims.play("LazyBoss");
    });

    setTimeout(()=>{
      this.boobs.x = this.x-40;
      this.boobs.y = this.y+120;
      this.boobs.setSize(400,10);

      setTimeout(()=>{
        this.boobs.setSize(80,40);
        this.boobs.x = this.x+10;
        this.boobs.y = this.y+40;
      },500);
    },1100);

    // what you code here will trigger at boob slap.
  }
  takeDmg(dmg) {
    console.log(this.hp)
    this.hp -= dmg;
    if (this.hp <= 0) {
      clearTimeout(this.textBubble);
      this.boobs.destroy();
      this.textBubble.destroy();
      delete this.bubble;
      delete this.textBubble;
      this.scene.add.text(this.scene.player.x-100,this.scene.player.y-100,"You Win!!!")
      this.scene.cameras.main.fade(2000, 0, 0, 0, null, (event, state) => {
        if (state == 1) {
          this.scene.scene.start("MenuScene", { player: this.scene.player });
          this.scene.doorOverlapped = false;
        }
      });
    }
  }
}