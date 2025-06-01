import Phaser from 'phaser';
import { Colors } from '../config/colors';

export class BootScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    const { width, height } = this.sys.canvas;

    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(Colors.ui.loadingBarBg, 1);
    this.loadingBar.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.progressBar = this.add.graphics();

    const loadingText = this.add
      .text(width / 2, height / 2 - 50, 'Loading: 0%', {
        fontSize: '30px',
        color: '#ffffff',
        stroke: '#ffffff',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(Colors.ui.loadingBarProgress, 1);
      this.progressBar.fillRect(
        width / 2 - 150,
        height / 2 - 15,
        300 * value,
        30
      );
      loadingText.setText(`Loading: ${(value * 100).toFixed(0)}%`);
    });

    this.load.on('complete', () => {
      this.loadingBar.destroy();
      this.progressBar.destroy();
      loadingText.destroy();

      this.scene.start('MainMenuScene');
    });

    this.load.bitmapFont(
      'towerDefenseFont',
      'assets/fonts/font.png',
      'assets/fonts/font.fnt'
    );

    // game load
    this.load.audio('towerDefense', 'assets/audio/game/tower-defense.mp3');
    this.load.image('background', 'assets/images/game/background.png');
    this.load.image('border', 'assets/images/game/map-border.png');

    // level
    this.load.image('default-icon', 'assets/images/levels/icon-level-1.png');
    this.load.image('icon-level-1', 'assets/images/levels/icon-level-1.png');
    this.load.image('icon-level-2', 'assets/images/levels/icon-level-2.png');

    // projectile load
    this.load.audio('like', 'assets/audio/projectiles/like.wav');
    this.load.image('like-projectile', 'assets/images/projectiles/like.png');
    this.load.audio('water', 'assets/audio/projectiles/water.wav');
    this.load.atlas(
      'water-projectile',
      'assets/images/projectiles/water.png',
      'assets/images/projectiles/water.json'
    );
    this.load.audio('fire', 'assets/audio/projectiles/fire.wav');
    this.load.atlas(
      'fire-projectile',
      'assets/images/projectiles/fire.png',
      'assets/images/projectiles/fire.json'
    );

    // unit load
    this.load.image('tanker', 'assets/images/units/tanker.png');
    this.load.atlas(
      'tanker-attack',
      'assets/images/units/tanker-attack.png',
      'assets/images/units/tanker-attack.json'
    );
    this.load.image('sniper', 'assets/images/units/sniper.png');
    this.load.atlas(
      'sniper-attack',
      'assets/images/units/sniper-attack.png',
      'assets/images/units/sniper-attack.json'
    );
    this.load.image('ranged', 'assets/images/units/ranged.png');
    this.load.atlas(
      'ranged-attack',
      'assets/images/units/ranged-attack.png',
      'assets/images/units/ranged-attack.json'
    );

    // enemy load
    this.load.atlas(
      'basic-enemy',
      'assets/images/enemies/basic-enemy.png',
      'assets/images/enemies/basic-enemy.json'
    );
    this.load.atlas(
      'basic-enemy-die',
      'assets/images/enemies/basic-enemy-die.png',
      'assets/images/enemies/basic-enemy-die.json'
    );
    this.load.atlas(
      'skeleton-crusader',
      'assets/images/enemies/skeleton-crusader.png',
      'assets/images/enemies/skeleton-crusader.json'
    );
    this.load.atlas(
      'skeleton-crusader-die',
      'assets/images/enemies/skeleton-crusader-die.png',
      'assets/images/enemies/skeleton-crusader-die.json'
    );
  }

  create(): void {
    // projectile
    this.anims.create({
      key: 'water-projectile-anim',
      frames: this.anims.generateFrameNames('water-projectile', {
        prefix: 'water1',
        start: 0,
        end: 20,
        zeroPad: 5
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'fire-projectile-anim',
      frames: this.anims.generateFrameNames('fire-projectile', {
        prefix: '',
        start: 0,
        end: 40,
        zeroPad: 2
      }),
      frameRate: 41,
      repeat: -1
    });

    // unit
    this.anims.create({
      key: 'tanker-attack',
      frames: this.anims.generateFrameNames('tanker-attack', {
        prefix: '',
        start: 0,
        end: 4,
        zeroPad: 2
      }),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: 'sniper-attack',
      frames: this.anims.generateFrameNames('sniper-attack', {
        prefix: 'Sniper-Slashing_',
        start: 0,
        end: 11,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: 0
    });

    this.anims.create({
      key: 'ranged-attack',
      frames: this.anims.generateFrameNames('ranged-attack', {
        prefix: 'Slashing_',
        start: 0,
        end: 11,
        zeroPad: 3
      }),
      frameRate: 12,
      repeat: 0
    });

    // enemy
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
  }
}
