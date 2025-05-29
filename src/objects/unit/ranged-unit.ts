import Phaser from 'phaser';
import { BaseUnit } from './base-unit';

export class RangedUnit extends BaseUnit {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.setSpriteAndStats();
  }

  private setSpriteAndStats(): void {
    this.setTexture('rangedUnit', 2);

    this.sprite.setFrame(0);
    this.sprite.setScale(1);

    this.setPower(15);
    this.setAttackSpeed(4);
    this.setRange(300);
  }

  public attack(target: Phaser.GameObjects.Sprite, time: number): boolean {
    const attacked = super.attack(target, time);
    if (attacked) {
      if (this.scene.anims.exists('ranged-attack')) {
        this.sprite.play('ranged-attack');
      } else {
        console.warn('Animation ranged-attack not found');
      }
    }
    return attacked;
  }
}
