import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-phone',
  templateUrl: './phone.html',
  styleUrls: ['./phone.scss']
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
    public dependency: QuestionService,
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
    OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
    const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId'); // 取出id
    const duplication = Array.from(new Set(ids));                               // 去重id
    if (ids.length !== duplication.length) { // 有重复, 去重
      this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
