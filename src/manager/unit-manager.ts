import Phaser from 'phaser';
import { UnitRegistry } from '../factory';
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

  addUnit(x: number, y: number, unitType: string = 'RangedUnit'): boolean {
    if (!this.allowedUnits.includes(unitType)) {
      console.warn(`Unit type ${unitType} is not allowed in this wave.`);
      return false;
    }

    const UnitClass = UnitRegistry[unitType];
    if (!UnitClass) {
      console.error(`Unit type ${unitType} not registered.`);
      return false;
    }

    const unit = new UnitClass(this.scene, x, y);
    this.units.push(unit);
    return true;
  }

  update(time: number) {}

  getUnits() {
    return this.units;
  }

  getAllowedUnits() {
    return this.allowedUnits;
  }
}
