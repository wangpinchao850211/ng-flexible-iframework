import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-single-select',
  templateUrl: './singleSelect.html',
  styleUrls: ['./singleSelect.scss']
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

  constructor(private dependency: QuestionService) { }

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
    OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
    const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId'); // 取出id
    const duplication = Array.from(new Set(ids));                               // 去重id
    if (ids.length !== duplication.length) { // 有重复, 去重
      this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
