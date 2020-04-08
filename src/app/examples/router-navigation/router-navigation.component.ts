import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routernavigation',
  templateUrl: './router-navigation.component.html',
  styleUrls: ['./router-navigation.component.scss']
})
export class RouterNavigationComponent implements OnInit {

  time: any;
  constructor() { }

  ngOnInit() {
    this.time = new Date();
  }

}
