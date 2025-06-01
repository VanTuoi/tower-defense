import Phaser from 'phaser';
import { UnitConfig } from '../config';
import { UnitSelectionController } from '../controllers';

export class UnitSelectionView {
  private scene: Phaser.Scene;
  private controller: UnitSelectionController;
  private gameHeight: number;
  private buttonSize = 100;
  private padding = 10;

  private selectionBorders: Map<string, Phaser.GameObjects.Graphics> =
    new Map();
  private selectedUnitType: string | null = null;

  constructor(
    scene: Phaser.Scene,
    controller: UnitSelectionController,
    gameHeight: number
  ) {
    this.scene = scene;
    this.controller = controller;
    this.gameHeight = gameHeight;
  }

  render(allowedUnits: string[]) {
    const unitTypes = allowedUnits;

    unitTypes.forEach((unitType, index) => {
      const config = UnitConfig[unitType];
      const textureKey = config.idleTextureKey;

      const x = this.padding + index * (this.buttonSize + this.padding);
      const y = this.gameHeight - this.buttonSize - this.padding;

      const btn = this.scene.add.image(x, y, textureKey).setOrigin(0);
      btn.setDisplaySize(this.buttonSize, this.buttonSize);
      btn.setInteractive();
      btn.on('pointerdown', () => this.selectUnit(unitType));

      const centerX = x + this.buttonSize / 2;
      const costY = y - 20;
      this.scene.add
        .bitmapText(centerX, costY, 'towerDefenseFont', `${config.cost}`, 24)
        .setOrigin(0.5);

      const border = this.scene.add.graphics();
      border.lineStyle(3, 0xffff00);
      border.strokeRect(x - 2, y - 2, this.buttonSize + 4, this.buttonSize + 4);
      border.setVisible(false);

      this.selectionBorders.set(unitType, border);
    });
  }

  private selectUnit(unitType: string) {
    this.controller.selectUnit(unitType);

    if (
      this.selectedUnitType &&
      this.selectionBorders.has(this.selectedUnitType)
    ) {
      this.selectionBorders.get(this.selectedUnitType)?.setVisible(false);
    }

    this.selectionBorders.get(unitType)?.setVisible(true);
    this.selectedUnitType = unitType;
  }
}
