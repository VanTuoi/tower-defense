import Phaser from 'phaser';
import { EnemyManager } from '../managers';
import { GameStateController } from './game-state-controller';

interface GameOverCheckProps {
  scene: Phaser.Scene;
  gameStateController: GameStateController;
  enemyManager: EnemyManager;
}

export class GameEndController {
  static check({
    scene,
    gameStateController,
    enemyManager
  }: GameOverCheckProps) {
    const isLose = gameStateController.getHp() <= 0;
    const isWinByKills = gameStateController.isWinByKill();
    const isAllWavesCompleted = enemyManager.isAllWavesCompleted();

    if (isLose) {
      scene.scene.start('GameOverScene');
    } else if (isWinByKills || isAllWavesCompleted) {
      const enemiesKilled = gameStateController.getEnemiesKilled();
      const targetKills = gameStateController.getTargetKills();

      scene.scene.start('WinScene', {
        enemiesKilled,
        targetKills
      });
    }
  }
}
