import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wpc-tab',
  templateUrl: './wpc-tab.component.html',
  styleUrls: ['./wpc-tab.component.scss']
})
export class WpcTabComponent implements OnInit {

  @Input() tabItems;
  @Output() activeItem = new EventEmitter<any>();
  @Output() switchTab = new EventEmitter<any>();
  @Output() closeTab = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  getActiveItem() {
    this.activeItem.emit();
  }

  switchtab($event, item){
    const Observal = {
      $event,
      item
    }
    this.switchTab.emit(Observal);
  }
  closetab($event, item) {
    const Observal = {
      $event,
      item
    }
    this.closeTab.emit(Observal);
  }

}
