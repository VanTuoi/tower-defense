import { FpsDisplay } from '../objects';

export class FpsManager {
  private scene: Phaser.Scene;
  private fpsDisplay: FpsDisplay;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fpsDisplay = new FpsDisplay(scene);
  }

  update() {
    const fps = this.scene.game.loop.actualFps;
    this.fpsDisplay.updateText(fps);
  }
}
