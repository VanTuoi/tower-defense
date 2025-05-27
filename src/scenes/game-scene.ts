export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {}

  create(): void {
    this.add.text(10, 10, 'Tower Defense!', {
      fontSize: '24px',
      color: '#ffffff'
    });
  }

  update(time: number, delta: number): void {}
}
