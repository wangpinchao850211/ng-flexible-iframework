import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
    selector: 'dynamic-label',
        template: `
      <section class="label_con" [ngClass]="{'slideTab':Question.QuestionIdentifier == 'slideTab'}" *ngIf="Question.display">
                <dynamic-shared-component
                    [FieldNo]="Question.QuestionNo"
                    [inputHTML]="Question.QuestionDesc | SafeHtmlPipe"
                    [validataion]="validataion"
                    [title]="Question.Tooltip"
                    >
                </dynamic-shared-component>
      </section>
  `,
   styles: [`
      :host-context(.caseDetail_section) .label_con{
        margin: 10px  0 0 0;
      }
      :host-context(.caseDetail_section) .label_con ::ng-deep .description{
        font-family: graphik-m;
      }
      .slideTab{
        padding-left:20px;      
        margin: 3px 0 8px !important;
      }

     ::ng-deep .slideTab .description b,
     ::ng-deep .slideTab .fieldNo{
        font-family:'graphik-b';
      }

      ::ng-deep .slideTab .fieldNo
      {
        margin-left: -10px;
      }

      .label_con{
        margin:5px 0 20px;
        position:relative;
      }
      .slideTab:before{
        content: '';
        position: absolute;
        top: 2px;
        left: 0px;
        width: 4px;
        height: 17px;
        background-color: #8C44A3;
      }
      .radio_item{
        display: inline-block;
        margin-right: 90px;
      }
      .radio_text{
        vertical-align: middle;
        font-size: 14px;
        margin-left: 5px;
      }
      ::ng-deep.checkbox_con{
        padding: 0 !important;
      }
    `],

})
export class dynamicLabel implements OnInit {
    public config: any;
    public Question: any;
    public validataion: any;
    public isDependOn: boolean = false;

    constructor(private dependency: DependencyService) { }

    ngOnInit() {
        this.Question = this.config.Question.Question;
        this.validataion = [];
        this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
        this.dependency.checkDependcyFn(this.Question);
    }
}
