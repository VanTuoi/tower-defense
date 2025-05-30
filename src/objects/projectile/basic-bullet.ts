import { BaseProjectile } from './base-projectile';

export class BasicBullet extends BaseProjectile {
  update(delta: number): void {
    if (!this.target.active || !this.sprite.active) {
      this.destroy();
      return;
    }

    const dx = this.target.x - this.sprite.x;
    const dy = this.target.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 32) return;

    const velX = (dx / dist) * this.speed * (delta / 1000);
    const velY = (dy / dist) * this.speed * (delta / 1000);

    this.sprite.x += velX;
    this.sprite.y += velY;
  }
}
