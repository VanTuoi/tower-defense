import { EnemyConfig } from '../interfaces';

export const enemyConfigs: Record<string, EnemyConfig> = {
  basic: {
    texture: 'basicEnemy',
    hp: 100,
    speed: 50,
    power: 10
  }
};
