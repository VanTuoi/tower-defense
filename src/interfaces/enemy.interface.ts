import { BaseEnemy } from '../objects/enemies/base-enemy';

export type EnemyType = 'basic';

export interface EnemyConfig {
  texture: string;
  hp: number;
  speed: number;
  power: number;
  scale?: number;
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
