import Phaser from 'phaser';
import {
  AttackController,
  BulletCollisionController,
  EnemyEndChecker,
  GameEndController,
  GameStateController,
  LevelController,
  UnitSelectionController
} from '../controller';

import { LevelConfig } from '../interfaces';
import {
  EnemyManager,
  FpsManager,
  GameStateManager,
  ProjectileManager,
  UnitManager
} from '../manager';
import { MapView, UnitSelectionView } from '../view';

export class GameScene extends Phaser.Scene {
  private gameHeight: number;
  private gameWidth: number;

  private unitSelectionView!: UnitSelectionView;

  private fpsManager!: FpsManager;
  private enemyManager!: EnemyManager;
  private unitManager!: UnitManager;
  private projectileManager!: ProjectileManager;
  private gameStateManager!: GameStateManager;

  private gameStateController!: GameStateController;
  private unitSelectionController!: UnitSelectionController;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: { levelConfig: LevelConfig }) {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    const levelController = new LevelController(this, data.levelConfig);

    const {
      gameStateController,
      unitManager,
      gameStateManager,
      unitSelectionController,
      unitSelectionView,
      enemyManager,
      projectileManager,
      fpsManager
    } = levelController.setup();

    this.gameStateController = gameStateController;
    this.unitManager = unitManager;
    this.gameStateManager = gameStateManager;
    this.unitSelectionController = unitSelectionController;
    this.unitSelectionView = unitSelectionView;
    this.enemyManager = enemyManager;
    this.projectileManager = projectileManager;
    this.fpsManager = fpsManager;

    enemyManager.startFirstWave();
  }

  create() {
    MapView.drawMapBorders(this, this.gameWidth, this.gameHeight, 100);

    this.unitSelectionView.render();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const isInSelectionArea = pointer.y >= this.gameHeight - 100;
      if (!isInSelectionArea) {
        this.unitSelectionController.handlePlacement(pointer.x, pointer.y);
      }
    });
  }

  update(time: number, delta: number) {
    this.fpsManager.update();
    const enemies = this.enemyManager.update(time, delta);
    this.unitManager.update(time);

    AttackController.handle({
      unitManager: this.unitManager,
      projectileManager: this.projectileManager,
      enemies,
      time,
      scene: this
    });

    this.projectileManager.update(delta);

    BulletCollisionController.handle({
      projectileManager: this.projectileManager,
      enemyManager: this.enemyManager,
      gameStateController: this.gameStateController,
      gameStateManager: this.gameStateManager
    });

    EnemyEndChecker.handle({
      enemyManager: this.enemyManager,
      gameStateController: this.gameStateController,
      gameStateManager: this.gameStateManager,
      gameHeight: this.gameHeight - 100
    });

    GameEndController.check({
      scene: this,
      gameStateController: this.gameStateController,
      enemyManager: this.enemyManager
    });
  }
}
