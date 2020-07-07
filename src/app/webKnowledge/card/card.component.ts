import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  filterRating(rating) {
    return Math.round(rating);
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

  ReadBook() {
    console.log(this.book.id);
    this.router.navigate(['/TeLayout/bookDetail', this.book.id]); // 这种方式能传到路由中，在resolver里才可以使用id
  }

}
