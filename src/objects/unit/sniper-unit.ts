import Phaser from 'phaser';
import { UnitConfig } from '../../config';
import { BaseUnit } from './base-unit';

export class SniperUnit extends BaseUnit {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const config = UnitConfig.SniperUnit;

    this.applyConfig(config);
  }

  public override attack(
    target: Phaser.GameObjects.Sprite,
    time: number
  ): boolean {
    const attacked = super.attack(target, time);
    if (attacked) {
      if (this.scene.anims.exists(UnitConfig.SniperUnit.textureKey)) {
        this.getSprite().play(UnitConfig.SniperUnit.textureKey);
      } else {
        console.warn('Animation not found:', UnitConfig.SniperUnit.textureKey);
      }
    }
    return attacked;
  }
}
