import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position} from "../../classes/position";
import {Way} from "../../classes/way";
import { Fields } from '../../enums/Enums';
import {MatrixService} from "../../services/matrix.service";

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  @Input() fields = '';
  @Input() power = 0;
  @ViewChild('robby') robby: ElementRef;

  constructor(public matrixService: MatrixService) {
  }

  ngOnInit(): void {
  }

  getMatrix() {
    this.matrixService.buildMatrix(this.fields);
    this.matrixService.getCommands(this.power);
    return this.matrixService.matrix.matrix;
  }

  play() {
    if(!this.matrixService.way.getSteps()) {
      return;
    }
    this.robby.nativeElement.style.display = 'none';
    let positionS = this.matrixService.way.getFirstPosition();
    this.robby.nativeElement.style.margin = (positionS.y * 32) + 'px 0 0 ' + (positionS.x * 32) + 'px';
    setTimeout(() => {
      this.robby.nativeElement.style.display = 'block';
      this.matrixService.way.positions.forEach((position, index) => {
        setTimeout(() => {
          this.robby.nativeElement.style.margin = (position.y * 32) + 'px 0 0 ' + (position.x * 32) + 'px';
          this.robby.nativeElement.classList.value = 'direction'+position.direction;
        }, 300 * index);
      })
    },300);
  }

}
