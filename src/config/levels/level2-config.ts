import { LevelConfig } from '../../interfaces';

export const level2Config: LevelConfig = {
  initialHp: 200,
  initialMoney: 200,
  background: 'bg-level-2',
  icon: 'icon-level-2',
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
          statsModifier: { speed: 60, hp: 125 }
        },
        {
          type: 'skeletonCrusader',
          count: 15,
          spawnInterval: 1000,
          statsModifier: { speed: 65, hp: 200 }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit', 'TankerUnit']
    },
    {
      waveDelay: 2000,
      enemies: [
        {
          type: 'skeletonCrusader',
          count: 1,
          spawnInterval: 100,
          statsModifier: {
            speed: 20,
            hp: 9999,
            power: 9999,
            height: 512,
            width: 512
          }
        },
        {
          type: 'skeletonCrusader',
          count: 50,
          spawnInterval: 20,
          statsModifier: {
            speed: 30,
            hp: 1,
            power: 1,
            height: 64,
            width: 64
          }
        }
      ],
      allowedUnits: ['RangedUnit', 'SniperUnit', 'TankerUnit']
    }
  ]
};
