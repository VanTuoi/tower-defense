import Phaser from 'phaser';
import { EnemyManager, GameStateManager } from '../../manager';

interface GameOverCheckProps {
  scene: Phaser.Scene;
  gameStateManager: GameStateManager;
  enemyManager: EnemyManager;
}

export class GameEndController {
  static check({ scene, gameStateManager, enemyManager }: GameOverCheckProps) {
    const isLose = gameStateManager.getHp() <= 0;
    const isWinByKills = gameStateManager.isWinByKill();
    const isAllWavesCompleted = enemyManager.isAllWavesCompleted();

    console.log('GameEndController check:', {
      isLose,
      isWinByKills,
      isAllWavesCompleted
    });

    if (isLose) {
      scene.scene.start('GameOverScene');
    } else if (isWinByKills || isAllWavesCompleted) {
      const enemiesKilled = gameStateManager.getEnemiesKilled();
      const targetKills = gameStateManager.getTargetKills();

      scene.scene.start('WinScene', {
        enemiesKilled,
        targetKills
      });
    }
  }
}
