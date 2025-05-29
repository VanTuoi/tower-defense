import { BaseUnit, RangedUnit } from '../objects';

type UnitConstructor = new (
  scene: Phaser.Scene,
  x: number,
  y: number
) => BaseUnit;

export const UnitRegistry: Record<string, UnitConstructor> = {
  RangedUnit
};
