import Phaser from 'phaser';
import { UnitConfig } from '../../config';
import { BaseUnit } from './base-unit';

export class SniperUnit extends BaseUnit {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const config = UnitConfig.SniperUnit;

    this.setTexture(config.textureKey, config.scale);
    this.setPower(config.power);
    this.setAttackSpeed(config.attackSpeed);
    this.setRange(config.range);
    this.setCost(config.cost);
    this.setBulletType(config.bulletType);
  }

  public attack(target: Phaser.GameObjects.Sprite, time: number): boolean {
    const attacked = super.attack(target, time);
    if (attacked) {
      if (this.scene.anims.exists('ranged-attack')) {
        this.getSprite().play('ranged-attack');
      } else {
        console.warn('Animation ranged-attack not found');
      }
    }
    return attacked;
  }
}
