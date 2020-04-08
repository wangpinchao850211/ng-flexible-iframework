import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-textarea',
  template: `
      <section class="textarea_con" *ngIf="Question.display">
          <dynamic-shared-component [title]="Question.Tooltip"
              [FieldNo]="Question.QuestionNo"
              [inputHTML]="Question.QuestionDesc"
              [validataion]="Question.Validation">
          </dynamic-shared-component>
          <textarea aria-label="input" type="text" [disabled]="Question.disabled "
              (keyup)="valueChangeFn()" class="dynamic_textarea"
              (blur)="valueChangeFn()"
              [ngClass]="{'textarea_disabled':Question.disabled , 'error_msg':Question.updated && !Question.validated}"
              [(ngModel)]="Question.OptionResponses[0].OptionResponse.ResponseTxt" (blur)="autoSaveFn()" title=""></textarea>
          <ng-container  *ngIf="updated && !Question.validated">
            <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
            </dynamic-ErrorMsg-component>
          </ng-container>
      </section>
  `,
  styles: [`
      .textarea_con{
        margin:15px 0;
      }
      .dynamic_textarea{
        padding: 10px;
        width: 700px;
        height: 70px;
        border: 1px solid #005b9f;
        border-radius: 4px;
        background-color: #FFFFFF;
        font-size: 14px;
        outline:none;
        color: #2D3540;
      }
      .textarea_disabled{
        border: 1px solid #535353;
        color: #535353;
        background: #f5f5f5;
      }
      .dynamic_textarea.error_msg {
        border: 1px solid #B50128;
        background: #FFF1F4;
        color: #B50128;
      }
    `],

})

export class dynamicTextarea implements OnInit {
  public config: any;
  public Question: any;
  public isAutoSave: any;

  constructor(private dependency: DependencyService) { }
  ngOnInit() {
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    this.dependency.checkDependcyFn(this.Question);
  }

  valueChangeFn() {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    var value = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    if (value != null && value != undefined && value.length > 0) {
      value = value.replace(/^\s+|\s+$/gm, '');
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, value || '');
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

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack && !this.Question.validated) { return; }
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      if (param[0].ResponseTxt != null && param[0].ResponseTxt != undefined) {
        param[0].ResponseTxt = param[0].ResponseTxt.replace(/^\s+|\s+$/gm, '');
      }
      if (!!param[0].ResponseTxt && param[0].ResponseTxt.length > 0) {
        this.config.autoSave.callBack(param);
        this.config.autoSave.updated.flage = true;
      }
    }
  }
}
