import { Colors } from '../config';
import { CONST } from '../const/const';

export class MapView {
  static drawMapBorders(
    scene: Phaser.Scene,
    gameWidth: number,
    gameHeight: number
  ) {
    scene.cameras.main.setBackgroundColor(Colors.background.gameMap);

    const usableHeight =
      gameHeight - CONST.SELECTION_AREA_HEIGHT - CONST.HEADER_HEIGHT;

    const graphics = scene.add.graphics();
    graphics.setDepth(-1);
    graphics.fillStyle(Colors.background.ground, 1);
    graphics.fillRect(0, CONST.HEADER_HEIGHT, gameWidth, usableHeight);

    const cols = Math.ceil(gameWidth / CONST.FIELD_SIZE);
    const rows = Math.ceil(usableHeight / CONST.FIELD_SIZE);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
          scene.add
            .sprite(
              x * CONST.FIELD_SIZE,
              CONST.HEADER_HEIGHT + y * CONST.FIELD_SIZE,
              'border'
            )
            .setOrigin(0)
            .setDisplaySize(CONST.FIELD_SIZE, CONST.FIELD_SIZE);
        }
      }
    }
  }
}
