import Phaser from 'phaser';
import { CONST } from '../const/const';

export class GameStateManager {
  private scene: Phaser.Scene;
  private moneyText: Phaser.GameObjects.BitmapText;
  private hpText: Phaser.GameObjects.BitmapText;

  constructor(scene: Phaser.Scene, initMoney: number, initHp: number) {
    this.scene = scene;

    this.moneyText = this.scene.add
      .bitmapText(
        this.scene.sys.canvas.width - 200,
        60 + CONST.HEADER_HEIGHT,
        'towerDefenseFont',
        'Money: ' + initMoney,
        24
      )
      .setOrigin(0.5);

    this.hpText = this.scene.add
      .bitmapText(
        200,
        60 + CONST.HEADER_HEIGHT,
        'towerDefenseFont',
        'HP: ' + initHp,
        24
      )
      .setOrigin(0.5);
  }

  updateMoney(money: number) {
    this.moneyText.setText('Money: ' + money);
  }

  updateHp(hp: number) {
    this.hpText.setText('HP: ' + hp);
  }
}
