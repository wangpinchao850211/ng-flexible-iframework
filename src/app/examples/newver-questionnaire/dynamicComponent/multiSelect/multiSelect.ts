import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-multi-select',
  template: `
    <section class="multi_select">
        hello wrold this is the radio
    </section>
  `,
  styles: []
})
export class dynMultiSelect implements OnInit {
  public config: any;
  constructor() { }
  ngOnInit() { }
}

