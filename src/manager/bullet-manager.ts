import Phaser from 'phaser';
import { Bullet } from '../interfaces';

export class BulletManager {
  private scene: Phaser.Scene;
  private bullets: Bullet[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  addBullet(
    from: Phaser.GameObjects.Sprite,
    to: Phaser.GameObjects.Sprite,
    damage: number,
    speed: number
  ) {
    const bulletSprite = this.scene.add
      .sprite(from.x, from.y, 'bullet')
      .setScale(0.5);

    const bullet: Bullet = {
      from: bulletSprite,
      to,
      damage,
      speed
    };

    this.bullets.push(bullet);
  }

  update(delta: number): Bullet[] {
    this.bullets = this.bullets.filter((bullet) => {
      const { from, to, speed } = bullet;

      if (!to.active || !from.active) {
        from.destroy();
        return false;
      }

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const velX = (dx / dist) * speed * (delta / 1000);
      const velY = (dy / dist) * speed * (delta / 1000);

      from.x += velX;
      from.y += velY;

      return true;
    });

    return this.bullets;
  }

  getBullets() {
    return this.bullets;
  }

  removeBullet(bulletToRemove: Bullet) {
    this.bullets = this.bullets.filter((bullet) => bullet !== bulletToRemove);
    bulletToRemove.from.destroy();
  }
}
