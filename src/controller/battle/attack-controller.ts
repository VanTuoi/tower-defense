import { Bullet } from '../../interfaces';
import { BulletManager, UnitManager } from '../../manager';
import { BaseEnemy } from '../../objects';
import { UnitAttackController } from './unit-attack-controller';

interface AttackControllerProps {
  unitManager: UnitManager;
  bulletManager: BulletManager;
  enemies: BaseEnemy[];
  time: number;
}

export class AttackController {
  static handle({
    unitManager,
    bulletManager,
    enemies,
    time
  }: AttackControllerProps) {
    const newBullets = UnitAttackController.handleAttack(
      unitManager,
      enemies,
      time
    );

    newBullets.forEach((bullet: Bullet) => {
      bulletManager.addBullet(
        bullet.from,
        bullet.to,
        bullet.damage,
        bullet.speed
      );
    });
  }
}
