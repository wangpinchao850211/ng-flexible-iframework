import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-input',
  template: `
    <section class="checkbox_con" *ngIf="Question.display"
    [ngClass]="{'error_msg':Question.updated && !Question.validated}"
    (click)="$event.stopPropagation();">
        <dynamic-shared-component *ngIf="Question.QuestionDesc" [title]="Question.Tooltip"
            [FieldNo]="Question.QuestionNo"
            [inputHTML]="Question.QuestionDesc"
            [validataion]="Question.Validation">
        </dynamic-shared-component>
        <div *ngFor="let item of checkboxs;let itemI = index;" class="content_con">
              <div class="checkbox_icon" (click)="$event.stopPropagation();">
                <input (click)="$event.stopPropagation();" class="regular-checkbox" [ngClass]="{'error_msg':Question.updated && !Question.validated}" type="checkbox" id="{{'checkbox_' + Question.QuestionId + itemI + Question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier}}"
                    [name]=" Question.QuestionId "  [checked]="item.OptionResponse.ResponseTxt == 'true' "
                    [disabled]=" Question.disabled" (change)="valueChangeFn(item)" />
                <label (click)="$event.stopPropagation();" [attr.for]=" 'checkbox_' + Question.QuestionId + itemI + Question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier" ><span class="noStyle">none</span></label>
              </div>
              <div class="checkbox_content">
                <span [innerHtml]="item.OptionResponse.OptionDesc"></span>
                <span class="material-icons option-tooltip" [title]="item.OptionResponse.ToolTip ? item.OptionResponse.ToolTip : ''"  *ngIf="item.OptionResponse.ToolTip!=null && item.OptionResponse.ToolTip!='' && item.OptionResponse.ToolTip && !Question.disabled">info</span>
              </div>
        </div>
        <ng-container  *ngIf="Question.updated && !Question.validated">
          <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
          </dynamic-ErrorMsg-component>
        </ng-container>
    </section>
  `,
  styles: [`
      .checkbox_con{
      }
      .content_con{
        margin:5px 0 15px;
      }
      :host-context(.caseDetail_section) .checkbox_con{
        padding:5px 0;
      }
      :host-context(.caseDetail_section) .content_con{
        margin:0;
        font-family: graphik-m;
      }
      .content_con:after{
          display:block;
          clear:both;
          content:"";
          visibility:hidden;
          height:0;
          zoom:1;
      }
      .checkbox_icon{
        float:left;
        width:30px;
      }
      .checkbox_content{
        padding-left:30px;
        font-size: 14px;
      }

      .regular-checkbox {
        display: none;
      }

      .regular-checkbox+label {
        -webkit-appearance: none;
        vertical-align: middle;
        cursor: pointer;
        border: 2px solid #e6e4e9;
        box-shadow: 0 1px 2px rgba(0,0,0,.05), inset 0 -15px 10px -12px rgba(0,0,0,.05);
        padding: 7px;
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        background-color: #f9f8fd;
      }

      .regular-checkbox  + label {
        background: #FFFFFF ;
        border: 2px solid #005b9f ;
        border-radius: 3px ;
      }

      .regular-checkbox + label:hover{
        background-color: #ccc;
        box-shadow: #ccc 0px 0px 0px 4px;
      }

      .regular-checkbox:checked + label:hover{
        background-color: #ccc;
        box-shadow: #ccc 0px 0px 0px 4px;
      }

      .regular-checkbox  + label:after {
        width: 12px ;
        height: 12px ;
        top: 2px ;
        left: 2px ;
        border-radius: 2px ;
      }

      .regular-checkbox:checked + label:after {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: #005b9f;
        border-radius: 2px;
    }

    .regular-checkbox:checked + label:after {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #005b9f;
      border-radius: 2px;
  }

  .regular-checkbox:checked+label:after {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: #005b9f;
    border-radius: 2px;
    z-index: 7;
}

.regular-checkbox:checked+label:after {
  content: ' ';
  width: 12px;
  height: 12px;
  position: absolute;
  top: 2px;
  background: #005b9f;
  left: 2px;
  font-size: 32px;
}

      .regular-checkbox:disabled  + label{
        cursor: not-allowed;
        background:#f5f5f5 ;
        border: 2px solid #535353 ;
      }

      .regular-checkbox:disabled + label:hover{
        box-shadow: none;
        background:#f5f5f5 ;
      }

      .regular-checkbox:disabled + label:after{
          background-color: #535353 ;
      }

      .regular-checkbox.error_msg  + label{
        background:#FFF1F4;
        border: 2px solid #B50128 ;
      }

      .regular-checkbox.error_msg + label:hover{
        box-shadow: none;
        background:#FFF1F4;
      }

      .regular-checkbox.error_msg + label:after{
          background-color: #B50128 ;
      }

      .noStyle {
        display: none;
      }
      .option-tooltip {
            color: #66696E;
            font-size:18px;
            vertical-align:middle;
            cursor:default;
       }
    `]
})
export class dynamicCheckBox implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  // public validataion      : any;

  public checkboxs: any[] = [];
  public isDependOn: boolean = false;
  public value: string = '';
  public DependQuestions: any;
  //public timer : any;
  public openTimer: boolean = false;
  constructor(
    private dependency: DependencyService,
  ) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }

  ngOnInit() {
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    if (!Reflect.has(this.Question, 'timer')) {
      Reflect.set(this.Question, 'timer', null);
    }
    Reflect.set(this.Question, 'flage', false);

    this.checkboxs = this.Question.OptionResponses;
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
    this.dependency.setRepeatForAppDetailsFn(this.Question);
    var flage = this.checkboxs.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    this.Question.flage = flage;
    // console.log('-------------------------------------');
    // console.log('this is the dynamicInput',this.Question);
    // console.log('-------------------------------------');
  }

  ngOnDestroy() {
    if (this.Question.timer) {
      this.autoSaveFn();
      clearInterval(this.Question.timer);
    }
  }

  valueChangeFn(item) {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    this.Question.OptionResponses.forEach(e => {
      if (!e.OptionResponse.ResponseTxt) {
        e.OptionResponse.ResponseTxt = 'false';
      }
    });
    item.OptionResponse.ResponseTxt = !item.OptionResponse.ResponseTxt || item.OptionResponse.ResponseTxt == 'false' ? 'true' : 'false';
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.initValadationFn(this.checkboxs);
    } else {
      this.Question.validated = true;
    }

    if (this.isDependOn) {
      this.DependQuestions = this.dependency.sendDependFn(this.Question, this.checkboxs, '');
    }

    if (item.OptionResponse.OptionDesc.indexOf("Approval term limited") > -1) {
      this.dependency.setRepeatDisableForAppDetailsFn(this.Question.QuestionId, item.OptionResponse.RepeatSectionIdentifier, item.OptionResponse.ResponseTxt)
    }

    if (this.config.autoSave) {
      if (this.config.autoSave.selected != undefined && item.OptionResponse.ResponseTxt == 'true') {
        this.config.autoSave.selected += 1;
      } else if (this.config.autoSave.selected != undefined && item.OptionResponse.ResponseTxt != 'true') {
        this.config.autoSave.selected -= 1;
      }
    }

    if (this.config.autoSave && this.Question.validated && this.config.autoSave.callBack) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  removeDup() {
    let OleOptionResponses = this.Question.OptionResponses;
    let NewOptionResponses = [];
    for (var i = 0; i < OleOptionResponses.length; i++) {
      var canAdd = true;
      for (var j = NewOptionResponses.length; j--;) {
        if (OleOptionResponses[i].OptionResponse.OptionId == NewOptionResponses[j].OptionResponse.OptionId) {
          canAdd = false;
          break;
        }
      }
      if (canAdd) {
        NewOptionResponses.push(OleOptionResponses[i]);
      }
    }
    if (OleOptionResponses.length != NewOptionResponses.length) {
      this.Question.OptionResponses = NewOptionResponses;
      this.autoSaveFn();
    }
  }

  initValadationFn(options) {
    var flage = options.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    this.Question.flage = flage;
    flage ? this.dependency.setValidationFn(this.Question, flage + '')
      : this.dependency.setValidationFn(this.Question, '');
  }

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; };
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      if (this.DependQuestions) {
        var dependData = this.dependency.fomartAutoSaveDependcyDataFn(this.DependQuestions, this.config.sectionId);
        param = [...param, ...dependData];
      }

      param.forEach(e => {
        Reflect.set(e, "IsAddFlag", null);
      });

      if (Reflect.has(this.Question, "lastSave") && (JSON.stringify(this.Question.lastSave) == JSON.stringify(param))) {
        this.openTimer = false;
        if (this.Question.timer) {
          clearInterval(this.Question.timer);
          this.Question.timer = null;
        }
        return;
      }
      this.config.autoSave.callBack(param);
      this.config.autoSave.updated.flage = true;
    }

  }
}

