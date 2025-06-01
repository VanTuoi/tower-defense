import Phaser from 'phaser';
import { BulletFactory } from '../../factories';
import { UnitManager } from '../../managers';
import { BaseEnemy, BaseProjectile } from '../../objects';

export class UnitAttackController {
  static handleAttack(
    unitManager: UnitManager,
    enemies: BaseEnemy[],
    time: number,
    scene: Phaser.Scene
  ): BaseProjectile[] {
    const bullets: BaseProjectile[] = [];

    unitManager.getUnits().forEach((unit) => {
      enemies.forEach((enemy) => {
        const enemySprite = enemy.getSprite();
        if (unit.attack(enemySprite, time)) {
          const bullet = BulletFactory.create(scene, unit, enemySprite);
          bullets.push(bullet);
        }
      });
    });

    return bullets;
  }
}
