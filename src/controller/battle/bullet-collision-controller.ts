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
      const dist = Phaser.Math.Distance.Between(
        bullet.from.x,
        bullet.from.y,
        bullet.to.x,
        bullet.to.y
      );

      if (dist < 32) {
        const killedEnemy = enemyManager.takeDamageOnEnemy(
          bullet.to,
          bullet.damage
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
