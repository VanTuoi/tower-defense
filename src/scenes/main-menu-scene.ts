import Phaser from 'phaser';
import { Colors } from '../config';
import { BaseButton } from '../view';

export class MainMenuScene extends Phaser.Scene {
  private backgroundMusic?: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create(): void {
    const { width, height } = this.scale;

    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setDisplaySize(width, height);

    const overlay = this.add.rectangle(
      0,
      0,
      width,
      height,
      Colors.background.overlay,
      Colors.background.overlayAlpha
    );
    overlay.setOrigin(0);

    if (!this.sound.get('towerDefense')) {
      this.backgroundMusic = this.sound.add('towerDefense', {
        loop: true,
        volume: 0.5
      });
      this.backgroundMusic.play();
    }

    this.add
      .bitmapText(width / 2, 150, 'towerDefenseFont', 'Tower Defense', 48)
      .setOrigin(0.5)
      .setTint(Colors.text.title);

    const playButton = new BaseButton(
      this,
      width / 2,
      height - 250,
      'PLAY',
      220,
      80,
      () => {
        this.scene.start('LevelSelectionScene');
      }
    );

    this.input.keyboard.on('keydown-ENTER', () => {
      playButton.emit('pointerdown');
    });
  }
}
