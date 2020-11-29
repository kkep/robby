import {Position} from "./position";
import { Commands } from '../enums/Enums';

export class Way {

  private neededPower: number;

  constructor(public positions: Position[] = []) {
  }

  getFirstPosition() {
    return this.positions[0];
  }

  getLastPosition() {
    return this.positions[this.positions.length-1];
  }

  getSteps() {
    return this.positions.length
  }

  calcPower() {
    let power = this.positions.length - 1;
    this.positions.forEach(position => {
      power += position.rotations.length;
    });
    return power;
  }

  getNeededPower() {
    if (!this.neededPower) {
      return this.calcPower();
    } else {
      return this.neededPower;
    }
  }

  findPosition(x:number, y:number) {
    return this.positions.some(position => position.x === x && position.y === y)
  }

  getWayAsString() {
    let way = '';
    this.positions.forEach((position, index) => {
      if (index !== 0) {
        way += position.rotations + Commands.MOVE_FORWARDS;
      }
    });
    return way;
  }
}
