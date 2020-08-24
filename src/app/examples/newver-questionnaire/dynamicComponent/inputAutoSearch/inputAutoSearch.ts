import { Component, OnInit, OnDestroy, HostListener, EventEmitter } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dynamic-intput-auto-search',
  templateUrl: './inputAutoSearch.html',
  styleUrls: ['./inputAutoSearch.scss']
})
export class InputAutoSearch implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  // public service: any;
  public seartchValue: any;
  public progress: any;
  public flage = {
    load: false,
    error: false,
    toggle: false
  };
  // public user: any;
  public caseId: any;
  public urlcase: any;
  public clicked: boolean = false;
  public Timer: any;
  public searchResults: any;
  constructor(private dependency: QuestionService, private route: ActivatedRoute) { }

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    this.flage.toggle = false;
  }

  ngOnInit() {
    // this.service = this.factory.getService();
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    //this.user = this.auth.getUserInfoFn();

    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    if (Reflect.has(this.Question, 'OldValue')) {
      this.Question.OldValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
      this.Question.NewValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    }
    Reflect.set(this.Question, 'seartchValue', '');
    this.seartchValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt || '';

    console.log(this.Question);
  }

  ngOnDestroy() { }

  blurCheck() {
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      let value = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
      this.dependency.setValidationFn(this.Question, value ? value : '');
    }
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
  }

  keyupSearchFn(param) {
    clearTimeout(this.Timer);
    this.selectItemFn(this.seartchValue);
    if (!this.seartchValue || !this.seartchValue.length) {
      this.flage.toggle = false;
      return;
    }

    this.Timer = setTimeout(() => {
      this.searchResults = [];
      this.flage.load = true;
      this.flage.error = false;
      this.flage.toggle = true;
      // this.service.autoSearchBI({ name: this.seartchValue, autoFlag: true }).then(res => {
      //   this.searchResults = res.Data;
      //   if (this.searchResults.length == 0) {
      //     this.flage.toggle = false;
      //   }
      //   this.flage.load = false;
      // }, err => {
      //   this.flage.load = false;
      //   this.flage.error = true;
      // });
    }, 1000);
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

  reslultSelectItemFn(item) {
    this.seartchValue = item.IntermediaryName;
    this.Question.seartchValue = this.seartchValue;
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = item.IntermediaryName;
    this.flage.toggle = false;
    this.clicked = true;
  }

  hideItemFn(val) {
    if (this.Question.Validation.length > 0 && !this.flage.toggle && this.clicked && !this.Question.validated) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.seartchValue || '');
    }
  }

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; };
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      console.log(param);
      console.log(this.config);
      param.forEach(e => {
        e.ResponseTxt = e.ResponseTxt.replace(/^\s+|\s+$/gm, '');
      });
      this.config.autoSave.callBack(param).then(() => {
        this.config.autoSave.updated.flage = true;
      });
    }

  }

  selectItemFn(res) {
    this.seartchValue = res;
    this.Question.seartchValue = this.seartchValue;
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, res);
    }
    if (Reflect.has(this.Question, 'NewValue')) {
      this.Question.NewValue = res;
    }
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = res;
  }
}
