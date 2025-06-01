import { EnemyConfig, EnemyType } from '../interfaces';

export const enemyConfigs: Record<EnemyType, EnemyConfig> = {
  basicEnemy: {
    texture: 'basicEnemy',
    hp: 100,
    speed: 100,
    power: 10,
    rewardGold: 5,
    width: 156,
    height: 156,
    hpTextOffsetY: 30,
    hpTextFontSize: 20
  },
  skeletonCrusader: {
    texture: 'skeletonCrusader',
    hp: 150,
    speed: 80,
    power: 20,
    rewardGold: 10,
    width: 156,
    height: 156,
    hpTextOffsetY: 30,
    hpTextFontSize: 20
  }
};
