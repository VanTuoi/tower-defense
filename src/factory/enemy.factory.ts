import Phaser from 'phaser';
import { EnemyConfig, EnemyType } from '../interfaces';
import { BaseEnemy, BasicEnemy, SkeletonCrusader } from '../objects';

export class EnemyFactory {
  private scene: Phaser.Scene;
  private baseEnemyConfig: Record<EnemyType, EnemyConfig>;

  constructor(
    scene: Phaser.Scene,
    baseEnemyConfig: Record<EnemyType, EnemyConfig>
  ) {
    this.scene = scene;
    this.baseEnemyConfig = baseEnemyConfig;
  }

  public createEnemy(
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
}
