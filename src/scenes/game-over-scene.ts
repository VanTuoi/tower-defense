import { Colors } from '../config';
import { BaseButton } from '../views';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 150,
        'towerDefenseFont',
        'You lost',
        64
      )
      .setOrigin(0.5)
      .setTint(Colors.danger.normal);

    const restartButton = new BaseButton(
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
