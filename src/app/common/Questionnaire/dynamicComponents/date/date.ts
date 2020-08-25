import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as Timezone from 'moment-timezone';

@Component({
  selector: 'dynamic-Date',
  template: `
        <section class="Date_con" >
            <dynamic-shared-component [title]="Question.Tooltip"
                [FieldNo]="Question.QuestionNo"
                [inputHTML]="Question.QuestionDesc"
                [validataion]="validataion">
            </dynamic-shared-component>
            <label class="mock_label" [ngClass]="{'Grey':Question.disabled,'error_msg': Question.updated && !Question.validated}"
            [attr.for]="'Date_' + config.Question.Question.QuestionId">
            {{data | date}}
              <input aria-label="input" id="{{'Date_' + config.Question.Question.QuestionId }}"
              type="text" [disabled]="Question.disabled" (bsValueChange)="valueChangeFn($event);"
              class="hidden" (onShown)="handler()" [bsValue]="bsValue" bsDatepicker [bsConfig]="bsConfig" [outsideClick]="true"
               [isDisabled]="Question.disabled || (Question.updated && !Question.validated)">
              <div class="datepicker-icon">
                <div class="material-icons date-icon">date_range</div>
              </div>
            </label>
            <ng-container *ngIf="Question.updated && !Question.validated">
              <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
              </dynamic-ErrorMsg-component>
            </ng-container>
        </section>
      `,
  styles: [`

      .datepicker-icon{
          display:inline;
          float: right;
          color:#005b9f;
          position: absolute;
          right: 10px;
          top: 15%;
      }

      .mock_label{
          position: relative;
          display: block;
          width: 350px;
          height: 40px;
          padding-right: 35px;
          padding-left: 16px;
          font-size: 14px;
          line-height: 40px;
          color: #2D3540;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #005b9f;
          border-radius: 4px;
          cursor: pointer;
      }
      .hidden{
          display: inline-block;
          width: 0px;
          outline: none;
          height: 0px;
          border: none;
          position: absolute;
          top: 40px;
          left: 170px;
          opacity: 0;
      }
      .Grey{
        background: #f5f5f5;
        border: 1px solid #535353;
        color: #535353;
      }
      .Grey .datepicker-icon{
        color: #535353;
      }
      .error_msg{
        background: #FFF1F4;
        border: 1px solid #B50128;
        color: #B50128;
      }
      .error_msg .datepicker-icon{
        color: #B50128;
      }

    `]
})
export class dynamicDate implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public validataion: any;
  public bsValue: any;
  public data: string | Date;
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
