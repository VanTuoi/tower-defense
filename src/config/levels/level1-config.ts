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
          count: 5,
          spawnInterval: 1000,
          statsModifier: { speed: 60, hp: 20, power: 10 }
        },
        {
          type: 'skeletonCrusader',
          count: 10,
          spawnInterval: 500,
          statsModifier: { speed: 65, hp: 25 }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit', 'TankerUnit']
    },
    {
      waveDelay: 1000,
      enemies: [
        {
          type: 'basicEnemy',
          count: 2,
          spawnInterval: 100,
          statsModifier: { speed: 80, hp: 100 }
        },
        {
          type: 'skeletonCrusader',
          count: 4,
          spawnInterval: 500,
          statsModifier: { speed: 65, hp: 125 }
        },
        {
          type: 'skeletonCrusader',
          count: 15,
          spawnInterval: 500,
          statsModifier: { speed: 65, hp: 200 }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit', 'TankerUnit']
    }
  ]
};
