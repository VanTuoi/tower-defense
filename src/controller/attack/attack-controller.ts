import { ProjectileManager, UnitManager } from '../../manager';
import { BaseEnemy } from '../../objects';
import { UnitAttackController } from './unit-attack-controller';

interface AttackControllerProps {
  unitManager: UnitManager;
  projectileManager: ProjectileManager;
  enemies: BaseEnemy[];
  time: number;
  scene: Phaser.Scene;
}

export class AttackController {
  static handle({
    unitManager,
    projectileManager,
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
      projectileManager.addBullet(bullet);
    });
  }
}
