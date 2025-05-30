import { EnemyConfig } from '../interfaces';

export const enemyConfigs: Record<string, EnemyConfig> = {
  basicEnemy: {
    texture: 'basicEnemy',
    hp: 50,
    speed: 50,
    power: 10,
    rewardGold: 5
  },
  skeletonCrusader: {
    texture: 'skeletonCrusader',
    hp: 200,
    speed: 70,
    power: 20,
    rewardGold: 15
  }
};
