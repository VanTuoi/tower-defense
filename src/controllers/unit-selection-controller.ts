import { UnitConfig } from '../config';
import { GameStateManager, UnitManager } from '../managers';
import { GameStateController } from './game-state-controller';

export class UnitSelectionController {
  private selectedUnit: string | null = null;

  constructor(
    private unitManager: UnitManager,
    private gameStateController: GameStateController,
    private gameStateManager: GameStateManager
  ) {}

  selectUnit(unitType: string) {
    this.selectedUnit = unitType;
  }

  handlePlacement(x: number, y: number) {
    if (!this.selectedUnit) return;

    const cost = UnitConfig[this.selectedUnit]?.cost ?? 0;

    if (this.gameStateController.getMoney() >= cost) {
      if (this.unitManager.addUnit(x, y, this.selectedUnit)) {
        this.gameStateController.spendMoney(cost);
        this.gameStateManager.updateMoney(this.gameStateController.getMoney());
      } else {
        console.warn('Failed to add unit');
      }
    } else {
      console.log('Not enough money');
    }
  }

  getSelectedUnit() {
    return this.selectedUnit;
  }
}
