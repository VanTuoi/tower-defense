import Phaser from 'phaser';
import { Colors } from '../config';
import { BaseButton } from './base-button';

export class BackButton extends BaseButton {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label = 'BACK',
    width = 140,
    height = 60,
    private previousSceneKey: string
  ) {
    super(scene, x, y, label, width, height, () => {
      if (previousSceneKey) {
        scene.scene.start(previousSceneKey);
      } else {
        scene.scene.stop();
      }
    });

    this.text.setTint(Colors.button.text_white);
  }
}
