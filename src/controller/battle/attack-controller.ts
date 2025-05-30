import { BulletManager, UnitManager } from '../../manager';
import { BaseEnemy } from '../../objects';
import { UnitAttackController } from './unit-attack-controller';

interface AttackControllerProps {
  unitManager: UnitManager;
  bulletManager: BulletManager;
  enemies: BaseEnemy[];
  time: number;
  scene: Phaser.Scene;
}

export class AttackController {
  static handle({
    unitManager,
    bulletManager,
    enemies,
    time,
    scene
  }: AttackControllerProps) {
    const newBullets = UnitAttackController.handleAttack(
      unitManager,
      enemies,
      time,
      scene
    );

    newBullets.forEach((bullet) => {
      bulletManager.addBullet(bullet);
    });
  }
}
