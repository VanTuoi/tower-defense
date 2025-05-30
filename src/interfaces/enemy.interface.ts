import { BaseEnemy } from '../objects/enemies/base-enemy';

export type EnemyType = 'basicEnemy' | 'skeletonCrusader';

export interface EnemyConfig {
  texture: string;
  hp: number;
  speed: number;
  power: number;
  rewardGold?: number;
  width?: number;
  height?: number;
  hpTextOffsetY?: number;
  hpTextFontSize?: number;
  canShoot?: boolean;
  shootInterval?: number;
  bulletSpeed?: number;
  attackRange?: number;
  onAttack?: (enemy: BaseEnemy) => void;
}

export interface EnemySpawnConfig {
  type: string;
  count: number;
  spawnInterval: number;
  statsModifier?: Partial<EnemyConfig>;
}
