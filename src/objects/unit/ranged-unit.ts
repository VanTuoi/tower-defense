import Phaser from 'phaser';
import { UnitConfig } from '../../config';
import { BaseUnit } from './base-unit';

export class RangedUnit extends BaseUnit {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const config = UnitConfig.RangedUnit;

    this.applyConfig(config);
  }

  public override attack(
    target: Phaser.GameObjects.Sprite,
    time: number
  ): boolean {
    const attacked = super.attack(target, time);
    if (attacked) {
      if (this.scene.anims.exists(UnitConfig.RangedUnit.textureKey)) {
        this.getSprite().play(UnitConfig.RangedUnit.textureKey);
      } else {
        console.warn('Animation not found:', UnitConfig.RangedUnit.textureKey);
      }
    }
    return attacked;
  }
}
