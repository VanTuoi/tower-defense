import Phaser from 'phaser';
import { UnitConfig } from '../../config';
import { BaseUnit } from './base-unit';

export class TankerUnit extends BaseUnit {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const config = UnitConfig.TankerUnit;

    this.applyConfig(config);
  }

  public override attack(
    target: Phaser.GameObjects.Sprite,
    time: number
  ): boolean {
    const attacked = super.attack(target, time);
    if (attacked) {
      if (this.scene.anims.exists(UnitConfig.TankerUnit.textureKey)) {
        this.getSprite().play(UnitConfig.TankerUnit.textureKey);
      } else {
        console.warn('Animation not found:', UnitConfig.TankerUnit.textureKey);
      }
    }
    return attacked;
  }
}
