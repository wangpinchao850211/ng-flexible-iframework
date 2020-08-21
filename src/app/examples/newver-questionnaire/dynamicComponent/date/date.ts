import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as Timezone from 'moment-timezone';

@Component({
  selector: 'dynamic-Date',
  templateUrl: './date.html',
  styleUrls: ['./date.scss']
})
export class dynamicDate implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public validataion: any;
  public bsValue: any;
  public data: Date;
  public bsConfig: Partial<BsDatepickerConfig>;
  public selectedPanel: boolean = false;
  public clicked: boolean = false;
  public openTimer: boolean = false;
  constructor(private dependency: DependencyService) { }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    let val = this.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    if (this.Question.Validation.length > 0 && this.clicked && !this.Question.validated && (val == null || val == '')) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[0].OptionResponse.ResponseTxt || '');
    }
  }

  ngOnInit() {
    // var data = this.config.Question.Question.OptionResponses[0].OptionResponse.ResponseTxt;
    var data = this.initDateFn(this.config.Question.Question.OptionResponses[0].OptionResponse.ResponseTxt);
    this.data = data ? this.formartTimezoneFn(data, "America/New_York") : ''; // EST
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    if (!Reflect.has(this.Question, 'timer')) {
      Reflect.set(this.Question, 'timer', null);
    }
    this.validataion = this.Question.Validation;
    this.bsConfig = Object.assign({}, { showWeekNumbers: false, containerClass: 'theme-dark-blue'  });
    // console.log('-------------------------------------');
    // console.log('this is the dynamicInput',this.config);
    // console.log('-------------------------------------');
  }

  ngOnDestroy() {
    if (this.Question.timer) {
      this.autoSaveFn();
      clearInterval(this.Question.timer);
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
    if (OleOptionResponses.length !== NewOptionResponses.length) {
      this.Question.OptionResponses = NewOptionResponses;
      this.autoSaveFn();
    }
  }

  handler() {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
  }

  valueChangeFn(value: Date) {
    this.data = this.formartTimezoneFn(value, 'America/New_York');
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = this.formartTimezoneFn(value, 'UTC'); // UTC
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, value);
    }
    if (this.config.autoSave) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  initDateFn(value) {
    if (!value) { return; }
    const UTC = Timezone.tz(value, 'UTC');
    const EST = Timezone.tz(UTC, 'America/New_York');
    const time = EST.format();
    const date = new Date(time);
    this.bsValue = date;
    return time;
  }

  formartTimezoneFn(value, timezone) {
    var date, month, year, day;
    date = new Date(value);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    var time = year + '-' + month + '-' + day + ' 00:00';
    var New_York = Timezone.tz(time, 'America/New_York');
    var target = Timezone.tz(New_York, timezone);
    return target.format();
  }

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; }
      var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
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
      this.config.autoSave.updated.flage = true;
      // this.config.autoSave.callBack(param).then(res => {
      //   this.config.autoSave.updated.flage = true;
      //   if (!Reflect.has(this.Question, "lastSave")) {
      //     Reflect.set(this.Question, "lastSave", res.inputValue);
      //   } else {
      //     this.Question.lastSave = res.inputValue;
      //   }
      // });
    }
  }
}
