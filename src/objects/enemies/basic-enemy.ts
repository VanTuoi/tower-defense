import { EnemyConfig } from '../../interfaces';
import { BaseEnemy } from './base-enemy';

export class BasicEnemy extends BaseEnemy {
  constructor(scene: Phaser.Scene, x: number, y: number, config: EnemyConfig) {
    super(scene, x, y, {
      ...config,
      speed: config.speed * 2,
      hpTextOffsetY: 70,
      texture: 'basicEnemy'
    });
    this.sprite.play('basic-enemy');
  }
}
