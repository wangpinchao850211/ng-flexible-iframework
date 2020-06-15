import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theme-solt',
  templateUrl: './theme-solt.component.html',
  styleUrls: ['./theme-solt.component.scss']
})
export class ThemeSoltComponent implements OnInit {

  @Input() title:string;
  constructor() { }

  ngOnInit() {
  }

}
