import { EnemyManager, GameStateManager, UIManager } from '../../manager';

interface EnemyEndCheckerProps {
  enemyManager: EnemyManager;
  gameStateManager: GameStateManager;
  uiManager: UIManager;
  gameHeight: number;
}

export class EnemyEndChecker {
  static handle({
    enemyManager,
    gameStateManager,
    uiManager,
    gameHeight
  }: EnemyEndCheckerProps) {
    enemyManager.getEnemies().forEach((enemy, index) => {
      if (enemy.getSprite().y >= gameHeight - 32) {
        gameStateManager.reduceHp(enemy.getPower());
        uiManager.updateHp(gameStateManager.getHp());

        enemy.getSprite().destroy();
        enemy.getHpText().destroy();

        enemyManager.getEnemies().splice(index, 1);
      }
    });
  }
}
