import Phaser from 'phaser';
import { ProjectileStats } from '../../interfaces';

export abstract class BaseProjectile {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite;
  protected target: Phaser.GameObjects.Sprite;
  protected damage: number;
  protected speed: number;
  protected isDestroyed: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Phaser.GameObjects.Sprite,
    damage: number = 0,
    speed: number = 0,
    displayWidth?: number,
    displayHeight?: number,
    scale: number = 0.5
  ) {
    this.scene = scene;
    this.target = target;
    this.damage = damage;
    this.speed = speed;

    this.sprite = this.scene.add.sprite(x, y, texture);

    if (this.scene.anims.exists(texture)) {
      this.sprite.anims.play(texture, true);
    }

    if (displayWidth !== undefined && displayHeight !== undefined) {
      this.sprite.setDisplaySize(displayWidth, displayHeight);
    } else {
      this.sprite.setScale(scale);
    }
  }

  abstract update(delta: number): void;

  public getSprite(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  public getTarget(): Phaser.GameObjects.Sprite {
    return this.target;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public isActive(): boolean {
    return !this.isDestroyed && this.sprite.active;
  }

  public isAlreadyDestroyed(): boolean {
    return this.isDestroyed;
  }

  public setDamage(damage: number): void {
    this.damage = damage;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public setTarget(target: Phaser.GameObjects.Sprite): void {
    this.target = target;
  }

  public setTexture(texture: string): void {
    this.sprite.setTexture(texture);
  }

  public setDisplaySize(width?: number, height?: number): void {
    if (width !== undefined && height !== undefined) {
      this.sprite.setDisplaySize(width, height);
    }
  }

  public setScale(scale: number): void {
    this.sprite.setScale(scale);
  }

  public destroy(): void {
    if (!this.isDestroyed) {
      this.sprite.destroy();
      this.isDestroyed = true;
    }
  }

  public applyConfig(config: ProjectileStats, power: number): void {
    this.setTexture(config.texture);
    this.setDisplaySize(config.displayWidth, config.displayHeight);
    this.setScale(config.scale ?? 1);
    this.setSpeed(config.speed);
    this.setDamage(power);
  }
}
