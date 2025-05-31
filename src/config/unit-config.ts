import { UnitStats } from '../interfaces';

export const UnitConfig: Record<string, UnitStats> = {
  RangedUnit: {
    cost: 50,
    power: 10,
    attackSpeed: 1,
    range: 300,
    textureKey: 'ranged-attack',
    idleTextureKey: 'ranged',
    bulletType: 'basic',
    displayWidth: 128,
    displayHeight: 128,
    scale: 1.5
  },
  SniperUnit: {
    cost: 70,
    power: 50,
    attackSpeed: 1,
    range: 400,
    textureKey: 'sniper-attack',
    idleTextureKey: 'sniper',
    bulletType: 'explosive',
    displayWidth: 128,
    displayHeight: 128,
    scale: 1.5
  }
};
