import Phaser from 'phaser';
import { EnemyConfig } from '../../interfaces';

export abstract class BaseEnemy {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite;

  protected speed: number;
  protected hp: number;
  protected hpText: Phaser.GameObjects.BitmapText;
  protected config: EnemyConfig;
  protected rewardGold: number;
  protected path?: Phaser.Curves.Path;
  protected follower?: { t: number; vec: Phaser.Math.Vector2 };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: EnemyConfig,
    path?: Phaser.Curves.Path
  ) {
    this.scene = scene;
    if (path) {
      this.path = path;
      this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    }

    this.config = {
      height: 128,
      width: 128,
      hpTextOffsetY: 30,
      hpTextFontSize: 20,
      ...config
    };

    this.sprite = scene.add.sprite(x, y, config.texture).setOrigin(0.5);

    this.sprite.setDisplaySize(this.config.width!, this.config.height!);

    this.rewardGold = config.rewardGold ?? 0;
    this.hp = this.config.hp;
    this.speed = this.config.speed;

    this.hpText = scene.add
      .bitmapText(
        x,
        y - this.config.hpTextOffsetY!,
        'towerDefenseFont',
        this.hp.toString(),
        this.config.hpTextFontSize!
      )
      .setOrigin(0.5);
  }

  public move(delta: number): void {
    if (this.path && this.follower) {
      this.follower.t += (this.speed * delta) / 100000; // điều chỉnh tốc độ phù hợp
      this.path.getPoint(this.follower.t, this.follower.vec);

      if (this.follower.t >= 1) {
        this.sprite.y = this.scene.sys.canvas.height + 10; // vượt màn hình để bị xóa
      } else {
        this.sprite.setPosition(this.follower.vec.x, this.follower.vec.y);
        this.hpText.setPosition(
          this.follower.vec.x,
          this.follower.vec.y - this.config.hpTextOffsetY!
        );
      }
    } else {
      // fallback nếu không có path
      this.sprite.y += (this.speed * delta) / 1000;
      this.hpText.y = this.sprite.y - this.config.hpTextOffsetY!;
      this.hpText.x = this.sprite.x;
    }
  }

  public takeDamage(damage: number): boolean {
    this.hp -= damage;
    this.hpText.setText(this.hp.toString());
    if (this.hp <= 0) {
      this.destroy();
      return true;
    }
    return false;
  }

  public destroy(): void {
    this.sprite.destroy();
    this.hpText.destroy();
  }

  public getSprite(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  public getHpText(): Phaser.GameObjects.BitmapText {
    return this.hpText;
  }

  public getPower(): number {
    return this.config.power;
  }

  public getRewardGold(): number {
    return this.rewardGold;
  }

  public getPath(): Phaser.Curves.Path {
    return this.path;
  }

  public isOffScreen(height: number): boolean {
    return this.sprite.y > height;
  }

  public resizeSprite(): void {
    this.sprite.setDisplaySize(this.config.width!, this.config.height!);
  }
}
