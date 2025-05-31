import Phaser from 'phaser';
import { Colors } from './config';
import { CONST } from './const/const';
import {
  BootScene,
  GameOverScene,
  GameScene,
  HeaderScene,
  LevelSelectionScene,
  MainMenuScene,
  WinScene
} from './scenes';

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

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
    LevelSelectionScene,
    HeaderScene
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
  backgroundColor: Colors.background.main,
  render: { pixelArt: false, antialias: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  }
};
