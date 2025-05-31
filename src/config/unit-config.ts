import { UnitStats } from '../interfaces';

export const UnitConfig: Record<string, UnitStats> = {
  RangedUnit: {
    cost: 50,
    power: 15,
    attackSpeed: 2,
    range: 400,
    textureKey: 'ranged',
    bulletType: 'basic',
    displayWidth: 64,
    displayHeight: 64,
    scale: 1.5
  },
  SniperUnit: {
    cost: 70,
    power: 50,
    attackSpeed: 1,
    range: 600,
    textureKey: 'sniper',
    bulletType: 'explosive',
    displayWidth: 64,
    displayHeight: 64,
    scale: 1.2
  },
  MeleeUnit: {
    cost: 100,
    power: 20,
    attackSpeed: 3,
    range: 150,
    textureKey: 'melee',
    bulletType: 'melee',
    displayWidth: 64,
    displayHeight: 64,
    scale: 1.8
  }
};
