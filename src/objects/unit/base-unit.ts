import Phaser from 'phaser';

export abstract class BaseUnit {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite;
  protected power: number = 10;
  protected attackSpeed: number = 2;
  protected range: number = 400;
  protected lastAttackTime: number = 0;
  protected rangeCircle: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.sprite = this.scene.add
      .sprite(x, y, 'enemy')
      .setOrigin(0.5)
      .setScale(1.5);

    this.rangeCircle = this.scene.add.graphics();
    this.updateRangeCircle(x, y);
  }

  public getSprite(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  public attack(target: Phaser.GameObjects.Sprite, time: number): boolean {
    if (time - this.lastAttackTime < 1000 / this.attackSpeed) return false;

    const distance = Phaser.Math.Distance.Between(
      this.sprite.x,
      this.sprite.y,
      target.x,
      target.y
    );

    if (distance <= this.range) {
      this.lastAttackTime = time;

      this.scene.sound.play('shoot', {
        detune: Phaser.Math.Between(-100, 100)
      });

      return true;
    }

    return false;
  }

  public getPower(): number {
    return this.power;
  }

  public getRangeCircle(): Phaser.GameObjects.Graphics {
    return this.rangeCircle;
  }

  public updateRangeCircle(x: number, y: number): void {
    this.rangeCircle.clear();
    this.rangeCircle.lineStyle(2, 0x00ff00, 0.5);
    this.rangeCircle.strokeCircle(x, y, this.range);
  }

  public setPosition(x: number, y: number): void {
    this.sprite.x = x;
    this.sprite.y = y;
    this.updateRangeCircle(x, y);
  }

  protected setPower(power: number): void {
    this.power = power;
  }

  protected setAttackSpeed(attackSpeed: number): void {
    this.attackSpeed = attackSpeed;
  }

  protected setRange(range: number): void {
    this.range = range;
    this.updateRangeCircle(this.sprite.x, this.sprite.y);
  }

  protected setTexture(textureKey: string, scale: number = 2): void {
    this.sprite.setTexture(textureKey).setScale(scale);
  }
}
