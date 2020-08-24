import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';

@Component({
    selector: 'dynamic-Country-Select',
    templateUrl: './countryselect.html',
    styleUrls: ['./countryselect.scss']
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
    constructor(private dependency: QuestionService) { }

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
        OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
        const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId'); // 取出id
        const duplication = Array.from(new Set(ids));                               // 去重id
        if (ids.length !== duplication.length) { // 有重复, 去重
        this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
