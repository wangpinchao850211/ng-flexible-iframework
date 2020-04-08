import { Component, OnInit, OnDestroy, HostListener, EventEmitter } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dynamic-intput-auto-search',
  template: `
  <section class="auto_search_con">
  <dynamic-shared-component [FieldNo]="Question.QuestionNo" [inputHTML]="Question.QuestionDesc" [validataion]="Question.Validation"
      [title]="Question.Tooltip">
  </dynamic-shared-component>
  <input aria-label="input" class="identifier_input" type="text" [(ngModel)]="seartchValue" (blur) = "blurCheck()" (keyup)="keyupSearchFn($event)" />
  <div *ngIf="flage.toggle">
      <section class="search_results" (click)="$event.stopPropagation();">
          <ul>
              <li *ngFor="let result of searchResults;let i = index;" (click)="reslultSelectItemFn(result);$event.stopPropagation();" class="search_item">
                  {{result.IntermediaryName}}
              </li>
              <div *ngIf="!flage.load && flage.error" class="error">
                  an error occured
              </div>
              <div class="Portrait-loader" *ngIf="flage.load">
                  <div class="dot">
                      <div class="first"></div>
                  </div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
              </div>
          </ul>
      </section>
  </div>
  <ng-container *ngIf="Question.updated && !Question.validated">
      <dynamic-ErrorMsg-component [validataion]="Question.Validation">
      </dynamic-ErrorMsg-component>
  </ng-container>
  </section>
  `,
  styles: [`
          .auto_search_con{
          }
          .btn_container{
              width:350px;
          }
          .identifier_input{
            padding: 8px 16px;
            border: 1px solid #8C44A3;
            background-color: #fff;
            border-radius: 4px;
            font-size: 14px;
            width: 350px;
            color: #2D3540;
          }
          .btn_container:after{
              display:block;
              clear:both;
              content:"";
              visibility:hidden;
              height:0;
              zoom:1;
          }
          .auto_search_con:after{
              display:block;
              clear:both;
              content:"";
              visibility:hidden;
              height:0;
              zoom:1;
          }
          .input_disabled{
            background: #f5f5f5;
            color: #535353;
            border: 1px solid #535353;
          }
          .search_con.error_msg {
            border: 1px solid #B50128;
            background: #FFF1F4;
            color: #B50128;
          }
          .btn_clear{
            float: right;
            background: #fff;
            border: 2px solid #8C44A3;
            margin-top: 10px;
            border-radius: 4px;
            line-height: 14px;
            color: #8C44A3;
            cursor: pointer;
            padding: 4px 10px;
            font-family: 'graphik-m';
            font-size: 14px;
          }
          .seartchValueHidden{
            overflow: hidden;
            white-space: nowrap;
          }
          .error{
            text-align: center;
            line-height: 100px;
          }
          .search_results{
            top: 40px;
            left: 0;
            z-index: 9;
            padding: 15px;
            width: 100%;
            background-color: #fff;
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, .2);
            -moz-box-shadow: 0 2px 7px rgba(0, 0, 0, .2);
            box-shadow: 0 2px 7px rgba(0, 0, 0, .2);
          }
          .search_input{
            padding: 0 10px;
            border: 1px solid #8C44A3;
            background: #fff;
            color: #2D3540;
            border-radius: 2px;
            height: 36px;
            width:100%;
          }
          .Portrait-loader{ margin: 30px auto;}
          .search_results.show{ display: block; }
          .search_item{
            margin: 5px 0;
            padding: 0 14px;
            line-height: 30px;
            font-size: 14px;
            color: #2D3540;
          }
          .search_item:hover{
            background-color: #ebeaff;
            cursor: pointer;
          }
  `]
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
  constructor(private dependency: DependencyService, private route: ActivatedRoute) { }

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
