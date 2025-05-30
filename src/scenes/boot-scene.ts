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

    this.load.atlas(
      'basic-enemy',
      'assets/images/basic-enemy.png',
      'assets/images/basic-enemy.json'
    );
    this.load.atlas(
      'basic-enemy-die',
      'assets/images/basic-enemy-die.png',
      'assets/images/basic-enemy-die.json'
    );

    this.load.atlas(
      'skeleton-crusader',
      'assets/images/skeleton-crusader.png',
      'assets/images/skeleton-crusader.json'
    );
    this.load.atlas(
      'skeleton-crusader-die',
      'assets/images/skeleton-crusader-die.png',
      'assets/images/skeleton-crusader-die.json'
    );

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
      frames: this.anims.generateFrameNames('basic-enemy', {
        prefix: '0_Minotaur_Running_',
        start: 0,
        end: 11,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'basic-enemy-die',
      frames: this.anims.generateFrameNames('basic-enemy-die', {
        prefix: '0_Minotaur_Dying_',
        start: 0,
        end: 14,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: 0
    });

    this.anims.create({
      key: 'skeleton-crusader',
      frames: this.anims.generateFrameNames('skeleton-crusader', {
        prefix: '0_Skeleton_Crusader_Run_Throwing_',
        start: 0,
        end: 11,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'skeleton-crusader-die',
      frames: this.anims.generateFrameNames('skeleton-crusader-die', {
        prefix: '0_Skeleton_Crusader_Dying_',
        start: 0,
        end: 14,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: 0
    });

    this.scene.start('MainMenuScene');
  }
}
