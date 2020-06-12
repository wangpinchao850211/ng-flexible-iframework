import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-wpc-menu',
  templateUrl: './wpc-menu.component.html',
  styleUrls: ['./wpc-menu.component.scss']
})
export class WpcMenuComponent implements OnInit {

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
