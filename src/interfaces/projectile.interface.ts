export interface Bullet {
  from: Phaser.GameObjects.Sprite;
  to: Phaser.GameObjects.Sprite;
  damage: number;
  speed: number;
}

export type ProjectileStats = {
  texture: string;
  speed: number;
  sound: string;
  displayWidth?: number;
  displayHeight?: number;
  scale?: number;
};
