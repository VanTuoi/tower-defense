import { ProjectileStats } from '../interfaces';

export const ProjectileConfig: Record<string, ProjectileStats> = {
  basic: {
    texture: 'fire-projectile-anim',
    speed: 350,
    sound: 'fire',
    displayWidth: 6,
    displayHeight: 6,
    scale: 0.1
  },
  explosive: {
    texture: 'water-projectile-anim',
    speed: 350,
    sound: 'water',
    displayWidth: 16,
    displayHeight: 16,
    scale: 0.05
  },
  like: {
    texture: 'like-projectile',
    speed: 300,
    sound: 'like',
    displayWidth: 16,
    displayHeight: 16,
    scale: 0.075
  }
};
