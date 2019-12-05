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
    this.lastTextChange = Date.now();

    this.animationInit();
    this.onAnime = this.scene.anims.get("boobs-it", true);

    // boobs creation
    this.boobs = this.scene.add.image(this.x + 10, this.y + 40).setSize(80, 40);
    this.boobs.texture === Phaser.Cache.DEFAULT; //-> true

    //battle variable
    this.initedBattle = false;
    this.startInitBattle = 0;

    this.lastAttack = 0;
    this.succedAttack = 0;
    this.maxSuccedAttack = 4;
    this.attack = false;

    this.postits = [];

    // launch animation.
    this.anims.play("LazyBoss");
  }
  animationInit() {
    //some animations
    this.scene.anims.create({
      key: "LazyBoss",
      frames: this.scene.anims.generateFrameNumbers("Boss", {
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
      frames: this.scene.anims.generateFrameNumbers("Boss", {
        start: 11,
        end: 18
      }),
      frameRate: 5,
      repeat: 0,
      options: {
        scaleX: -1
      }
    });
  }

  initBattle() {
    if (this.startInitBattle === 0) {
      this.startInitBattle = Date.now();
      this.scene.cameras.main.setZoom(0.9);
      this.bubbleShow();
      //Afficher les hp du boss
    } else if (Date.now() - this.startInitBattle > 3000) {
      this.initedBattle = true;
    }
  }

  fight() {
    //si player assez proche => lance bic ou postite
    if (
      Date.now() - this.lastAttack >= this.onAnime.duration &&
      this.succedAttack < this.maxSuccedAttack
    ) {
      this.anims.play("boobs-it");
      this.attack = false;
      this.bubleChangeText();

      this.onAnime.on("complete", () => {
        if (!this.attack) {
          let rng = Phaser.Math.Between(1, 2);
          if (rng === 1) {
            this.throwPostIt(this.succedAttack);
          } else if (rng === 2) {
            this.throwBic(this.succedAttack);
          }
        }
      });

      this.lastAttack = Date.now();
      this.succedAttack++;
    }
    if (
      this.succedAttack >= 4 &&
      Date.now() - this.lastAttack > this.onAnime.duration
    ) {
      this.anims.play("LazyBoss", true);
      this.lastAttack = Date.now() + 1000;
      this.succedAttack = 0;
      this.maxSuccedAttack = Phaser.Math.Between(3, 10);
    }
  }

  move() {
    //si player trop loin, chill
    if (this.x - this.scene.player.x > 500 && !this.initedBattle) {
      this.anims.play("LazyBoss", true);
    } else {
      //initialisation de la bataille
      if (!this.initedBattle) {
        this.initBattle();
      } else {
        this.fight();
      }
    }
  }

  bubbleShow() {
    let spaceX = 0;
    let spaceY = -100;

    this.bubble = this.scene.add
      .image(this.x + spaceX, this.y + spaceY, "emptyBubble")
      .setScale(3.4, 1)
      .setOrigin(0);

    this.textBubble = this.scene.add.text(
      this.x + spaceX,
      this.y + spaceY,
      "Ahhhhhhhhh, tu es enfin là !!!",
      {
        fontFamily: '"Roboto Condensed"',
        color: "black"
      }
    );
  }

  bubleChangeText() {
    if (Date.now() - this.lastTextChange > 1000) {
      if (this.textBubble && this.bubble) {
        let rng = Phaser.Math.Between(0, this.texts.length - 1);
        this.textBubble.text = this.texts[rng];
      }
      this.lastTextChange = Date.now();
    }
  }

  throwPostIt(multiplicator) {
    for (let i = 0; i < multiplicator; i++) {
      let rng = Phaser.Math.Between(-5, 5);
      rng *= 20;
      this.postits.push(
        new PostIt(this.scene, this.scene.player.x + rng, 0, 500, 5000)
      );
    }
    this.attack = true;
  }

  throwBic(multiplicator) {
    this.anims.play("bic-it", true);
    for (let i = 0; i < multiplicator; i++) {
      this.postits.push(
        new Bic(this.scene, 3300, this.scene.player.y, 500, 5000)
      );
    }
    this.attack = true;
  }

  takeDmg(dmg) {
    console.log(this.hp);
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.boobs.destroy();
      this.textBubble.destroy();
      delete this.bubble;
      delete this.textBubble;
      this.scene.add.text(
        this.scene.player.x - 100,
        this.scene.player.y - 100,
        "You Win!!!"
      );
      this.scene.cameras.main.fade(2000, 0, 0, 0, null, (event, state) => {
        if (state == 1) {
          this.scene.scene.start("MenuScene", { player: this.scene.player });
          this.scene.doorOverlapped = false;
        }
      });
    }
  }
}
