import { GameStateManager, UIManager, UnitManager } from '../../manager';

export class InputHandler {
  static handlePointerDown(
    pointer: Phaser.Input.Pointer,
    unitManager: UnitManager,
    gameStateManager: GameStateManager,
    uiManager: UIManager
  ) {
    if (gameStateManager.spendMoney(50)) {
      unitManager.addUnit(pointer.x, pointer.y);
      uiManager.updateMoney(gameStateManager.getMoney());
    }
  }
}
