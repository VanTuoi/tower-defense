import Phaser from 'phaser';
import { Colors } from '../config';

export class BaseButton extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Graphics;
  protected text: Phaser.GameObjects.BitmapText;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    width: number = 180,
    height: number = 50,
    onClick?: () => void
  ) {
    super(scene, x, y);

    this.background = scene.add.graphics();
    this.drawBackground(this.background, width, height, Colors.button.normal);

    this.text = scene.add
      .bitmapText(0, 0, 'towerDefenseFont', label, 24)
      .setOrigin(0.5)
      .setTint(Colors.button.text_white);

    this.text.clearTint();
    this.add([this.background, this.text]);
    this.setSize(width, height);
    this.setInteractive();
    scene.add.existing(this);

    this.on('pointerover', () => {
      this.background.clear();
      this.drawBackground(this.background, width, height, Colors.button.hover);
      this.background.setScale(1.05);
      this.text.setScale(1.05);
      scene.input.setDefaultCursor('pointer');
    });

    this.on('pointerout', () => {
      this.background.clear();
      this.drawBackground(this.background, width, height, Colors.button.normal);
      this.background.setScale(1);
      this.text.setScale(1);
      scene.input.setDefaultCursor('default');
    });

    if (onClick) {
      this.on('pointerdown', onClick);
    }
  }

  private drawBackground(
    graphics: Phaser.GameObjects.Graphics,
    width: number,
    height: number,
    fillColor: number
  ) {
    graphics.fillStyle(fillColor, 1);
    graphics.lineStyle(2, Colors.button.border, 1);
    graphics.fillRoundedRect(-width / 2, -height / 2, width, height, 12);
    graphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 12);
  }
}
