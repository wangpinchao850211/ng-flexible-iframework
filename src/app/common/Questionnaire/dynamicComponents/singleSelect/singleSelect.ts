import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-single-select',
  template: `
      <section class="select_container" *ngIf="options.length > 0 && Question.display">
              <dynamic-shared-component [title]="Question.Tooltip"
                  [FieldNo]="Question.QuestionNo"
                  [inputHTML]="Question.QuestionDesc"
                  [validataion]="Question.Validation">
              </dynamic-shared-component>
              <div class="select_content" [ngClass]="{'select_disabled':Question.disabled , 'error_msg': Question.updated && !Question.validated}"
                 (click)="togglePanelFn();$event.stopPropagation();">
                 <div class="selected_text">{{Question.selecteItem.name}}</div>
                <ul class="select_panel" *ngIf="selectedPanel">
                  <li class="select_item" (click)="selectedItemFn(option)" *ngFor="let option of options">
                      {{option.name}}
                      <span class="material-icons option-tooltip" title="{{option.tooltip}}" *ngIf="option.tooltip!=null && option.tooltip!=''">info</span>
                  </li>
                </ul>
              </div>
      </section>
  `,

  styles: [`
      .select_disabled{
        border: 1px solid #535353 !important;
        color:#535353 !important;
        background: #f5f5f5 !important;
      }

      .select_disabled:after {
        color: #535353 !important;
      }

      .error_msg{
        border: 1px solid #B50128 !important;
        color:#B50128 !important;
        background: #FFF1F4 !important;
      }

      .error_msg:after {
        color: #B50128 !important;
      }

      .select_content{
        padding: 0 30px 0 16px;
        height: 38px;
        line-height: 34px;
        border: 1px solid #005b9f;
        background: #fff;
        color: #000;
        border-radius: 4px;
        font-size: 14px;
        display: block;
        outline: 0 none;
        position: relative;
        width: 350px;
      }
      .select_content:after {
        content: 'expand_more';
        position: absolute;
        z-index: 1;
        right: 10px;
        top: 0;
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        color: #005b9f;
        font-feature-settings: 'liga';
    }
      .selected_text{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .select_panel{
        position: absolute;
        background: #fff;
        width: 100%;
        left: 0;
        top: 38px;
        overflow-y: auto;
        max-height: 300px;
        z-index: 10;
        box-shadow: 0 2px 7px rgba(153,153,153,.3);
      }
      .select_item{
        margin: 5px 0;
        padding: 5px 14px;
        line-height: 20px;
        font-size: 14px;
        color: #2D3540;
      }
      .select_item:hover {
          background-color: #ebeaff;
          cursor: pointer;
      }
      .option-tooltip {
            color: #66696E;
            font-size:18px;
            vertical-align:middle;
            cursor:default;
       }
    `],
})
export class dynamicSingleSelect implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public hasDependcy: boolean = false;
  public selectedPanel: boolean = false;
  public options: any[] = [];
  public isDependOn: boolean = false;
  public DependQuestions: any;
  public clicked: boolean = false;
  public openTimer: boolean = false;

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    this.selectedPanel = false;
    if (this.Question.Validation.length > 0 && this.clicked && !this.Question.validated) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.selecteItem.name || '');
    }
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }

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
    Reflect.set(this.Question, 'selecteItem', { name: '' });
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.setOptionsFn();
    this.dependency.checkDependcyFn(this.Question);
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
    if (OleOptionResponses.length != NewOptionResponses.length) {
      this.Question.OptionResponses = NewOptionResponses;
      this.autoSaveFn();
    }
  }

  setOptionsFn() {
    var lists = this.Question.OptionResponses;
    var index;
    for (var i = 0; i < lists.length; i++) {
      this.options.push({ name: lists[i].OptionResponse.OptionDesc, tooltip: lists[i].OptionResponse.ToolTip });
      if (lists[i].OptionResponse.ResponseTxt == 'true') {
        index = i;
      }
    }
    if (index != undefined) {
      this.Question.selecteItem = this.options[index];
    }
  }

  togglePanelFn() {
    var select_panel_new = document.getElementsByClassName('select_panel_new');
    if (select_panel_new.length == 1) {
      select_panel_new[0].setAttribute("hidden", "true");
    }
    var select_panel = document.getElementsByClassName('select_panel');
    if (select_panel.length === 1) {
      select_panel[0].setAttribute("hidden", "true");
    }
    if (this.Question.disabled) { return; }
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    this.selectedPanel = !this.selectedPanel;
    this.clicked = true;
  }

  selectedItemFn(option) {
    var lists = this.Question.OptionResponses;
    this.Question.selecteItem = option;
    for (var i = lists.length; i--;) {
      lists[i].OptionResponse.ResponseTxt = 'false';
      if (this.Question.selecteItem.name == lists[i].OptionResponse.OptionDesc) {
        lists[i].OptionResponse.ResponseTxt = 'true';
      }
    }
    if (this.isDependOn) {
      this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.selecteItem.name);
    } else {
      this.Question.validated = true;
    }
    if (this.Question.QuestionDesc == "Provide the Intermediary's approximate annual revenue.") {
      this.autoSaveFn();
      return;
    }
    if (this.config.autoSave) {
      this.autoSaveFn();
    }
  }

  autoSaveFn() {
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; };
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
}
