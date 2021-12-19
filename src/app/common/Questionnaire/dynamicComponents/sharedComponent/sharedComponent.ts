import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-shared-component',
  template: `
      <p class="shared_con">
          <span [innerHtml]="FieldNo" class="fieldNo" *ngIf="FieldNo"></span>
          <span class="description" [innerHtml]="inputHTML"></span>
          <span *ngIf="mandatory" class="mandatory">*</span>
          <span class="material-icons com_descipt_info" title="{{title}}" *ngIf="title!=null && title!=''">info</span>
      </p>
  `,
  styles: [`
          .mandatory{ color:#B50128; }
          .shared_con{
            padding-bottom: 4px;
            font-size: 14px;
            font-style: normal;
          }
          .fieldNo{
            margin-right:10px;
          }
          .description{
            font-family: graphik;
          }
          .com_descipt_info{
            color: #66696E;
            font-size:18px;
            vertical-align:middle;
            cursor:default;
          }
  `],
  inputs: ['FieldNo', 'inputHTML', 'validataion', 'title']
})

export class sharedComponent implements OnInit {
  public FieldNo: any;
  public inputHTML: any;
  public validataion: any;
  public mandatory: boolean = false;
  public title: string;

  constructor(private dependency: DependencyService) { }

  ngOnInit() {
    this.checkMandatoryFn();
    if (!this.dependency.isShowTooltip) {
      this.title = "";
    }
  }

  checkMandatoryFn() {
    this.mandatory = this.validataion.some(e => { if (e.ValidationTypeId == 5) { return true; } });
  }
}

