import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    this.load.bitmapFont(
      'towerDefenseFont',
      './assets/fonts/font.png',
      './assets/fonts/font.fnt'
    );
    this.load.audio('shoot', './assets/audio/shoot.mp3');
    this.load.image('bullet', './assets/images/bullet.png');
    this.load.image('border', './assets/images/border.png');
    this.load.image('enemy', './assets/images/enemy.png');
    this.load.spritesheet('basicEnemy', 'assets/images/basic-enemy.png', {
      frameWidth: 181,
      frameHeight: 181
    });
    this.load.spritesheet('rangedUnit', 'assets/images/ranged-unit.png', {
      frameWidth: 160,
      frameHeight: 202
    });
  }

  create(): void {
    this.anims.create({
      key: 'ranged-attack',
      frames: this.anims.generateFrameNumbers('rangedUnit', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'basic-enemy',
      frames: this.anims.generateFrameNumbers('basicEnemy', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('MainMenuScene');
  }
}
