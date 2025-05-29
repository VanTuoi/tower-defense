import Phaser from 'phaser';
import { UIButton } from '../view';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  create(): void {
    const { width, height } = this.sys.canvas;

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 100,
        'towerDefenseFont',
        'Tower Defense',
        48
      )
      .setOrigin(0.5)
      .setTint(0xffff00);

    const playButton = new UIButton(
      this,
      width / 2,
      height / 2 + 50,
      'PLAY',
      220,
      80,
      () => {
        this.scene.start('GameScene');
      }
    );

    this.input.keyboard.on('keydown-ENTER', () => {
      playButton.emit('pointerdown');
    });
  }
}
