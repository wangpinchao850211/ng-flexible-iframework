import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/common/domain/books';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cars: Book[];
  cols: any[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'desc', header: 'Desc' },
      { field: 'rating', header: 'Rating' },
      { field: 'categories', header: 'Categories' },
      { field: 'read', header: 'Read' },
  ];
  selectedbook: Book;
  scrollHeight: string; // 动态添加table高度

  @Input() books;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.books);
    this.selectedbook = this.books[1];
  }

  onRowSelect(event) {
    console.log(event.data);
  }

  onRowUnselect(event) {
      console.log(event.data);
  }

  ReadBook(ev: Event, book: Book) {
    // console.log(ev);
    // console.log(book);
    this.router.navigate(['/TeLayout/bookDetail', book.id]);
  }

}
