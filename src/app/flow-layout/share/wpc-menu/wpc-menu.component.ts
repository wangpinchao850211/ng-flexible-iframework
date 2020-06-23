import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BooksComponent } from 'src/app/webKnowledge/books/books.component';

@Component({
  selector: 'app-wpc-menu',
  templateUrl: './wpc-menu.component.html',
  styleUrls: ['./wpc-menu.component.scss']
})
export class WpcMenuComponent implements OnInit {

  isShowTitle: boolean;
  @Input() arrow
  @Input() 
  get showTitle() {
    return this.isShowTitle;
  };

  set showTitle(val: boolean) {
    this.isShowTitle = val;
  };

  @Input() fold;
  @Input() menu;
  @Output() collapse = new EventEmitter<any>();
  @Output() expand = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
  }

  collapsed() {
    this.collapse.emit(true);
  }

  expanded() {
    this.expand.emit(false);
  }
  
}
