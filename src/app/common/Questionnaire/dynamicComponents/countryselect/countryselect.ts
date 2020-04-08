import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';

@Component({
    selector: 'dynamic-Country-Select',
    template: `
      <section class="select_container" *ngIf="Question.display">
              <dynamic-shared-component [title]="Question.Tooltip"
                  [FieldNo]="Question.QuestionNo"
                  [inputHTML]="Question.QuestionDesc"
                  [validataion]="Question.Validation">
              </dynamic-shared-component>

              <input aria-label="input" class="identifier_input"   type="text"
              [(ngModel)]="Question.seartchValue" (keyup)="keyupSearchFn($event)" title=""
              (click)="togglePanelFn();$event.stopPropagation();"
              [disabled]="Question.disabled"
             [ngClass]="{'input_disabled':Question.disabled,
              'error_msg':Question.updated && !Question.validated }" />
              <section class="select_panel_identifier" *ngIf="selectedPanel" (click)="$event.stopPropagation();" >
                 <ul >
                   <li class="select_item" (click)="selectedItemFn(option)" *ngFor="let option of options" >
                       {{option.optionWordingName}}
                   </li>
                 </ul>
                 </section>
              <ng-container  *ngIf="Question.updated && !Question.validated">
              <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
              </dynamic-ErrorMsg-component>
              </ng-container>
      </section>
  `,
    styles: [`
      .select_disabled{
        color:#535353;
        background: #f5f5f5;
        border: 1px solid #535353 !important;
      }
      .identifier_input{
        padding: 8px 16px;
        border: 1px solid #8C44A3;
        background-color: #fff;
        border-radius: 4px;
        font-size: 14px;
        width: 350px !important;
        color: #2D3540;
      }
      .input_disabled{
        background: #f5f5f5;
        color: #535353;
        border: 1px solid #535353;
      }
      .identifier_input.error_msg {
        border: 1px solid #B50128;
        background: #FFF1F4;
        color: #B50128;
      }
      .select_disabled::after{
        color:#535353 !important;
      }
      .select_content.error_msg {
        border: 1px solid #B50128 !important;
        background: #FFF1F4;
        color: #B50128;
      }

      .select_content{
        padding: 0 30px 0 16px;
        height: 38px;
        line-height: 34px;
        border: 1px solid #8C44A3;
        border-radius: 4px;
        font-size: 14px;
        display: block;
        outline: 0 none;
        position: relative;
        width: 350px;
      }
      .selected_text{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .select_panel_identifier{
        background: #FFFFFF;
        width: 350px;
        z-index: 10;
        overflow-y: scroll;
        max-height: 300px;
        box-shadow: 0 2px 7px rgba(153,153,153,.3);
        margin-bottom: 10px;
      }
      .select_item{
        padding: 10px 14px;
        line-height: 20px;
        font-size: 14px;
        color: #2D3540;
      }
      .select_item:hover {
          background-color: #ebeaff;
          cursor: pointer;
      }
    `]
})
export class dynCountrySelect implements OnInit, OnDestroy {
    public selected: boolean = false;
    public config: any;
    public Question: any;
    public isAutoSave: any;
    public isDependOn: boolean = false;
    public selectedPanel: boolean = false;
    public options: any[] = [];
    public DependQuestions: any;
    public clicked: boolean = false;
    public openTimer: boolean = false;
    constructor(private dependency: DependencyService) { }

    @HostListener('document:click', ['$event']) onClick(btn: Event) {
        this.selectedPanel = false;
    }

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
        if (!Reflect.has(this.Question, 'selectedItem')) {
            Reflect.set(this.Question, 'selectedItem', {});
        }
        if (!Reflect.has(this.Question, 'seartchValue')) {
            Reflect.set(this.Question, 'seartchValue', '');
        }
        if (this.Question.QuestionIdentifier == 'PrimaryCountries' && !Reflect.has(this.Question, 'sectionId')) {
            Reflect.set(this.Question, 'sectionId', this.config.sectionId);
        }
        this.setOptionsFn();
        this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
        this.dependency.checkDependcyFn(this.Question);
        if (!this.Question.seartchValue || this.Question.seartchValue == '') {
            this.Question.validated = false;
        }
        setTimeout(() => {
            this.dependency.resetProgressBar(this.Question);
        }, 0);
        if (!this.dependency.IsNew) {
            this.Question.updated = true;
        }
        console.log(this.Question);
    }

    ngOnDestroy() {
        if (this.Question.timer) {
            this.autoSaveFn();
            clearInterval(this.Question.timer);
        }
    }

    setOptionsFn() {
        var Question = this.Question;
        if (!Reflect.has(Question, 'options')) { Reflect.set(Question, 'options', []); }
        if (!!Question.OptionResponses[1].OptionResponse.ResponseTxt) {
            this.Question.seartchValue = Question.OptionResponses[1].OptionResponse.ResponseTxt;
        }
        if (Question.Dependency && Question.Dependency.length > 0) {

            this.setDefualtSelectedFn(Question.OptionResponses[0].OptionResponse.ResponseTxt);
            return;
        }
        this.options = this.dependency.extraData.ExtraData['Countries'].slice(1);
        Question.options = this.dependency.extraData.ExtraData['Countries'].slice(1);
        this.setDefualtSelectedFn(Question.OptionResponses[0].OptionResponse.ResponseTxt);
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

    setDefualtSelectedFn(CD) {
        var Question = this.Question;
        var index;
        for (var i = Question.options.length; i--;) {
            if (Question.options[i].optionWordingId == CD) {
                index = i;
            }
        }
        if (index != undefined) {
            Question.selectedItem = Question.options[index];
        }
    }

    togglePanelFn() {
        if (this.Question.disabled) { return; };
        this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
        this.options = this.Question.options;
        this.selectedPanel = !this.selectedPanel;
        this.clicked = true;
    }

    searchValueFn(value) {
        this.options = this.Question.options.filter(e => {
            return e.optionWordingName.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        });
    }

    keyupSearchFn(param) {
        this.selected = false;
        this.Question.OptionResponses[0].OptionResponse.ResponseTxt = null;
        this.Question.OptionResponses[1].OptionResponse.ResponseTxt = null;
        if (!this.Question.seartchValue || this.Question.seartchValue == '') {
            this.selectedPanel = false;
            if (this.Question.Validation.length > 0) {
                this.dependency.setValidationFn(this.Question, '');
                this.Question.updated = true;
            }
            if (this.isDependOn) {
                this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
            }
            return;
        }
        this.selectedPanel = true;
        this.searchValueFn(this.Question.seartchValue);
        this.dependency.setValidationFn(this.Question, '');
        this.Question.validated = false;
        this.Question.updated = true;
        this.dependency.allValidated = this.dependency.getAllvalidatedFn(this.Question.tabIndex);
    }

    selectedItemFn(option) {
        this.Question.selectedItem = option;
        this.selected = true;
        this.selectedPanel = false;
        this.Question.seartchValue = option.optionWordingName;
        this.Question.OptionResponses[0].OptionResponse.ResponseTxt = this.Question.selectedItem.optionWordingId;
        this.Question.OptionResponses[1].OptionResponse.ResponseTxt = this.Question.selectedItem.optionWordingName;
        if (this.Question.Validation.length > 0) {
            this.Question.updated = true;
            this.dependency.setValidationFn(this.Question, option.optionWordingName);
        }
        if (this.isDependOn) {
            this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
        }
        if (this.config.autoSave && this.Question.validated) {
            this.openTimer = true;
            if (!this.Question.timer) {
                this.autoSaveFn();
                this.Question.timer = setInterval(() => {
                    if (this.openTimer) {
                        this.autoSaveFn();
                    }
                }, 2000)
            }
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
            this.config.autoSave.callBack(param).then(res => {
                this.config.autoSave.updated.flage = true;
                if (!Reflect.has(this.Question, "lastSave")) {
                    Reflect.set(this.Question, "lastSave", res.inputValue);
                } else {
                    this.Question.lastSave = res.inputValue;
                }
            });
        }

    }
}
