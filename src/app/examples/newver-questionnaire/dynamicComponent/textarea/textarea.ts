import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
})

export class dynamicTextarea implements OnInit {
  public config: any;
  public Question: any;
  public isAutoSave: any;

  constructor(private dependency: QuestionService) { }
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
    OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
    const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId');
    const duplication = Array.from(new Set(ids));
    if (ids.length !== duplication.length) {
      this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
