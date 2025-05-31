import { ProjectileStats } from '../interfaces';

export const ProjectileConfig: Record<string, ProjectileStats> = {
  basic: {
    texture: 'basicBullet',
    speed: 300,
    sound: 'shoot',
    displayWidth: 6,
    displayHeight: 6,
    scale: 0.2
  },
  explosive: {
    texture: 'explosiveBullet',
    speed: 250,
    sound: 'shoot',
    displayWidth: 16,
    displayHeight: 16,
    scale: 0.5
  },
  melee: {
    texture: 'meleeBullet',
    speed: 200,
    sound: 'shoot',
    displayWidth: 16,
    displayHeight: 16,
    scale: 0.5
  }
};
