import { Injectable } from '@angular/core';
import {Position} from "../classes/position";
import {Way} from "../classes/way";
import {Fields} from "../enums/Enums";
import {Matrix} from "../classes/matrix";

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  matrix: Matrix;
  way: Way = new Way();

  constructor() { }

  buildMatrix(field: string) {
    this.matrix = new Matrix(field);
    return this.matrix;
  }

  getCommands(power) {
    if (!this.matrix || this.matrix.sqrt === 0) {
      return;
    }
    let shortestWay: Way;
    let ways = this.calc([new Way([this.matrix.positionS])], power);

    ways.forEach(way => {
      if (way.getNeededPower() <= power && (!shortestWay || shortestWay.calcPower() > way.getNeededPower())) {
        shortestWay = way;
      }
    });

    if (shortestWay) {
      this.way = shortestWay;
      this.way.positions.forEach(position => {
        this.matrix.get(position.x, position.y).isWay = true;
      });
    } else {
      this.way = new Way();
      console.log('Недостаточно энергии');
    }
  }

  calc(ways: Way[], power) {
    let newWays = [];
    ways.forEach((way) => {
      let x = way.getLastPosition().x;
      let y = way.getLastPosition().y;
      [
        {x: x+1, y: y},
        {x: x,   y: y+1},
        {x: x-1, y: y},
        {x: x,   y: y-1}
      ].forEach(el => {
        if (
          this.matrix.get(el.x, el.y) != undefined &&
          !way.findPosition(el.x, el.y) &&
          this.matrix.get(el.x, el.y).text !== Fields.BLOCKED &&
          way.getSteps()+1 <= power
        ) {
          let newPosition = new Position(el.x, el.y);
          newPosition.calcDirection(way.getLastPosition());
          let newWay = new Way([...way.positions, newPosition]);
          newWays.push(newWay);
        }
      })
      if (this.matrix.positionT.x === x && this.matrix.positionT.y === y && way.calcPower() <= power) {
        newWays.push(way);
      }
    });
    let finished = 0;
    newWays.forEach(way => {
      if (way.getLastPosition().x === this.matrix.positionT.x && way.getLastPosition().y === this.matrix.positionT.y) {
        finished++;
      }

    });
    if (newWays.length !== finished) {
      return this.calc(newWays, power);
    } else {
      return newWays;
    }
  }
}
