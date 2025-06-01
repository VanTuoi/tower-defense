import { enemyConfigs } from '../config';
import { LevelConfig } from '../interfaces';
import {
  EnemyManager,
  FpsManager,
  GameStateManager,
  ProjectileManager,
  UnitManager
} from '../managers';
import { GameScene } from '../scenes';
import { getTotalEnemiesFromLevel } from '../utils';
import { UnitSelectionView } from '../views';
import { GameStateController } from './game-state-controller';
import { UnitSelectionController } from './unit-selection-controller';

export class LevelController {
  constructor(
    private scene: GameScene,
    private config: LevelConfig
  ) {}

  public setup() {
    const { initialHp, initialMoney, waves } = this.config;
    const gameHeight = this.scene.sys.canvas.height;
    const gameWidth = this.scene.sys.canvas.width;

    const gameStateController = new GameStateController({
      hp: initialHp,
      money: initialMoney,
      targetKills: getTotalEnemiesFromLevel(this.config)
    });

    const unitManager = new UnitManager(this.scene);

    const gameStateManager = new GameStateManager(
      this.scene,
      initialMoney,
      initialHp
    );

    const unitSelectionController = new UnitSelectionController(
      unitManager,
      gameStateController,
      gameStateManager
    );

    const unitSelectionView = new UnitSelectionView(
      this.scene,
      unitSelectionController,
      gameHeight
    );

    const enemyManager = new EnemyManager({
      scene: this.scene,
      baseEnemyConfig: enemyConfigs,
      levelConfig: this.config,
      onWaveStart: (waveIndex: number) => {
        const allowed = this.config.waves[waveIndex].allowedUnits;
        if (allowed) {
          unitManager.setAllowedUnits(allowed);
        }
      }
    });

    const projectileManager = new ProjectileManager(this.scene);
    const fpsManager = new FpsManager(this.scene);

    return {
      gameStateController,
      unitManager,
      gameStateManager,
      unitSelectionController,
      unitSelectionView,
      enemyManager,
      projectileManager,
      fpsManager
    };
  }
}
