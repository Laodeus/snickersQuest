var config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: true
    }
  },
  scene: [ GameScene2, GameScene1,LandingScene, MenuScene]
};

var game = new Phaser.Game(config);
