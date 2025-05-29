import { CONST } from '../const/const';

export class MapView {
  static drawMapBorders(
    scene: Phaser.Scene,
    gameWidth: number,
    gameHeight: number
  ) {
    const cols = Math.ceil(gameWidth / CONST.FIELD_SIZE);
    const rows = Math.ceil(gameHeight / CONST.FIELD_SIZE);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
          scene.add
            .sprite(x * CONST.FIELD_SIZE, y * CONST.FIELD_SIZE, 'border')
            .setOrigin(0)
            .setDisplaySize(CONST.FIELD_SIZE, CONST.FIELD_SIZE);
        }
      }
    }
  }
}
