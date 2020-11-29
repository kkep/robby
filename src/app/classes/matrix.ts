import {Position} from "./position";
import {Fields} from "../enums/Enums";

interface Block {
  text: string;
  isWay: boolean;
}

export class Matrix {
  matrix = [];
  positionS: Position;
  positionT: Position;
  sqrt = 0;

  constructor(field: string) {
    this.sqrt = Math.sqrt(field.length);
    for (let y = 0; y < this.sqrt; y++) {
      this.matrix[y] = [];
      for (let x = 0; x < this.sqrt; x++) {
        this.set(x, y, {text: field[this.sqrt * y + x], isWay: false});
        if (this.get(x, y).text === Fields.START) {
          this.positionS = new Position(x, y);
        } else if (this.get(x, y).text === Fields.TARGET) {
          this.positionT = new Position(x, y);
        }
      }
    }
  }

  get(x: number, y:number): Block | undefined {
    if (x > -1 && x < this.sqrt && y > -1 && y < this.sqrt) {
      return this.matrix[y][x]
    } else {
      return undefined;
    }
  }

  set(x: number, y: number, block: Block) {
    this.matrix[y][x] = block;
  }
}
