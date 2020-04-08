import { Component, OnInit, Input } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
// import { Events } from '../../../CaseDetails/events/events';
@Component({
    selector: 'dynamic-range',
    template: `
    <section class="input-con" *ngIf="Question.display">
        <dynamic-shared-component [title]="Question.Tooltip"
              [FieldNo]="Question.QuestionNo"
              [inputHTML]="Question.QuestionDesc"
              [validataion]="Question.Validation">
        </dynamic-shared-component>
        <div class="bip-range-wrap">
        <input class="bip-range-ctrl"  type="radio" name="bar1" (click)="changeValueFn('Green')" id="range1" [checked]="range1Chk">
        <input class="bip-range-ctrl"  type="radio" name="bar1" (click)="changeValueFn('Yellow')" id="range2" [checked]="range2Chk">
        <input class="bip-range-ctrl"  type="radio" name="bar1" (click)="changeValueFn('Red')" id="range3" [checked]="range3Chk">
        <div class="bip-range-con-wrap">
            <div class="bip-range-con-item"></div>
            <div class="bip-range-con-item"></div>
        </div>
        <div class="bip-range-btn-wrap">
            <label class="bip-range-ctrl-btn" for="range1"><span style="display: none;">wave</span></label>
            <label class="bip-range-ctrl-btn" for="range2"><span style="display: none;">wave</span></label>
            <label class="bip-range-ctrl-btn" for="range3"><span style="display: none;">wave</span></label>
        </div>
        <div class="bip-range-tt-wrap">
            <div class="bip-range-tt-con">
                green
            </div>
            <div class="bip-range-tt-con">
                yellow
            </div>
            <div class="bip-range-tt-con">
                red
            </div>
        </div>
    </div>
    </section>
  `,
    /* old html
      <input type="range" min="1" max="3" class="dynamic_range bip-range-con" [disabled]=" Question.disabled"
                [(ngModel)]="value"   />
     */
    styles: [`
      .input-con{
        padding:10px 0;
      }
      .dynamic_range{
        height: 10px;
        width: 100%;
        border-radius: 10px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        background: #e43039;
      }
      .dynamic_range::-webkit-slider-runnable-track {
          height: 10px;
          border-radius: 10px;
          background: #e43039;
          -webkit-appearance: none;
          appearance: none;
      }
      .dynamic_range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          margin-top: -5px;
          background: #e43039;
          border-radius: 50%;
      }
      .input_disabled{
        background: #f5f5f5;
      }
      .bip-range-wrap {
        position: relative;
        width: 300px;
    }
    .bip-range-con-wrap {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        background-color: #f9f8fd;
    }
    .bip-range-con-item {
        position: relative;
        height: 10px;
        flex: 1;
    }
    .bip-range-con-item:first-of-type {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .bip-range-con-item:last-of-type {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(2):checked ~ .bip-range-con-wrap .bip-range-con-item:nth-child(-n+1) {
        background-color: #f6c652;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(3):checked ~ .bip-range-con-wrap .bip-range-con-item:nth-child(-n+2) {
        background-color: #e43039;
    }
    .bip-range-ctrl {
        display: none;
    }
    .bip-range-btn-wrap {
        position: absolute;
        top: -5px;
        left: 0;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .bip-range-ctrl-btn {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        opacity: 0;
        cursor: pointer;
    }
    .bip-range-ctrl-btn::after {
        content: '';
        position: absolute;
        left: -10px;
        right: -10px;
        top: -5px;
        bottom: -5px;
    }
    .bip-range-ctrl-btn:nth-of-type(1) {
        opacity: 1;
        background-color: #f9f8fd;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(1) ~ .bip-range-ctrl:checked ~ .bip-range-btn-wrap .bip-range-ctrl-btn:nth-of-type(1) {
        opacity: 0;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(1):checked ~ .bip-range-btn-wrap .bip-range-ctrl-btn:nth-of-type(1) {
        background-color: #2eab81;
        opacity: 1;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(2):checked ~ .bip-range-btn-wrap .bip-range-ctrl-btn:nth-of-type(2) {
        background-color: #f6c652;
        opacity: 1;
    }
    .bip-range-wrap .bip-range-ctrl:nth-of-type(3):checked ~ .bip-range-btn-wrap .bip-range-ctrl-btn:nth-of-type(3) {
        background-color: #e43039;
        opacity: 1;
    }
    .bip-range-tt-wrap {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        text-transform: capitalize;
    }
    .bip-range-label {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .bip-range-label-tt {
        text-transform: capitalize;
    }
    .bip-range-con {
        padding: 0;
        width: 100%;
        border-radius: 10px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    .bip-range-con::-ms-track {
        height: 10px;
        border-radius: 10px;
        border: 1px solid #e43039;
        color: transparent; /*去除轨道内的竖线*/
    }
    .bip-range-con::-ms-thumb {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #e43039;
    }
    .bip-range-con::-ms-fill-lower {
        height: 10px;
        border-radius: 10px;
        background: #e43039;
    }
    .bip-range-con::-ms-fill-upper {
        height: 10px;
        border-radius: 10px;
        background: #ffffff;
    }
    .bip-range-con:focus::-ms-fill-lower {
        background: #e43039;
    }
    .bip-range-con:focus::-ms-fill-upper {
        background: #ffffff;
    }
    .bip-range-con:focus {
        outline: none;
    }
    .bip-range-con::-webkit-slider-runnable-track {
        height: 12px;
        border-radius: 10px;
        border: 1px solid #e43039;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    .bip-range-con::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        margin-top: -5px;
        background: #e43039;
        border-radius: 50%;
    }
    .bip-range-con::-moz-range-track {
        height: 10px;
        border-radius: 10px;
        background-color: #ffffff;
        border: 1px solid #e43039;
    }
    .bip-range-con::-moz-range-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        margin-top: -5px;
        background: #ffffff;
        border-radius: 50%;
    }
    .bip-range-con::-moz-range-progress {
        background: #e43039;
        height: 10px;
        border-radius: 10px;
    }
    .bip-wave{
        display:none;
    }
    `],
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
