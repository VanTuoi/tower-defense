import { BaseProjectile } from './base-projectile';

export class ExplosiveBullet extends BaseProjectile {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    target: Phaser.GameObjects.Sprite
  ) {
    super(scene, x, y, 'basicBullet', target, 0, 0);
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
      this.explode();
      this.destroy();
      return;
    }

    const velX = (dx / dist) * this.speed * (delta / 1000);
    const velY = (dy / dist) * this.speed * (delta / 1000);

    this.sprite.x += velX;
    this.sprite.y += velY;
  }

  private explode(): void {
    const explosion = this.scene.add.circle(
      this.sprite.x,
      this.sprite.y,
      20,
      0xff0000,
      0.5
    );
    this.scene.tweens.add({
      targets: explosion,
      alpha: 0,
      scale: 2,
      duration: 300,
      onComplete: () => explosion.destroy()
    });
  }
}
