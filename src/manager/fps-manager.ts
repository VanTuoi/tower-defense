export class FpsManager {
  private scene: Phaser.Scene;
  private fpsText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fpsText = scene.add
      .text(5, 5, 'FPS: 0', {
        fontSize: '24px',
        color: '#00ff00',
        fontFamily: 'monospace'
      })
      .setScrollFactor(0)
      .setDepth(1000);
  }

  update() {
    const fps = this.scene.game.loop.actualFps;
    this.fpsText.setText('FPS: ' + fps.toFixed(1));
  }
}
