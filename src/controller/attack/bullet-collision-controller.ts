import {
  EnemyManager,
  GameStateManager,
  ProjectileManager
} from '../../manager';
import { GameStateController } from '../game-state-controller';

interface BulletCollisionProps {
  projectileManager: ProjectileManager;
  enemyManager: EnemyManager;
  gameStateController: GameStateController;
  gameStateManager: GameStateManager;
}

export class BulletCollisionController {
  static handle({
    projectileManager,
    enemyManager,
    gameStateController,
    gameStateManager
  }: BulletCollisionProps) {
    projectileManager.getBullets().forEach((bullet) => {
      const bulletSprite = bullet.getSprite();
      const target = bullet.getTarget();

      if (!target.active || !bulletSprite.active) return;

      const dist = Phaser.Math.Distance.Between(
        bulletSprite.x,
        bulletSprite.y,
        target.x,
        target.y
      );

      if (dist < 32) {
        const killedEnemy = enemyManager.takeDamageOnEnemy(
          target,
          bullet.getDamage()
        );

        projectileManager.removeBullet(bullet);

        if (killedEnemy) {
          const gold = killedEnemy.getRewardGold();
          gameStateController.addMoney(gold);
          gameStateController.addKill();
          gameStateManager.updateMoney(gameStateController.getMoney());
        }
      }
    });
  }
}
