import Phaser from 'phaser';
import { UnitRegistry } from '../factory/unit-factory';
import { BaseUnit } from '../objects';

export class UnitManager {
  private scene: Phaser.Scene;
  private units: BaseUnit[] = [];
  private allowedUnits: string[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setAllowedUnits(unitNames: string[]) {
    this.allowedUnits = unitNames;
  }

  addUnit(x: number, y: number, unitType: string = 'RangedUnit') {
    if (!this.allowedUnits.includes(unitType)) {
      console.warn(`Unit type ${unitType} is not allowed in this wave.`);
      return;
    }

    const UnitClass = UnitRegistry[unitType];
    if (!UnitClass) {
      console.error(`Unit type ${unitType} not registered.`);
      return;
    }

    const unit = new UnitClass(this.scene, x, y);
    this.units.push(unit);
  }

  getUnits() {
    return this.units;
  }

  update(time: number) {}
}
