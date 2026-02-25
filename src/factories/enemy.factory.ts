import Phaser from 'phaser';
import { CONST } from '../const/const';
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
    const y = 150 + CONST.HEADER_HEIGHT;

    const startX = 2 * CONST.FIELD_SIZE;
    const startY = CONST.HEADER_HEIGHT + CONST.SELECTION_AREA_HEIGHT;

    const waypoints = [
      [2, 0],
      [2, 3],
      [5, 3],
      [5, 6],
      [1, 6],
      [1, 9]
    ];

    const start = waypoints[0];
    const path = new Phaser.Curves.Path(
      start[0] * CONST.FIELD_SIZE,
      start[1] * CONST.FIELD_SIZE + startY
    );

    for (let i = 1; i < waypoints.length; i++) {
      const [x, y] = waypoints[i];
      path.lineTo(x * CONST.FIELD_SIZE, y * CONST.FIELD_SIZE + startY);
    }

    switch (type) {
      case 'basicEnemy':
        return new BasicEnemy(this.scene, x, y, finalConfig, path);
      case 'skeletonCrusader':
        return new SkeletonCrusader(this.scene, x, y, finalConfig, path);
      default:
        return new BasicEnemy(this.scene, x, y, finalConfig, path);
    }
  }
}
