import { EnemyConfig } from '../../interfaces';
import { BaseEnemy } from './base-enemy';

export class SkeletonCrusader extends BaseEnemy {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: EnemyConfig,
    path?: Phaser.Curves.Path
  ) {
    super(
      scene,
      x,
      y,
      {
        ...config,
        hpTextOffsetY: 70,
        texture: 'basicEnemy'
      },
      path
    );
    this.sprite.play('skeleton-crusader');
    this.resizeSprite();
  }

  public override destroy(): void {
    this.sprite.play('skeleton-crusader-die');
    this.hpText.setVisible(false);
    this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.sprite.destroy();
    });
  }
}
