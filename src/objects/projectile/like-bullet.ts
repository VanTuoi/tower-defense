import Phaser from 'phaser';
import { BaseProjectile } from './base-projectile';

export class LikeBullet extends BaseProjectile {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    target: Phaser.GameObjects.Sprite
  ) {
    super(scene, x, y, 'like-projectile', target, 0, 0);
  }

  update(delta: number): void {
    if (!this.target.active || !this.sprite.active) {
      this.destroy();
      return;
    }

    const dx = this.target.x - this.sprite.x;
    const dy = this.target.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 32) {
      this.destroy();
      return;
    }

    const velX = (dx / dist) * this.speed * (delta / 1000);
    const velY = (dy / dist) * this.speed * (delta / 1000);

    this.sprite.x += velX;
    this.sprite.y += velY;

    this.sprite.rotation = Math.atan2(dy, dx);
  }
}
