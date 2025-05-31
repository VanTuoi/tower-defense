import Phaser from 'phaser';
import { UnitStats } from '../../interfaces';

export abstract class BaseUnit {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite;
  protected cost: number = 10;
  protected power: number = 10;
  protected attackSpeed: number = 2;
  protected range: number = 400;
  protected lastAttackTime: number = 0;
  protected rangeCircle: Phaser.GameObjects.Graphics;
  protected bulletType: string = 'basic';
  protected idleTextureKey?: string;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.sprite = this.scene.add
      .sprite(x, y, 'enemy')
      .setOrigin(0.5)
      .setScale(1);

    this.rangeCircle = this.scene.add.graphics();
    this.updateRangeCircle(x, y);
  }

  public getSprite(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  public getPower(): number {
    return this.power;
  }

  public getCost(): number {
    return this.cost;
  }

  public getBulletType(): string {
    return this.bulletType;
  }

  public getRangeCircle(): Phaser.GameObjects.Graphics {
    return this.rangeCircle;
  }

  public setCost(cost: number): void {
    this.cost = cost;
  }

  public setPower(power: number): void {
    this.power = power;
  }

  public setAttackSpeed(attackSpeed: number): void {
    this.attackSpeed = attackSpeed;
  }

  public setRange(range: number): void {
    this.range = range;
    this.updateRangeCircle(this.sprite.x, this.sprite.y);
  }

  public setBulletType(type: string): void {
    this.bulletType = type;
  }

  public setTexture(textureKey: string): void {
    this.sprite.setTexture(textureKey);
  }

  public setDisplaySize(width?: number, height?: number): void {
    if (width && height) {
      this.sprite.setDisplaySize(width, height);
    }
  }

  public setPosition(x: number, y: number): void {
    this.sprite.x = x;
    this.sprite.y = y;
    this.updateRangeCircle(x, y);
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
      return true;
    }

    return false;
  }

  public updateRangeCircle(x: number, y: number): void {
    this.rangeCircle.clear();
    this.rangeCircle.lineStyle(2, 0x00ff00, 0.2);
    this.rangeCircle.strokeCircle(x, y, this.range);
  }

  public applyConfig(config: UnitStats): void {
    this.setPower(config.power);
    this.setAttackSpeed(config.attackSpeed);
    this.setRange(config.range);
    this.setTexture(config.idleTextureKey);
    this.setCost(config.cost);
    this.setBulletType(config.bulletType);

    if (config.displayWidth && config.displayHeight) {
      this.setDisplaySize(config.displayWidth, config.displayHeight);
    }
  }
}
