export class FpsDisplay {
  private fpsText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.fpsText = scene.add
      .text(10, 10, 'FPS: 0', {
        fontSize: '16px',
        color: '#00ff00',
        fontFamily: 'monospace'
      })
      .setScrollFactor(0)
      .setDepth(1000);
  }

  updateText(fps: number) {
    this.fpsText.setText('FPS: ' + fps.toFixed(1));
  }
}
