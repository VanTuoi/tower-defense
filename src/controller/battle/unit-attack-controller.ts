import Phaser from 'phaser';
import { UnitManager } from '../../manager';
import { BaseEnemy, BasicBullet } from '../../objects';

export class UnitAttackController {
  static handleAttack(
    unitManager: UnitManager,
    enemies: BaseEnemy[],
    time: number,
    scene: Phaser.Scene
  ): BasicBullet[] {
    const bullets: BasicBullet[] = [];

    unitManager.getUnits().forEach((unit) => {
      enemies.forEach((enemy) => {
        const enemySprite = enemy.getSprite();
        if (unit.attack(enemySprite, time)) {
          const bullet = new BasicBullet(
            scene,
            unit.getSprite().x,
            unit.getSprite().y,
            'bullet',
            enemySprite,
            unit.getPower(),
            600
          );

          bullets.push(bullet);
        }
      });
    });

    return bullets;
  }
}
