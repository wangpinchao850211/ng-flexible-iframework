import { Component, OnInit, Input } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
// import { Events } from '../../../CaseDetails/events/events';
@Component({
    selector: 'dynamic-range',
    templateUrl: './range.html',
    styleUrls: ['./range.scss']
})
export class dynamicRange implements OnInit {
    @Input() crrValue: any;
    public config: any;
    public Question: any;
    public isAutoSave: any;
    public validataion: any;
    public value: string = '';
    public DependQuestions: any;
    // public progress         : any;
    public isDependOn: boolean = false;
    public range1Chk: boolean = false;
    public range2Chk: boolean = false;
    public range3Chk: boolean = false;

    // constructor(private evants: Events, public dependency: DependencyService) { }
    constructor(public dependency: DependencyService) { }

    ngOnInit() {
        this.value = this.config.Question.Question.OptionResponses[0].OptionResponse.ResponseTxt || '';
        this.Question = this.config.Question.Question;
        this.validataion = this.Question.Validation;
        this.Question.disabled = this.dependency.setDisabledFn(this.Question);

        this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
        this.dependency.checkDependcyFn(this.Question);

        for (var i = 0; i < this.Question.OptionResponses.length; i++) {
            if (this.Question.OptionResponses[i].OptionResponse.ResponseTxt == "true") {
                if (this.Question.OptionResponses[i].OptionResponse.OptionDesc == "Green") {
                    this.range1Chk = true;
                    this.value = "Green";
                } else if (this.Question.OptionResponses[i].OptionResponse.OptionDesc == "Yellow") {
                    this.range2Chk = true;
                    this.value = "Yellow";
                } else if (this.Question.OptionResponses[i].OptionResponse.OptionDesc == "Red") {
                    this.range3Chk = true;
                    this.value = "Red";
                }
                // this.evants.chooseCRR.emit(true);
                break;
            }
        }
    }

    changeValueFn(value) {
        this.Question.OptionResponses.forEach(element => {
            if (element.OptionResponse.OptionDesc == value) {
                element.OptionResponse.ResponseTxt = 'true';
            } else {
                element.OptionResponse.ResponseTxt = 'false';
            }
        });
        this.Question.validated = true;
        // this.evants.chooseCRR.emit(true);
        // this.evants.crrValue.emit(value);
        this.setDependencyFn();
    }

    autoSaveFn() {
        if (this.isAutoSave) {
            if (!this.Question.autoSave) { return; }
            if (!this.config.autoSave.callBack) { return; }
            var param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
            if (this.DependQuestions) {
                var dependData = this.dependency.fomartAutoSaveDependcyDataFn(this.DependQuestions, this.config.sectionId);
                param = [...param, ...dependData];
            }
            this.config.autoSave.callBack(param).then(() => {
                this.config.autoSave.updated.flage = true;
            });
        }
        
    }

    setDependencyFn() {
        if (this.isDependOn) {
            this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
            console.log('send');
        }
    }
}
