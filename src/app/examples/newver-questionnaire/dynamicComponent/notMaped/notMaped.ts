import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-not-maped',
  template: `
    <section class="not_maped"> {{config.Question.Question.QuestionId}}    content not maped nooooooo identifier</section>
  `,
  styles: [` .not_maped{ border:1px solid red; }`]
})
export class notMaped implements OnInit {
  public config: any;

  constructor() { console.log(this.config); }

  ngOnInit() { }
}

