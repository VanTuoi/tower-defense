import Phaser from 'phaser';
import { EnemyConfig, EnemyType, LevelConfig } from '../interfaces';
import { BaseEnemy, BasicEnemy, SkeletonCrusader } from '../objects';

type EnemyManagerProps = {
  scene: Phaser.Scene;
  baseEnemyConfig: Record<EnemyType, EnemyConfig>;
  levelConfig: LevelConfig;
  onWaveStart?: (waveIndex: number) => void;
};

export class EnemyManager {
  private scene: Phaser.Scene;
  private baseEnemyConfig: Record<EnemyType, EnemyConfig>;

  private onWaveStart?: (waveIndex: number) => void;
  private levelConfig: LevelConfig;
  private currentWaveIndex: number = 0;
  private currentEnemySpawnIndex: number = 0;
  private currentEnemyCountSpawned: number = 0;

  private enemies: BaseEnemy[] = [];

  private lastEnemySpawnTime: number = 0;
  private waveStartTime: number = 0;
  private spawning: boolean = false;

  constructor(props: EnemyManagerProps) {
    this.scene = props.scene;
    this.baseEnemyConfig = props.baseEnemyConfig;
    this.levelConfig = props.levelConfig;
    this.onWaveStart = props.onWaveStart;
  }

  public startFirstWave() {
    this.startWave(0);
  }

  private startWave(waveIndex: number) {
    this.currentWaveIndex = waveIndex;
    this.currentEnemySpawnIndex = 0;
    this.currentEnemyCountSpawned = 0;
    this.spawning = false;
    this.waveStartTime = 0;

    if (
      this.onWaveStart &&
      this.currentWaveIndex < this.levelConfig.waves.length
    ) {
      this.onWaveStart(this.currentWaveIndex);
    }
  }

  private spawnEnemy(
    type: EnemyType,
    statsModifier?: Partial<EnemyConfig>
  ): BaseEnemy {
    const baseConfig = this.baseEnemyConfig[type];
    if (!baseConfig) throw new Error(`Enemy config for type ${type} not found`);

    const finalConfig = { ...baseConfig, ...statsModifier };

    const x = Phaser.Math.Between(100, this.scene.sys.canvas.width - 100);
    const y = 100;

    switch (type) {
      case 'basicEnemy':
        return new BasicEnemy(this.scene, x, y, finalConfig);
      case 'skeletonCrusader':
        return new SkeletonCrusader(this.scene, x, y, finalConfig);
      default:
        return new BasicEnemy(this.scene, x, y, finalConfig);
    }
  }

  public update(time: number, delta: number): BaseEnemy[] {
    if (this.currentWaveIndex >= this.levelConfig.waves.length) {
      this.enemies = this.enemies.filter((enemy) => {
        enemy.move(delta);
        if (enemy.isOffScreen(this.scene.sys.canvas.height)) {
          enemy.destroy();
          return false;
        }
        return true;
      });
      return this.enemies;
    }

    const currentWave = this.levelConfig.waves[this.currentWaveIndex];

    if (!this.spawning) {
      if (this.waveStartTime === 0) {
        this.waveStartTime = time;
      }

      if (time - this.waveStartTime >= currentWave.waveDelay) {
        this.spawning = true;
        this.lastEnemySpawnTime = 0;
        this.currentEnemySpawnIndex = 0;
        this.currentEnemyCountSpawned = 0;
      }
    } else {
      if (this.currentEnemySpawnIndex >= currentWave.enemies.length) {
        if (this.enemies.length === 0) {
          if (this.currentWaveIndex + 1 <= this.levelConfig.waves.length) {
            this.startWave(this.currentWaveIndex + 1);
          }
        }
      } else {
        const spawnConfig = currentWave.enemies[this.currentEnemySpawnIndex];

        if (
          this.currentEnemyCountSpawned < spawnConfig.count &&
          time - this.lastEnemySpawnTime > spawnConfig.spawnInterval
        ) {
          const enemy = this.spawnEnemy(
            spawnConfig.type as EnemyType,
            spawnConfig.statsModifier
          );
          this.enemies.push(enemy);
          this.currentEnemyCountSpawned++;
          this.lastEnemySpawnTime = time;
        }

        if (this.currentEnemyCountSpawned >= spawnConfig.count) {
          this.currentEnemySpawnIndex++;
          this.currentEnemyCountSpawned = 0;
          this.lastEnemySpawnTime = 0;
        }
      }
    }

    this.enemies = this.enemies.filter((enemy) => {
      enemy.move(delta);
      if (enemy.isOffScreen(this.scene.sys.canvas.height)) {
        enemy.destroy();
        return false;
      }
      return true;
    });

    return this.enemies;
  }

  public takeDamageOnEnemy(
    target: Phaser.GameObjects.Sprite,
    damage: number
  ): BaseEnemy | null {
    const enemy = this.enemies.find((e) => e.getSprite() === target);
    if (!enemy) return null;

    const destroyed = enemy.takeDamage(damage);
    if (destroyed) {
      this.enemies = this.enemies.filter((e) => e !== enemy);
      return enemy;
    }

    return null;
  }

  public getEnemies(): BaseEnemy[] {
    return this.enemies;
  }

  public isAllWavesCompleted(): boolean {
    console.log('Checking all waves completed:', {
      currentWaveIndex: this.currentWaveIndex,
      totalWaves: this.levelConfig.waves.length,
      enemiesRemaining: this.enemies.length
    });
    return (
      this.currentWaveIndex >= this.levelConfig.waves.length &&
      this.enemies.length === 0
    );
  }
}
