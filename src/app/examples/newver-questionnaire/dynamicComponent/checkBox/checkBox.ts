import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
  selector: 'dynamic-input',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.scss']
})
export class dynamicCheckBox implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  // public validataion      : any;

  public checkboxs: any[] = [];
  public isDependOn: boolean = false;
  public value: string = '';
  public DependQuestions: any;
  //public timer : any;
  public openTimer: boolean = false;
  constructor(
    private dependency: DependencyService,
  ) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }

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

    this.checkboxs = this.Question.OptionResponses;
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
    this.dependency.setRepeatForAppDetailsFn(this.Question);
    var flage = this.checkboxs.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    this.Question.flage = flage;
    // console.log('-------------------------------------');
    // console.log('this is the dynamicInput',this.Question);
    // console.log('-------------------------------------');
  }

  ngOnDestroy() {
    if (this.Question.timer) {
      this.autoSaveFn();
      clearInterval(this.Question.timer);
    }
  }

  valueChangeFn(item) {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    this.Question.OptionResponses.forEach(e => {
      if (!e.OptionResponse.ResponseTxt) {
        e.OptionResponse.ResponseTxt = 'false';
      }
    });
    item.OptionResponse.ResponseTxt = !item.OptionResponse.ResponseTxt || item.OptionResponse.ResponseTxt == 'false' ? 'true' : 'false';
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.initValadationFn(this.checkboxs);
    } else {
      this.Question.validated = true;
    }

    if (this.isDependOn) {
      this.DependQuestions = this.dependency.sendDependFn(this.Question, this.checkboxs, '');
    }

    if (item.OptionResponse.OptionDesc.indexOf("Approval term limited") > -1) {
      this.dependency.setRepeatDisableForAppDetailsFn(this.Question.QuestionId, item.OptionResponse.RepeatSectionIdentifier, item.OptionResponse.ResponseTxt)
    }

    if (this.config.autoSave) {
      if (this.config.autoSave.selected != undefined && item.OptionResponse.ResponseTxt == 'true') {
        this.config.autoSave.selected += 1;
      } else if (this.config.autoSave.selected != undefined && item.OptionResponse.ResponseTxt != 'true') {
        this.config.autoSave.selected -= 1;
      }
    }

    if (this.config.autoSave && this.Question.validated && this.config.autoSave.callBack) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
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

  initValadationFn(options) {
    var flage = options.some(e => {
      return e.OptionResponse.ResponseTxt == 'true';
    });
    this.Question.flage = flage;
    flage ? this.dependency.setValidationFn(this.Question, flage + '')
      : this.dependency.setValidationFn(this.Question, '');
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

