import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../common/services/heroservice';

@Component({
  selector: 'injectable-component',
  templateUrl: './injectablecomponent.html',
  styleUrls: ['./injectablecomponent.css'],
})
export class InjectableFromComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  heros: Array<{ id: number, name: string}>

  ngOnInit() {
    this.heros = this.heroService.getHeros();
  }
  

  }
