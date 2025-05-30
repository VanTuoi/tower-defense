import Phaser from 'phaser';
import { UnitConfig } from '../config';
import { UnitSelectionController } from '../controller';

export class UnitSelectionView {
  private scene: Phaser.Scene;
  private controller: UnitSelectionController;
  private gameHeight: number;
  private buttonSize = 50;
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

  render() {
    const unitTypes = Object.keys(UnitConfig);

    unitTypes.forEach((unitType, index) => {
      const x = this.padding + index * (this.buttonSize + this.padding);
      const y = this.gameHeight - this.buttonSize - this.padding;

      // const btn = this.scene.add.image(x, y, unitType).setOrigin(0);
      const btn = this.scene.add.sprite(x, y, 'rangedUnit', 0).setOrigin(0);

      btn.setDisplaySize(this.buttonSize, this.buttonSize);
      btn.setInteractive();
      btn.on('pointerdown', () => this.selectUnit(unitType));

      const cost = UnitConfig[unitType].cost;
      this.scene.add.text(x, y - 30, `${cost}`, {
        fontSize: '30px',
        color: '#fff'
      });

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
