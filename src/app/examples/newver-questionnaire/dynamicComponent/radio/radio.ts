import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
import { QuestionService } from '../../question.service';

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
    console.log(this.config);
  }

  ngOnInit() {
    
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

  // selectRadioFn(radio) {
  //   console.log(radio);
  //   debugger;   
  //   this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
  //   this.radios.forEach(e => {
  //     e.OptionResponse.ResponseTxt = 'false';
  //   });
  //   radio.OptionResponse.ResponseTxt = 'true';
  //   if (Reflect.has(this.Question, 'NewValue')) {
  //     this.Question.NewValue = radio.OptionResponse.OptionDesc;
  //   }
  //   var flage = this.radios.some(e => e.OptionResponse.ResponseTxt == 'true');
  //   this.Question.flage = flage;
  //   if (this.Question.Validation.length > 0) {
  //     this.Question.updated = true;
  //     this.dependency.setValidationFn(this.Question, radio.OptionResponse.ResponseTxt);
  //   }
  //   if (this.isDependOn) {
  //     this.DependQuestions = this.dependency.sendDependFn(this.Question, this.radios, '');
  //   }
  //   this.autoSaveFn();
  //   // if (this.config.autoSave) {
  //   //   this.openTimer = true;
  //   //   if (!this.Question.timer) {
  //   //     this.autoSaveFn();
  //   //     this.Question.timer = setInterval(() => {
  //   //       if (this.openTimer) {
  //   //         this.autoSaveFn();
  //   //       }
  //   //     }, 2000)
  //   //   }
  //   // }
  // }

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
