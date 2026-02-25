import { EnemyManager, GameStateManager } from '../../managers';
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
      const endPoint = enemy.getPath().getEndPoint();
      const dx = enemy.getSprite().x - endPoint.x;
      const dy = enemy.getSprite().y - endPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {
        gameStateController.reduceHp(enemy.getPower());
        gameStateManager.updateHp(gameStateController.getHp());

        enemy.getSprite().destroy();
        enemy.getHpText().destroy();

        enemyManager.getEnemies().splice(index, 1);
      }
    });
  }
}
