import {
  BulletManager,
  EnemyManager,
  GameStateManager,
  UIManager
} from '../../manager';

interface BulletCollisionProps {
  bulletManager: BulletManager;
  enemyManager: EnemyManager;
  gameStateManager: GameStateManager;
  uiManager: UIManager;
}

export class BulletCollisionController {
  static handle({
    bulletManager,
    enemyManager,
    gameStateManager,
    uiManager
  }: BulletCollisionProps) {
    bulletManager.getBullets().forEach((bullet) => {
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

        bulletManager.removeBullet(bullet);

        if (killedEnemy) {
          const gold = killedEnemy.getRewardGold();
          gameStateManager.addMoney(gold);
          gameStateManager.addKill();
          uiManager.updateMoney(gameStateManager.getMoney());
        }
      }
    });
  }
}
