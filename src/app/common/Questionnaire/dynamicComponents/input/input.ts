import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-input',
  template: `
    <section class="input-con" *ngIf="Question.display">
        <dynamic-shared-component [title]="Question.Tooltip"
              [FieldNo]="Question.QuestionNo"
              [inputHTML]="Question.QuestionDesc"
              [validataion]="Question.Validation">
        </dynamic-shared-component>
        <input aria-label="input" type="text" class="dynamic_input" [disabled]=" Question.disabled"
            (keyup)="changeValueFn(Question.OptionResponses[0].OptionResponse.ResponseTxt)"
            (blur) = "blurCheck()"
            [(ngModel)]="Question.OptionResponses[0].OptionResponse.ResponseTxt"
            [ngClass]="{'input_disabled':Question.disabled , 'error_msg':Question.updated && !Question.validated}"/>
        <ng-container *ngIf="Question.updated && !Question.validated">
          <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
          </dynamic-ErrorMsg-component>
        </ng-container>
    </section>
  `,

  styles: [`
      .input-con{
        margin: 15px 0;
      }
      .dynamic_input{
        padding: 8px 16px;
        border: 1px solid #005b9f;
        background-color: #fff;
        border-radius: 4px;
        font-size: 14px;
        width: 350px;
        height: 40px;
        color: #2D3540;
        box-sizing: inherit;
      }
      .input_disabled{
        background: #f5f5f5;
        color: #535353;
        border: 1px solid #535353;
      }
      .dynamic_input.error_msg {
        border: 1px solid #B50128;
        background: #FFF1F4;
        color: #B50128;
      }
    `],
})

export class dynamicInput implements OnInit {
  configggg: any;
  config: any;
  public Question: any;
  public isAutoSave: any;
  public DependQuestions: any;
  public isDependOn: boolean = false;
  constructor(public dependency: DependencyService) { }

  ngOnInit() {
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
  }

  blurCheck() {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      let value = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
      this.dependency.setValidationFn(this.Question, value ? value : '');
    }
    this.autoSaveFn();
  }

  changeValueFn(value) {
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = value;
    this.setDependencyFn();
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
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; };
      this.Question.updated = this.Question.validated ? false : true;
      if (this.Question.Validation.length > 0) {
        var mandatory = this.Question.Validation.some(e => {
          if (e.ValidationTypeId == 5) { return true; }
        });
        if (!mandatory) {
          this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[0].OptionResponse.ResponseTxt);
        }
      }
      if (this.Question.validated == false) { return; }
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      if (param[0].ResponseTxt != null && param[0].ResponseTxt != undefined && param[0].ResponseTxt.length > 0) {
        param[0].ResponseTxt = param[0].ResponseTxt.replace(/^\s+|\s+$/gm, '');
      }
      if (this.DependQuestions) {
        var dependData = this.dependency.fomartAutoSaveDependcyDataFn(this.DependQuestions, this.config.sectionId);
        param = [...param, ...dependData];
      }
      this.config.autoSave.callBack(param);
      this.config.autoSave.updated.flage = true;
    }

  }

  setDependencyFn() {
    if (!this.isDependOn) { return; }
    this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
  }

  checkValidationFn(value) {
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, value);
    }
  }
}
