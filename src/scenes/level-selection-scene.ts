import { level1Config, level2Config } from '../config';

export class LevelSelectionScene extends Phaser.Scene {
  private cursor!: Phaser.GameObjects.Image;
  private selectedIndex = 0;
  private options: Phaser.GameObjects.BitmapText[] = [];
  private cursorPaddingY = 12;

  constructor() {
    super({ key: 'LevelSelectionScene' });
  }

  create() {
    this.add.bitmapText(50, 50, 'towerDefenseFont', 'Choose Your Level', 32);

    this.options.push(
      this.add.bitmapText(100, 150, 'towerDefenseFont', 'Level 1', 24),
      this.add.bitmapText(100, 220, 'towerDefenseFont', 'Level 2', 24)
    );

    this.cursor = this.add.image(
      70,
      this.options[0].y + this.cursorPaddingY,
      'cursorArrow'
    );
    this.cursor.setOrigin(0.5, 0.5);
    this.cursor.setDisplaySize(32, 32);

    this.input.keyboard.on('keydown-UP', () => {
      this.selectedIndex = Phaser.Math.Clamp(
        this.selectedIndex - 1,
        0,
        this.options.length - 1
      );
      this.updateCursor();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.selectedIndex = Phaser.Math.Clamp(
        this.selectedIndex + 1,
        0,
        this.options.length - 1
      );
      this.updateCursor();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.selectLevel();
    });

    this.options.forEach((option, index) => {
      option.setInteractive();
      option.on('pointerdown', () => {
        this.selectedIndex = index;
        this.updateCursor();
        this.selectLevel();
      });
    });
  }

  private updateCursor() {
    const targetOption = this.options[this.selectedIndex];
    this.cursor.y = targetOption.y + this.cursorPaddingY;
  }

  private selectLevel() {
    if (this.selectedIndex === 0) {
      this.scene.start('GameScene', { levelConfig: level1Config });
    } else if (this.selectedIndex === 1) {
      this.scene.start('GameScene', { levelConfig: level2Config });
    }
  }
}
