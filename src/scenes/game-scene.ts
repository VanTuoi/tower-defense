import Phaser from 'phaser';
import { enemyConfigs, level1Config } from '../config/index';
import {
  AttackController,
  BulletCollisionController,
  EnemyEndChecker,
  GameEndController,
  InputHandler
} from '../controller';
import {
  BulletManager,
  EnemyManager,
  FpsManager,
  GameStateManager,
  UIManager,
  UnitManager
} from '../manager';
import { getTotalEnemiesFromLevel } from '../utils';
import { MapView } from '../view';

export class GameScene extends Phaser.Scene {
  private gameHeight!: number;
  private gameWidth!: number;

  private uiManager!: UIManager;
  private fpsManager!: FpsManager;
  private gameStateManager!: GameStateManager;

  private enemyManager!: EnemyManager;
  private unitManager!: UnitManager;
  private bulletManager!: BulletManager;

  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;

    const totalEnemies = getTotalEnemiesFromLevel(level1Config);

    this.gameStateManager = new GameStateManager({
      hp: level1Config.initialHp,
      money: level1Config.initialMoney,
      targetKills: totalEnemies
    });

    this.unitManager = new UnitManager(this);

    this.enemyManager = new EnemyManager({
      scene: this,
      baseEnemyConfig: enemyConfigs,
      levelConfig: level1Config,
      onWaveStart: (waveIndex: number) => {
        const allowed = level1Config.waves[waveIndex].allowedUnits;
        if (allowed) {
          this.unitManager.setAllowedUnits(allowed);
        }
      }
    });

    this.enemyManager.startFirstWave();

    const firstWave = level1Config.waves[0];
    this.unitManager.setAllowedUnits(firstWave.allowedUnits);

    this.bulletManager = new BulletManager(this);
    this.fpsManager = new FpsManager(this);
    this.uiManager = new UIManager(
      this,
      this.gameStateManager.getMoney(),
      this.gameStateManager.getHp()
    );
  }

  create() {
    MapView.drawMapBorders(this, this.gameWidth, this.gameHeight);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      InputHandler.handlePointerDown(
        pointer,
        this.unitManager,
        this.gameStateManager,
        this.uiManager
      );
    });
  }

  update(time: number, delta: number) {
    this.fpsManager.update();
    const enemies = this.enemyManager.update(time, delta);
    this.unitManager.update(time);

    AttackController.handle({
      unitManager: this.unitManager,
      bulletManager: this.bulletManager,
      enemies,
      time,
      scene: this
    });

    this.bulletManager.update(delta);

    BulletCollisionController.handle({
      bulletManager: this.bulletManager,
      enemyManager: this.enemyManager,
      gameStateManager: this.gameStateManager,
      uiManager: this.uiManager
    });

    EnemyEndChecker.handle({
      enemyManager: this.enemyManager,
      gameStateManager: this.gameStateManager,
      uiManager: this.uiManager,
      gameHeight: this.gameHeight
    });

    GameEndController.check({
      scene: this,
      gameStateManager: this.gameStateManager,
      enemyManager: this.enemyManager
    });
  }
}
