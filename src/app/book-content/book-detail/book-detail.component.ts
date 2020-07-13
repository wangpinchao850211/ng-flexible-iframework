import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/webKnowledge/books/books.component';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookcontent: Book;
  currentBookContent: Book;
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

  canDeactivate(): Observable<boolean> | boolean {
    // 如果没有危机或危机没有改变，则允许同步导航（`true`）
    console.log(_.isEqual(this.bookcontent, this.currentBookContent));
    if (!this.bookcontent && _.isEqual(this.bookcontent, this.currentBookContent)) {
      return true;
    }
    // 调用一下全局dialog，提示请保存信息
    return false; // 也可以使用异步return 回去一个Observable，例如进行后台请求
  }

}
