import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dynamic-ErrorMsg-component',
    template: `
      <section>
          <ng-container *ngFor="let validate of validataion;">
              <p class="message" *ngIf="!validate.validated">{{validate.ErrorMsg}}</p>
          </ng-container>
      </section>
  `,
    styles: [`
      .message{
          padding-left: 10px;
          font-size: 14px;
          color: #B50128;
          position: relative;
      }
    `],
    inputs: ['validataion']
})
export class ErrorMsgComponent implements OnInit {
    public validataion: any;
    ngOnInit() { }
}
