class EnemyBasic extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    // display player
    scene.sys.displayList.add(this);
    //??? this make potatoes
    scene.sys.updateList.add(this);
    //this activate the physics
    scene.sys.arcadePhysics.world.enableBody(this, 0);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.hp = 1;

    this.direction = "right";

    //some animations
    scene.anims.create({
      key: "leftEnemy1",
      frames: scene.anims.generateFrameNumbers("Julie001", {
        start: 4,
        end: 7
      }),
      frameRate: 5,
      repeat: -1,
      options: {
        scaleX: -1
      }
    });

    scene.anims.create({
      key: "rightEnemy1",
      frames: scene.anims.generateFrameNumbers("Julie001", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });

    this.texts = [
      "Workshop !",
      "Veille !",
      "Leny !!!",
      "Bics !!",
      "J'ai faim !"
    ];
    this.bubbleShow();
    this.bubleChangeText();
  }

  move() {
    if (this.body.touching.right) {
      this.direction = "left";
    } else if (this.body.touching.left) {
      this.direction = "right";
    }
    if (this.direction === "right") {
      this.setVelocityX(100);
      this.anims.play("rightEnemy1", true);
    } else if (this.direction === "left") {
      this.setVelocityX(-100);
      this.anims.play("leftEnemy1", true);
    }
    if (this.bubble) {
      this.bubbleUpdate();
    }
  }

  takeDmg(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.destroy();
      this.bubble.destroy();
      this.textBubble.destroy();
      delete this.bubble;
      delete this.textBubble;
    }
  }

  bubbleShow() {
    let spaceX = 20;
    let spaceY = -60;

    this.bubble = this.scene.add
      .image(this.x + spaceX, this.y + spaceY, "emptyBubble")
      .setOrigin(0);

    this.textBubble = this.scene.add.text(
      this.x + spaceX,
      this.y + spaceY,
      this.texts[0],
      {
        fontFamily: '"Roboto Condensed"',
        color: "black"
      }
    );
  }
  bubbleUpdate() {
    this.bubble.x = this.x + 20;
    this.bubble.y = this.y - 60;
    this.textBubble.x = this.x + 20;
    this.textBubble.y = this.y - 60;
  }

  bubleChangeText() {
    if (this.textBubble && this.bubble) {
      let rng = Phaser.Math.Between(0, this.texts.length - 1);
      this.textBubble.text = this.texts[rng];
      setTimeout(() => {
        this.bubleChangeText();
      }, 1000);
    }
  }
}
