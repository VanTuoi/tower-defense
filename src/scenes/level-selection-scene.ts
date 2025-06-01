import { Colors, level1Config, level2Config } from '../config';
import { BackButton } from '../views';

export class LevelSelectionScene extends Phaser.Scene {
  private selectedIndex = 0;
  private buttons: Phaser.GameObjects.Container[] = [];
  private highlight!: Phaser.GameObjects.Graphics;
  private levelConfigs = [
    { label: 'Level 1', config: level1Config },
    { label: 'Level 2', config: level2Config }
  ];

  constructor() {
    super({ key: 'LevelSelectionScene' });
  }

  create() {
    const { centerX, width } = this.cameras.main;

    const header = this.rexUI.add.sizer({
      x: centerX,
      y: 40,
      width: width - 40,
      height: 80,
      orientation: 'x',
      space: { item: 10, left: 10, right: 10 }
    });

    const backButton = new BackButton(
      this,
      0,
      0,
      'BACK',
      140,
      50,
      'MainMenuScene'
    );
    this.add.existing(backButton);

    const title = this.add
      .bitmapText(0, 0, 'towerDefenseFont', 'Choose Level', 32)
      .setTint(Colors.text.title);

    header.add(backButton, 0, 'center', { right: 10 });
    header.add(title, 1, 'center');
    header.layout();

    const grid = this.rexUI.add.gridSizer({
      x: centerX,
      y: 300,
      column: Math.min(this.levelConfigs.length, 3),
      row: Math.ceil(
        this.levelConfigs.length / Math.min(this.levelConfigs.length, 3)
      ),
      columnProportions: 1,
      rowProportions: 1,
      space: {
        column: 60,
        row: 60
      },
      createCellContainerCallback: (scene, columnIndex, rowIndex) => {
        const index =
          rowIndex * Math.min(this.levelConfigs.length, 3) + columnIndex;
        const level = this.levelConfigs[index];
        if (!level) return undefined;

        const icon = this.add
          .image(0, 0, level.config.icon ?? 'default-icon')
          .setDisplaySize(128, 128)
          .setOrigin(0.5);

        const text = this.add
          .bitmapText(0, 80, 'towerDefenseFont', level.label, 20)
          .setOrigin(0.5)
          .setTint(Colors.button.text_white);

        const container = this.add.container(0, 0, [icon, text]);
        container.setSize(128, 150);
        container.setInteractive();

        container.on('pointerdown', () => {
          this.selectedIndex = index;
          this.updateHighlight();
          this.updateButtonScales();
          this.selectLevel();
        });

        container.setData('index', index);
        container.setScale(index === this.selectedIndex ? 1.1 : 1.0);

        this.buttons.push(container);
        return container;
      }
    });

    grid.layout();

    this.highlight = this.add.graphics();

    this.time.delayedCall(0, () => {
      this.updateHighlight();
    });

    this.input.keyboard.on('keydown-LEFT', () => {
      this.selectedIndex = Phaser.Math.Wrap(
        this.selectedIndex - 1,
        0,
        this.buttons.length
      );
      this.updateHighlight();
      this.updateButtonScales();
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
      this.selectedIndex = Phaser.Math.Wrap(
        this.selectedIndex + 1,
        0,
        this.buttons.length
      );
      this.updateHighlight();
      this.updateButtonScales();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.selectLevel();
    });
  }

  private updateHighlight() {
    this.highlight.clear();

    const selected = this.buttons[this.selectedIndex];
    if (!selected) {
      console.warn('Invalid selected button:', {
        selectedIndex: this.selectedIndex,
        buttonsLength: this.buttons.length,
        selected
      });
      return;
    }

    const scale = selected.scaleX;
    const width = selected.width * scale;
    const height = selected.height * scale;

    const worldPoint = selected.getWorldTransformMatrix().transformPoint(0, 0);

    const x = worldPoint.x - width / 2;
    const y = worldPoint.y - height / 2;

    const margin = 25;

    this.highlight.fillStyle(0x999999, 0.3);
    this.highlight.fillRoundedRect(
      x - margin,
      y - margin,
      width + margin * 2,
      height + margin * 2,
      12
    );
  }

  private updateButtonScales() {
    this.buttons.forEach((button, index) => {
      button.setScale(index === this.selectedIndex ? 1.1 : 1.0);
    });
  }

  private selectLevel() {
    const selected = this.levelConfigs[this.selectedIndex];
    if (selected) {
      this.scene.start('GameScene', { levelConfig: selected.config });
    }
  }
}
