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
    this.load.audio('shoot', 'assets/audio/shoot.mp3');
    this.load.audio('towerDefense', 'assets/audio/tower-defense.mp3');

    this.load.image('default-icon', 'assets/images/levels/icon-level-1.png');
    this.load.image('icon-level-1', 'assets/images/levels/icon-level-1.png');
    this.load.image('icon-level-2', 'assets/images/levels/icon-level-2.png');

    this.load.image('background', 'assets/images/background.png');
    this.load.image('cursorArrow', 'assets/images/cursor-arrow.png');
    this.load.image('basicBullet', 'assets/images/basic-bullet.png');
    this.load.image('explosiveBullet', 'assets/images/explosive-bullet.png');
    this.load.image('border', 'assets/images/border.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('ranged', 'assets/images/ranged.png');
    this.load.image('sniper', 'assets/images/sniper.png');

    this.load.atlas(
      'fire-projectile',
      'assets/images/projectile/fire.png',
      'assets/images/projectile/fire.json'
    );

    this.load.atlas(
      'sniper-attack',
      'assets/images/sniper-attack.png',
      'assets/images/sniper-attack.json'
    );

    this.load.atlas(
      'ranged-attack',
      'assets/images/ranged-attack.png',
      'assets/images/ranged-attack.json'
    );

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
  }

  create(): void {
    this.anims.create({
      key: 'fire-projectile',
      frames: this.anims.generateFrameNames('fire-projectile', {
        prefix: '',
        start: 0,
        end: 40,
        zeroPad: 2
      }),
      frameRate: 12,
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
