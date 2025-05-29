import { UIButton } from '../view';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    const { width, height } = this.sys.canvas;

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 150,
        'towerDefenseFont',
        'You lost',
        64
      )
      .setOrigin(0.5)
      .setTint(0xff0000);

    const restartButton = new UIButton(
      this,
      width / 2,
      height / 2 + 50,
      'Restart',
      250,
      80,
      () => {
        this.scene.start('GameScene');
      }
    );

    this.input.keyboard.on('keydown-ENTER', () => {
      restartButton.emit('pointerdown');
    });
  }
}
