import { Component, OnInit } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss']

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
