import { LevelConfig } from '../../interfaces';

export const level2Config: LevelConfig = {
  initialHp: 200,
  initialMoney: 200,
  background: 'bg-level-2',
  icon: 'icon-level-2',
  waves: [
    {
      waveDelay: 1000,
      enemies: [
        {
          type: 'basicEnemy',
          count: 5,
          spawnInterval: 1000,
          statsModifier: { speed: 80 }
        }
      ],
      allowedUnits: ['RangedUnit']
    },
    {
      waveDelay: 2000,
      enemies: [
        {
          type: 'basicEnemy',
          count: 10,
          spawnInterval: 700,
          statsModifier: { speed: 150 }
        },
        {
          type: 'skeletonCrusader',
          count: 10,
          spawnInterval: 700,
          statsModifier: { speed: 150 }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit']
    }
  ]
};
