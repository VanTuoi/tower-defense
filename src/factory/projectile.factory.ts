import { ProjectileConfig } from '../config';
import {
  BaseProjectile,
  BaseUnit,
  BasicBullet,
  ExplosiveBullet
} from '../objects';

export class BulletFactory {
  static create(
    scene: Phaser.Scene,
    unit: BaseUnit,
    target: Phaser.GameObjects.Sprite
  ): BaseProjectile {
    const type = unit.getBulletType();
    const config = ProjectileConfig[type] || ProjectileConfig.basic;

    if (!ProjectileConfig[type]) {
      console.warn(
        `Projectile type "${type}" not found. Using "basic" as fallback.`
      );
    }

    scene.sound.play(config.sound, {
      detune: Phaser.Math.Between(-100, 100)
    });

    const [x, y] = [unit.getSprite().x, unit.getSprite().y];

    let bullet: BaseProjectile;

    switch (type) {
      case 'explosive':
        bullet = new ExplosiveBullet(scene, x, y, target);
        break;
      case 'basic':
      case 'melee':
      default:
        bullet = new BasicBullet(scene, x, y, target);
    }

    bullet.applyConfig(config, unit.getPower());
    return bullet;
  }
}
