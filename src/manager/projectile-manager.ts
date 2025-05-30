import Phaser from 'phaser';
import { BaseProjectile } from '../objects';

export class ProjectileManager {
  private scene: Phaser.Scene;
  private bullets: BaseProjectile[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  addBullet(bullet: BaseProjectile) {
    this.bullets.push(bullet);
  }

  update(delta: number): BaseProjectile[] {
    this.bullets = this.bullets.filter((bullet) => {
      if (!bullet.isActive()) {
        bullet.destroy();
        return false;
      }

      bullet.update(delta);
      return true;
    });

    return this.bullets;
  }

  getBullets() {
    return this.bullets;
  }

  removeBullet(bulletToRemove: BaseProjectile) {
    this.bullets = this.bullets.filter((bullet) => bullet !== bulletToRemove);
    bulletToRemove.destroy();
  }
}
