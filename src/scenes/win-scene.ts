import { Colors } from '../config';
import { BaseButton } from '../views';

type WinSceneProps = {
  enemiesKilled: number;
  targetKills: number;
};

export class WinScene extends Phaser.Scene {
  private enemiesKilled!: number;
  private targetKills!: number;

  constructor() {
    super({ key: 'WinScene' });
  }

  init(data: WinSceneProps) {
    this.enemiesKilled = data.enemiesKilled;
    this.targetKills = data.targetKills;
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 200,
        'towerDefenseFont',
        '🎉 YOU WIN! 🎉',
        64
      )
      .setOrigin(0.5)
      .setTint(Colors.text.title);

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 80,
        'towerDefenseFont',
        `Your kills: ${this.enemiesKilled} of ${this.targetKills}`,
        36
      )
      .setOrigin(0.5)
      .setTint(Colors.text.default);

    const restartButton = new BaseButton(
      this,
      width / 2,
      height / 2 + 80,
      'RESTART',
      250,
      80,
      () => {
        this.scene.start('GameScene');
      }
    );

    const levelSelectButton = new BaseButton(
      this,
      width / 2,
      height / 2 + 230,
      'SELECT LEVELS',
      350,
      80,
      () => {
        this.scene.start('LevelSelectionScene');
      }
    );

    this.input.keyboard.on('keydown-ENTER', () => {
      restartButton.emit('pointerdown');
    });
  }
}
