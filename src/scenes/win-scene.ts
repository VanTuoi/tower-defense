import { UIButton } from '../view';

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
    const { width, height } = this.sys.canvas;

    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 200,
        'towerDefenseFont',
        '🎉 YOU WIN! 🎉',
        64
      )
      .setOrigin(0.5)
      .setTint(0xffff00);

    this.add
      .bitmapText(
        width / 2,
        height / 2 - 80,
        'towerDefenseFont',
        `Your kills: ${this.enemiesKilled} of ${this.targetKills}`,
        36
      )
      .setOrigin(0.5)
      .setTint(0xffffff);

    const restartButton = new UIButton(
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

    this.input.keyboard.on('keydown-ENTER', () => {
      restartButton.emit('pointerdown');
    });
  }
}
