import { Bullet } from '../../interfaces';
import { UnitManager } from '../../manager';
import { BaseEnemy } from '../../objects';

export class UnitAttackController {
  static handleAttack(
    unitManager: UnitManager,
    enemies: BaseEnemy[],
    time: number
  ): {
    from: Phaser.GameObjects.Sprite;
    to: Phaser.GameObjects.Sprite;
    damage: number;
    speed: number;
  }[] {
    const bullets: Bullet[] = [];

    unitManager.getUnits().forEach((unit) => {
      enemies.forEach((enemy) => {
        const enemySprite = enemy.getSprite();
        if (unit.attack(enemySprite, time)) {
          bullets.push({
            from: unit.getSprite(),
            to: enemySprite,
            damage: unit.getPower(),
            speed: 600
          });
        }
      });
    });

    return bullets;
  }
}
