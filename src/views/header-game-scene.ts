import { BaseButton } from './base-button';

export class HeaderGameScene {
  private scene: Phaser.Scene;
  private isPaused = false;
  private pauseButton!: BaseButton;
  private backButton!: BaseButton;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createHeader(onPauseToggle: () => void) {
    const { width } = this.scene.scale;

    this.pauseButton = new BaseButton(
      this.scene,
      width - 120,
      35,
      'Pause',
      220,
      50,
      () => {
        this.isPaused = !this.isPaused;
        this.pauseButton['text'].setText(this.isPaused ? 'Continue' : 'Pause');
        onPauseToggle();
      }
    );

    this.backButton = new BaseButton(
      this.scene,
      width - 350,
      35,
      'Back',
      220,
      50,
      () => {
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('LevelSelectionScene');
      }
    );
  }
}
