import { EnemySpawnConfig } from './enemy.interface';

export interface WaveConfig {
  enemies: EnemySpawnConfig[];
  waveDelay: number;
  allowedUnits: string[];
}
