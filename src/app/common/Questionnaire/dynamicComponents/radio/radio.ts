import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-radio',
  template: `
      <section class="radio_con" *ngIf="Question.display">
            <dynamic-shared-component [title]="Question.Tooltip"
                  [FieldNo]="Question.QuestionNo"
                  [inputHTML]="Question.QuestionDesc"
                  [validataion]="Question.Validation">
            </dynamic-shared-component>
            <div class="radio_con">
              <span class="radio_item" *ngFor="let radio of radios;let radioI = index;" (click)="$event.stopPropagation();">
                  <input class="regular-radio" type="radio" [ngClass]="{'error_msg': Question.updated && !Question.validated}"
                    (change)="selectRadioFn(radio);"
                    [name]="Question.QuestionId" [checked]="radio.OptionResponse.ResponseTxt == 'true' "
                    id="{{'radio_' + radio.OptionResponse.OptionId }}"
                    [disabled]="Question.disabled" title="" />
                    <label [attr.for]=" 'radio_' + radio.OptionResponse.OptionId "><span class="noStyle">none</span></label>
                    <span class="radio_text" [innerHtml]="radio.OptionResponse.OptionDesc"></span>
              </span>
            </div>
            <ng-container  *ngIf="Question.updated && !Question.validated">
              <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
              </dynamic-ErrorMsg-component>
            </ng-container>
      </section>
  `,
  styles: [`
      .radio_con{
        margin:5px 0 20px;
      }
      .radio_item{
        display: inline-block;
        margin-right: 90px;
      }
      .radio_text{
        vertical-align: middle;
        font-size: 14px;
        margin-left: 15px;
      }

      .regular-radio {
        display: none;
      }

      .regular-radio + label {
        border: 1px solid #005b9f;
        background-color: #fff;
    }

      ::ng-deep .regular-radio + label{
        -webkit-appearance: none;
        vertical-align: middle;
        cursor: pointer;
        border: 2px solid #e6e4e9;
        box-shadow: 0 1px 2px rgba(0,0,0,.05), inset 0 -15px 10px -12px rgba(0,0,0,.05);
        padding: 7px;
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #f9f8fd;
      }

      ::ng-deep .regular-radio + label:hover{
        background-color: #ccc;
      }

      ::ng-deep .regular-radio:checked + label{
        background-color: #fff;
        color: #fff;
      }

      ::ng-deep .regular-radio:checked + label:hover{
        background-color: #ccc;
      }

      .regular-radio:checked + label:after {
        top: 3px;
        left: 3px;
    }

      ::ng-deep .regular-radio:checked + label:after{
        content: ' ';
        width: 12px;
        height: 12px;
        border-radius: 50px;
        position: absolute;
        top: 2px;
        background: #005b9f;
        left: 2px;
        font-size: 32px;
      }

      .regular-radio:disabled  + label{
        cursor: not-allowed;
        border: 1px solid #535353 ;
        background-color: #f5f5f5 ;
      }

      .regular-radio:disabled + label:hover{
        box-shadow: none;
      }

      .regular-radio:disabled + label:after{
          background: #535353;
      }

      .regular-radio.error_msg + label{
        background: #FFF1F4;
        border: 1px solid #B50128 ;
      }

      .regular-radio.error_msg + label:hover{
        box-shadow: none;
      }

      .noStyle {
        display: none;
      }
    `]
})
export class dynamicdynRadio implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public radios: any;
  public isDependOn: boolean = false;
  public DependQuestions: any;
  public openTimer: boolean = false;

  constructor(private dependency: DependencyService) { }

  ngOnInit() {
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
    // debugger;   
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    this.radios.forEach(e => {
      e.OptionResponse.ResponseTxt = 'false';
    });
    radio.OptionResponse.ResponseTxt = 'true';
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
    
    // for (var i = 0; i < OleOptionResponses.length; i++) {
    //   var canAdd = true;
    //   for (var j = NewOptionResponses.length; j--;) {
    //     if (OleOptionResponses[i].OptionResponse.OptionId == NewOptionResponses[j].OptionResponse.OptionId) {
    //       canAdd = false;
    //       break;
    //     }
    //   }
    //   if (canAdd) {
    //     NewOptionResponses.push(OleOptionResponses[i]);
    //   }
    // }
    // if (OleOptionResponses.length != NewOptionResponses.length) {
    //   this.Question.OptionResponses = NewOptionResponses;
    //   this.autoSaveFn();
    // }
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

  initValadationFn(options) {
    var flage = options.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    flage ? this.dependency.setValidationFn(this.Question, flage + '')
      : this.dependency.setValidationFn(this.Question, '');
  }
}
