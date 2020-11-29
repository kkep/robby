import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fields = '....S#..#..#.#.T';
  power:number = 12;

  setField($event) {
    let value = $event.target.value;
    let sqrt = Math.sqrt(value.length);
    if (
      sqrt && /^[.ST#]+$/.test(value) &&
      (value.length%sqrt) === 0 &&
      value.indexOf('S') !== -1 &&
      value.indexOf('T') !== -1
    ) {
      this.fields = value;
    } else {
      console.log('Матрица описана неправильно');
      this.fields = '';
    }
  }

  setPower($event) {
    let value = Number($event.target.value);
    $event.target.value = isNaN(value) ? '' : value;
    this.power = $event.target.value;
  }
}
