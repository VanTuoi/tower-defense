export class UIButton extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.BitmapText;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    width: number = 200,
    height: number = 60,
    onClick?: () => void
  ) {
    super(scene, x, y);

    const padding = 8;

    this.background = scene.add.rectangle(0, 0, width, height, 0x3333ff);
    this.background.setStrokeStyle(4, 0xffffff);

    this.text = scene.add
      .bitmapText(0, 0, 'towerDefenseFont', label, 28)
      .setOrigin(0.5);

    this.add([this.background, this.text]);

    this.setSize(width + padding * 2, height + padding * 2);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      ),
      Phaser.Geom.Rectangle.Contains
    );

    scene.add.existing(this);

    this.on('pointerover', () => {
      this.background.setFillStyle(0x5555ff);
      this.setScale(1.05);
      this.text.setTint(0xffff00);
      scene.input.setDefaultCursor('pointer');
    });

    this.on('pointerout', () => {
      this.background.setFillStyle(0x3333ff);
      this.setScale(1);
      this.text.clearTint();
      scene.input.setDefaultCursor('default');
    });

    if (onClick) {
      this.on('pointerdown', onClick);
    }
  }
}
