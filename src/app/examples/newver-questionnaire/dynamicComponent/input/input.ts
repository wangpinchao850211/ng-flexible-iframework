import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})

export class dynamicInput implements OnInit {
  configggg: any;
  config: any;
  public Question: any;
  public isAutoSave: any;
  public DependQuestions: any;
  public isDependOn: boolean = false;
  constructor(public dependency: QuestionService) { }

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
    OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
    const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId'); // 取出id
    const duplication = Array.from(new Set(ids));                               // 去重id
    if (ids.length !== duplication.length) { // 有重复, 去重
      this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
