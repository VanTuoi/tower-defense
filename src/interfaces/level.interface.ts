import { WaveConfig } from './wave.interface';

export interface LevelConfig {
  initialHp: number;
  initialMoney: number;
  waves: WaveConfig[];
  background?: string;
  icon?: string;
}
