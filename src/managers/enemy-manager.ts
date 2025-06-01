import Phaser from 'phaser';
import { EnemyFactory } from '../factories';
import { EnemyConfig, EnemyType, LevelConfig } from '../interfaces';
import { BaseEnemy } from '../objects';

type EnemyManagerProps = {
  scene: Phaser.Scene;
  baseEnemyConfig: Record<EnemyType, EnemyConfig>;
  levelConfig: LevelConfig;
  onWaveStart?: (waveIndex: number) => void;
};

export class EnemyManager {
  private scene: Phaser.Scene;
  private baseEnemyConfig: Record<EnemyType, EnemyConfig>;
  private enemyFactory: EnemyFactory;

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
    this.enemyFactory = new EnemyFactory(this.scene, props.baseEnemyConfig);
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
    return this.enemyFactory.createEnemy(type, statsModifier);
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
    return (
      this.currentWaveIndex >= this.levelConfig.waves.length &&
      this.enemies.length === 0
    );
  }
}
