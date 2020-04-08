import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-phone',
  template: `
    <section class="input-con" *ngIf="Question.display" (click) = "$event.stopPropagation();">
        <dynamic-shared-component [title]="Question.Tooltip"
              [FieldNo]="Question.QuestionNo"
              [inputHTML]="Question.QuestionDesc"
              [validataion]="Question.Validation">
        </dynamic-shared-component>
        <input aria-label="input" type="text" class="area_code" [disabled]=" Question.disabled"
            (click) = "$event.stopPropagation();"
            (input) = "$event.stopPropagation();"
            (blur) = "blurCheck()"
            (keyup)="changePhoneValueFn();$event.stopPropagation();"
            [(ngModel)]="Question.OptionResponses[0].OptionResponse.ResponseTxt"
            [ngClass]="{'input_disabled':Question.disabled , 'error_msg':Question.updated && !Question.validated}" title=""/>
        <input aria-label="input" type="text" class="dynamic_input" [disabled]=" Question.disabled"
            (click) = "$event.stopPropagation();"
            (input) = "$event.stopPropagation();"
            (blur) = "blurCheck()"
            (keyup)="changePhoneValueFn();$event.stopPropagation();"
            [(ngModel)]="Question.OptionResponses[1].OptionResponse.ResponseTxt"
            [ngClass]="{'input_disabled':Question.disabled , 'error_msg':Question.updated && !Question.validated}" title=""/>
    </section>
  `,

  styles: [`
      .input-con{
        padding:10px 0;
      }
      .area_code{
        padding: 8px 16px;
        border: 1px solid #8C44A3;
        background-color: #fff;
        border-radius: 4px;
        font-size: 14px;
        width: 90px;
        display: inline-block;
        margin-right: 10px;
        color: #2D3540;
      }
      .dynamic_input{
        padding: 8px 16px;
        border: 1px solid #8C44A3;
        background-color: #fff;
        border-radius: 4px;
        font-size: 14px;
        width: 240px;
        display: inline-block;
        margin-left:10px;
        color: #2D3540;
      }
      .input_disabled{
        background: #f5f5f5;
        color: #535353;
        border: 1px solid #535353;
      }
      .dynamic_input.error_msg,.area_code.error_msg {
        border: 1px solid #B50128;
        background: #FFF1F4;
        color: #B50128;
      }
    `],
})

export class dynamicPhone implements OnInit {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public validataion: any;

  public value: string = '';
  public phoneValue: string = '';

  public isDependOn: boolean = false;
  constructor(
    public dependency: DependencyService,
  ) { }

  ngOnInit() {
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    this.value = this.config.Question.Question.OptionResponses[0].OptionResponse.ResponseTxt || '';
    this.phoneValue = this.config.Question.Question.OptionResponses[1].OptionResponse.ResponseTxt || '';
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
    if (Reflect.has(this.Question, 'OldValue')) {
      this.Question.OldValue = this.value != '' ? this.value + '-' + this.phoneValue : '';
      this.Question.NewValue = this.value != '' ? this.value + '-' + this.phoneValue : '';
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

  changePhoneValueFn() {
    let firstValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    let secondValue = this.Question.OptionResponses[1].OptionResponse.ResponseTxt;
    if (Reflect.has(this.Question, 'NewValue')) {
      this.Question.NewValue = firstValue + '-' + secondValue;
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, firstValue);
      let firstNormalValidResult = this.Question.validated;
      this.dependency.setValidationFn(this.Question, secondValue);
      let secondNormalValidResult = this.Question.validated;
      let firstPatten = new RegExp(/^\d{0,20}$/);
      let secondPatten = new RegExp(/^\d{0,30}$/);
      let firstValidResult = firstPatten.test(firstValue);
      let secondValidResult = secondPatten.test(secondValue);
      this.Question.validated = firstNormalValidResult && secondNormalValidResult && firstValidResult && secondValidResult;
    }
  }

  blurCheck() {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    let firstValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    let secondValue = this.Question.OptionResponses[1].OptionResponse.ResponseTxt;
    this.dependency.setValidationFn(this.Question, firstValue ? firstValue : '');
    this.dependency.setValidationFn(this.Question, secondValue ? secondValue : '');
    this.autoSaveFn();
  }

  checkValidation() {
    let firstValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    let secondValue = this.Question.OptionResponses[1].OptionResponse.ResponseTxt;
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, firstValue);
      let firstNormalValidResult = this.Question.validated;
      this.dependency.setValidationFn(this.Question, secondValue);
      let secondNormalValidResult = this.Question.validated;
      let firstPatten = new RegExp(/^\d{0,20}$/);
      let secondPatten = new RegExp(/^\d{0,30}$/);
      let firstValidResult = firstPatten.test(firstValue);
      let secondValidResult = secondPatten.test(secondValue);
      this.Question.validated = firstNormalValidResult && secondNormalValidResult && firstValidResult && secondValidResult;
    }
  }

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; };
      this.checkValidation();
      if (!this.Question.validated) {
        return;
      }
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      this.config.autoSave.callBack(param).then(() => {
        this.config.autoSave.updated.flage = true;
      });
    }

  }

  setDependencyFn() {
    if (this.isDependOn) {
      this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
      // console.log('send');
    }
  }
}
