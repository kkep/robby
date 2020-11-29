import {Directions, Commands} from '../enums/Enums'

export class Position {
  rotations = '';

  constructor(
    public x:number,
    public y:number,
    public direction:Directions = Directions.SOUTH
  ) {}

  calcDirection(beforePosition: Position) {
    if (this.x !== beforePosition.x || this.y !== beforePosition.y) {
      if (this.x > beforePosition.x) {
        this.direction = Directions.EAST;
      } else if (this.x < beforePosition.x) {
        this.direction = Directions.WEST;
      } else if (this.y > beforePosition.y) {
        this.direction = Directions.SOUTH;
      } else if (this.y < beforePosition.y) {
        this.direction = Directions.NORTH;
      }
      let direction = beforePosition.direction - this.direction;
      switch (direction) {
        case 1:
        case 3:
          this.rotations = Commands.TURN_LEFT;
          break;
        case -1:
        case -3:
          this.rotations = Commands.TURN_RIGHT;
          break;
        case 2:
        case -2:
          this.rotations = Commands.TURN_RIGHT + Commands.TURN_RIGHT;
          break;
      }
    }
    return this;
  }
}
