import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-radio',
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss']
})
export class dynamicdynRadio implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public radios: any;
  public isDependOn: boolean = false;
  public DependQuestions: any;
  public openTimer: boolean = false;

  constructor(private dependency: QuestionService) { 
    
  }

  ngOnInit() {
    console.log(this.config);
    this.Question = this.config.Question.Question;
    console.log(this.Question);

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

    this.radios = this.config.Question.Question.OptionResponses;
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
    var flage = this.radios.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    this.Question.flage = flage;
    if (Reflect.has(this.Question, 'OldValue')) {
      this.radios.forEach(ele => {
        if (ele.OptionResponse.ResponseTxt == 'true') {
          this.Question.OldValue = ele.OptionResponse.OptionDesc;
          this.Question.NewValue = ele.OptionResponse.OptionDesc;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.Question.timer) {
      this.autoSaveFn();
      clearInterval(this.Question.timer);
    }
  }

  selectRadioFn(radio) {
    console.log(radio);  
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    // 赋值操作start
    this.radios.forEach(e => {
      e.OptionResponse.ResponseTxt = 'false';
    });
    radio.OptionResponse.ResponseTxt = 'true';
    // 赋值操作end
    if (Reflect.has(this.Question, 'NewValue')) {
      this.Question.NewValue = radio.OptionResponse.OptionDesc;
    }
    var flage = this.radios.some(e => e.OptionResponse.ResponseTxt == 'true');
    this.Question.flage = flage;

    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, radio.OptionResponse.ResponseTxt);
    }

    if (this.isDependOn) {
      this.DependQuestions = this.dependency.sendDependFn(this.Question, this.radios, '');
    }
    
    this.autoSaveFn();
    // if (this.config.autoSave) {
    //   this.openTimer = true;
    //   if (!this.Question.timer) {
    //     this.autoSaveFn();
    //     this.Question.timer = setInterval(() => {
    //       if (this.openTimer) {
    //         this.autoSaveFn();
    //       }
    //     }, 2000)
    //   }
    // }
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
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; }
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

  // initValadationFn(options) {
  //   var flage = options.some(e => {
  //     return e.OptionResponse.ResponseTxt == 'true';
  //   });
  //   flage ? this.dependency.setValidationFn(this.Question, flage + '')
  //     : this.dependency.setValidationFn(this.Question, '');
  // }
}
