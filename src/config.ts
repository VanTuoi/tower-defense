import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Tower Defense',
  version: '1.0.0',
  type: Phaser.AUTO,
  backgroundColor: '#1e1e1e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    parent: 'game'
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [GameScene]
};
