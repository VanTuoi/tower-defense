import Phaser from 'phaser';
import { HeaderGameScene } from '../views';

export class HeaderScene extends Phaser.Scene {
  private headerGameScene!: HeaderGameScene;

  constructor() {
    super({ key: 'HeaderScene' });
  }

  create() {
    this.headerGameScene = new HeaderGameScene(this);
    this.headerGameScene.createHeader(() => {
      const gameScene = this.scene.get('GameScene');

      if (gameScene.scene.isPaused()) {
        gameScene.scene.resume();
      } else {
        gameScene.scene.pause();
      }
    });
  }
}
