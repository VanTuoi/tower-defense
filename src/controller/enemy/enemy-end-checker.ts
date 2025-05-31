import { EnemyManager, GameStateManager } from '../../manager';
import { GameStateController } from '../game-state-controller';

interface EnemyEndCheckerProps {
  enemyManager: EnemyManager;
  gameStateController: GameStateController;
  gameStateManager: GameStateManager;
  gameHeight: number;
}

export class EnemyEndChecker {
  static handle({
    enemyManager,
    gameStateController,
    gameStateManager,
    gameHeight
  }: EnemyEndCheckerProps) {
    enemyManager.getEnemies().forEach((enemy, index) => {
      if (enemy.getSprite().y >= gameHeight - 32) {
        gameStateController.reduceHp(enemy.getPower());
        gameStateManager.updateHp(gameStateController.getHp());

        enemy.getSprite().destroy();
        enemy.getHpText().destroy();

        enemyManager.getEnemies().splice(index, 1);
      }
    });
  }
}
