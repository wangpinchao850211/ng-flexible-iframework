import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() book;
  colorOfTitle: Array<string> = [
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#e91e63'
  ];
  uptateDate = new Date();
  constructor() { }

  ngOnInit() {
    console.log(this.book);
  }

  titBgColor() {
    switch (this.book.id[0]) {
      case 'A':
        return this.colorOfTitle[0];
      case 'B':
        return this.colorOfTitle[1];
      case 'C':
        return this.colorOfTitle[2];
      case 'D':
        return this.colorOfTitle[3];
      case 'E':
        return this.colorOfTitle[4];
      default:
        break;
    }
  }

}
