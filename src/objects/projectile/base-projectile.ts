import Phaser from 'phaser';

export abstract class BaseProjectile {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite;
  protected target: Phaser.GameObjects.Sprite;
  protected damage: number;
  protected speed: number;
  protected isDestroyed: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Phaser.GameObjects.Sprite,
    damage: number,
    speed: number
  ) {
    this.scene = scene;
    this.target = target;
    this.damage = damage;
    this.speed = speed;

    this.sprite = this.scene.add.sprite(x, y, texture).setScale(0.5);
  }

  abstract update(delta: number): void;

  getSprite() {
    return this.sprite;
  }

  getTarget() {
    return this.target;
  }

  getDamage() {
    return this.damage;
  }

  destroy() {
    if (!this.isDestroyed) {
      this.sprite.destroy();
      this.isDestroyed = true;
    }
  }

  isActive(): boolean {
    return !this.isDestroyed && this.sprite.active;
  }
}
