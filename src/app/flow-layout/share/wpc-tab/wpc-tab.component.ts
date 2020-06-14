import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wpc-tab',
  templateUrl: './wpc-tab.component.html',
  styleUrls: ['./wpc-tab.component.scss']
})
export class WpcTabComponent implements OnInit {

  @Input() tabItems;
  @Input() activeItem;
  @Output() switchTab = new EventEmitter<any>();
  @Output() closeTab = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

  switchtab($event, item){
    console.log(item);
    this.switchTab.emit(item);
    $event.preventDefault(); // 阻止冒泡
  }

  closetab($event, item) {
    console.log(item);
    this.closeTab.emit(item);
    $event.preventDefault();// 阻止冒泡
  }

}
