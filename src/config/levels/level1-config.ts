import { LevelConfig } from '../../interfaces';

export const level1Config: LevelConfig = {
  initialHp: 100,
  initialMoney: 200,
  background: 'bg-level-1',
  icon: 'icon-level-1',
  waves: [
    {
      waveDelay: 0,
      enemies: [
        {
          type: 'basicEnemy',
          count: 1,
          spawnInterval: 1000,
          statsModifier: { speed: 80 }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit']
    }
  ]
};
