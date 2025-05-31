import Phaser from 'phaser';
import { CONST } from './const/const';
import {
  BootScene,
  GameOverScene,
  GameScene,
  LevelSelectionScene,
  MainMenuScene,
  WinScene
} from './scenes';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Tower Defense',
  url: '',
  version: '1.0.0',
  width: CONST.GAME_WIDTH,
  height: CONST.GAME_HEIGHT,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [
    BootScene,
    MainMenuScene,
    GameScene,
    WinScene,
    GameOverScene,
    LevelSelectionScene
  ],
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
