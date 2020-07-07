import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/webKnowledge/books/books.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookcontent: Book;
  constructor(
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      console.log(params);
      console.log(params['id']);
    });

    this.routeInfo.data.subscribe((data) => {
      console.log('获取resolver数据');
      this.bookcontent = data.book.data;
      console.log(this.bookcontent);
    });
  }

}
