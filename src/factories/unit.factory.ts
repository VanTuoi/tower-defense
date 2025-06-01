import Phaser from 'phaser';
import { UnitConfig } from '../config';
import { BaseUnit, RangedUnit, SniperUnit, TankerUnit } from '../objects';

type UnitConstructor = new (
  scene: Phaser.Scene,
  x: number,
  y: number
) => BaseUnit;

export const UnitRegistry: Record<string, UnitConstructor> = {
  RangedUnit,
  SniperUnit,
  TankerUnit
};

export class UnitFactory {
  static create(
    scene: Phaser.Scene,
    type: string,
    x: number,
    y: number
  ): BaseUnit {
    const UnitClass = UnitRegistry[type];
    const config = UnitConfig[type];
    console.log('config', config);

    if (!UnitClass || !config) {
      console.warn(`Unit type "${type}" không hợp lệ, tạo RangedUnit mặc định`);
      const fallbackUnit = new UnitRegistry['RangedUnit'](scene, x, y);
      fallbackUnit.applyConfig(UnitConfig['RangedUnit']);
      return fallbackUnit;
    }
    const unit = new UnitClass(scene, x, y);
    unit.applyConfig(config);
    return unit;
  }
}
