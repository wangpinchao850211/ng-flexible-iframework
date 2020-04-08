import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazyload',
  templateUrl: './lazyload.component.html',
  styleUrls: ['./lazyload.component.scss']
})
export class LazyloadComponent implements OnInit {

  time: any;
  constructor() { }

  ngOnInit() {
    this.time = new Date();
  }

}
