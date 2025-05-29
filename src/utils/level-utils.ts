import { LevelConfig } from '../interfaces/level.interface';

export function getTotalEnemiesFromLevel(levelConfig: LevelConfig): number {
  return levelConfig.waves.reduce((sum, wave) => {
    return (
      sum +
      wave.enemies.reduce(
        (waveSum, enemyGroup) => waveSum + enemyGroup.count,
        0
      )
    );
  }, 0);
}
