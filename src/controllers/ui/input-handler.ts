import { GameStateManager, UnitManager } from '../../managers';
import { GameStateController } from '../game-state-controller';

export class InputHandler {
  static handlePointerDown(
    pointer: Phaser.Input.Pointer,
    unitManager: UnitManager,
    gameStateController: GameStateController,
    gameStateManager: GameStateManager
  ) {
    if (gameStateController.spendMoney(50)) {
      unitManager.addUnit(pointer.x, pointer.y);
      gameStateManager.updateMoney(gameStateController.getMoney());
    }
  }
}
