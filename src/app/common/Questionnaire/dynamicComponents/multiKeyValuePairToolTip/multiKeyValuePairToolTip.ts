import { Component, OnInit, HostListener, EventEmitter, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
@Component({
  selector: 'dynamic-multi-keyValuePair-tooltip',
  template: `
      <section class="select_container" *ngIf="Question.display">
        <dynamic-shared-component [title]="Question.Tooltip"
            [FieldNo]="Question.QuestionNo"
            [inputHTML]="Question.QuestionDesc"
            [validataion]="Question.Validation">
        </dynamic-shared-component>
        <div class="select_content_tooltip" [ngClass]="{'select_disabled':Question.disabled ,
        'error_msg': Question.updated && !Question.validated, 'scollmore':Question.disabled && selectedItems.length > maxLength}"
            (click)="togglePanelFn();$event.stopPropagation();">
              <div *ngIf="selectedPanel">
                <Multi-KeyValue-Pair-Panel-tooltip
                  [questionId]="Question.QuestionId"
                  [options]="options"
                  [selectAll]="selectAll"
                  [hasSelectAll]="hasSelectAll"
                  (togglePanelFn)     = "togglePanelFnEmit()"
                  (selectedItemFn)    = "selectedItemFn($event)"
                  (selectAllFn)       = "selectAllFn()"
                  (unselectAllFn)     = "unselectAllFn()"
                >
                </Multi-KeyValue-Pair-Panel-tooltip>
              </div>

              <div class="selected_text" >
                <ng-container *ngIf="!Question.disabled; else disabled">
                  <div class="seletecd_item" *ngFor="let item of selectedItems.slice(0,maxLength);let itemI = index;">
                    <i class="material-icons close" (click)="deleteSelectedFn(item);$event.stopPropagation();">close</i>
                    <span>{{item.optionWordingName}} </span>
                  </div>
                </ng-container>
                <ng-template #disabled>
                  <div class="seletecd_item" *ngFor="let item of selectedItems;let itemI = index;">
                    <i class="material-icons close" (click)="deleteSelectedFn(item);$event.stopPropagation();">close</i>
                    <span>{{item.optionWordingName}} </span>
                  </div>
                </ng-template>
                <span class="selectedItems_more"  *ngIf="selectedItems.length > maxLength">
                        {{ selectedItems.length - maxLength }} +
                </span>
              </div>
        </div>
        <div [ngStyle]="{'display': selectedPanel ? 'block' : 'none'}" style="width: 100%; height:300px;"></div>
      </section>
  `,
  styles: [`
      .select_disabled{
        color:#535353;
        border: 1px solid #535353;
        background: #f5f5f5;
      }
      .select_disabled:after{
        color: #535353 !important;
      }

      .select_disabled .seletecd_item{
        background: #535353 !important;
      }

      .select_disabled .seletecd_item .close{
        display: none;
      }

      .error_msg{
        color:#B50128;
        border: 1px solid #B50128;
        background: #FFF1F4;
      }
      .error_msg:after{
        color: #B50128 !important;
      }

      .error_msg .seletecd_item{
        background: #B50128 !important;
      }

      .error_msg .seletecd_item .close{
        display: none;
      }

      ::ng-deep .regular-checkbox + label {
        box-shadow: none;
        border: 2px solid #005b9f;
        background-color: #fff;
        border-radius: 3px;
      }

      ::ng-deep .regular-checkbox + label:hover{
        background-color: #e5d3eb;
        box-shadow: #e5d3eb 0px 0px 0px 4px;
      }

      ::ng-deep .regular-checkbox:checked + label:after {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: #005b9f;
        border-radius: 2px;
      }

      ::ng-deep .regular-checkbox:checked + label:hover{
        background-color: #e5d3eb;
        box-shadow: #e5d3eb 0px 0px 0px 4px;
      }

      ::ng-deep .select_disabled .regular-checkbox + label:hover{
        box-shadow: none;
      }

      ::ng-deep .select_disabled .regular-checkbox + label {
        box-shadow: none;
        border: 2px solid #535353;
        background-color: #f5f5f5;
        border-radius: 5px;
      }

      ::ng-deep .select_disabled .regular-checkbox:checked + label:after {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: #f5f5f5;
        border-radius: 3px;
      }

      ::ng-deep .error_msg .regular-checkbox + label {
        box-shadow: none;
        border: 2px solid #B50128;
        background-color: #FFF1F4;
        border-radius: 5px;
      }

      ::ng-deep .error_msg .regular-checkbox + label:hover{
        box-shadow: none;
        background-color: #FFF1F4;
      }

      ::ng-deep .error_msg .regular-checkbox:checked + label:after {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: #B50128;
        border-radius: 3px;
      }

      .scollmore{
        overflow-y: scroll;
      }

      ::ng-deep .select_content_tooltip{
        padding: 4px 30px 4px 16px;
        border: 1px solid #005b9f;
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        outline: 0 none;
        position: relative;
        width: 350px;
        min-height:36px;
        max-height:125px;
        cursor: pointer;
        height: auto !important;
      }
      .selected_text{
        width: calc(100% - 35px);
      }
      .select_content_tooltip:after{
        content: 'expand_more';
        position: absolute;
        z-index: 1;
        right: 10px;
        top: 20%;
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        color: #005b9f;
        font-feature-settings: 'liga';
      }
      .seletecd_item{
          font-size: #fff;
          background: #005b9f;
          line-height: 20px;
          color: #fff;
          vertical-align: middle;
          padding: 2px 5px;
          overflow: hidden;
          text-overflow:ellipsis;
          display: inline-block;
          border-radius: 4px;
          margin: 4px 4px 4px 0;
          cursor: pointer;
      }
      .close{
          cursor: pointer;
          color: #fff;
          font-size: 16px;
          line-height: 20px;
          float:right;
          opacity: 1;
      }
      .selectedItems_more{
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
      }
    `],
})
export class dynamicMultiKeyValuePairTooltip implements OnInit, OnDestroy {
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public hasDependcy: boolean = false;
  public selectedPanel: boolean = false;
  public isDependOn: boolean = false;
  public selectAll: boolean = false;
  public selectedItems: any[] = [];
  public options: any[] = [];
  public maxLength: number = 3;
  public QuestionDisabled: any;
  public clicked: boolean = false;
  public openTimer: boolean = false;
  public hasSelectAll: boolean = true;
  constructor(private dependency: DependencyService) { }

  ngOnInit() {
    this.QuestionDisabled = this.config.Question.Question.disabled;
    // if (this.QuestionDisabled) {
    //   this.maxLength = 1000;
    // }
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    // if (this.Question.QuestionIdentifier.indexOf('noselectall') > -1 ){
    //   this.hasSelectAll = false;
    // }
    this.hasSelectAll = false;
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    if (!Reflect.has(this.Question, 'timer')) {
      Reflect.set(this.Question, 'timer', null);
    }

    this.initOptionsFn();
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }

  ngOnDestroy() {
    if (this.Question.timer) {
      this.autoSaveFn();
      clearInterval(this.Question.timer);
    }
  }

  togglePanelFn() {
    var DatepickerClose = document.getElementsByTagName("bs-datepicker-container");
    if (DatepickerClose.length == 1) {
      DatepickerClose[0].setAttribute("hidden", "hidden");
    }
    if (this.Question.disabled) { return; }
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    this.selectedPanel = !this.selectedPanel;
    this.clicked = true;
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

  togglePanelFnEmit() {
    this.selectedPanel = false;
    if (this.Question.Validation.length > 0 && this.clicked) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
  }

  initOptionsFn() {
    var key = this.Question.QuestionIdentifier || 'OGs';
    if (this.Question.QuestionIdentifier.indexOf('OGs') > -1) {
      key = 'OGs';
    }
    this.options = this.dependency.extraData.ExtraData[key];
    this.options.forEach(e => {
      Reflect.set(e, 'checked', false);
    });
    this.initSelectedFn();
  }

  initSelectedFn() {
    var ResponseTxt = this.Question.OptionResponses[1].OptionResponse.ResponseTxt;
    if (!ResponseTxt) { return []; }
    var arr = ResponseTxt.split('|||');
    arr.shift();
    this.options.forEach((ele, index) => {
      arr.forEach((e, i) => {
        if (ele.optionWordingName == e) {
          this.selectedItems.push({
            "id": index,
            "optionWordingName": ele.optionWordingName,
            "optionWordingId": ele.optionWordingId,
            "toolTip": ele.toolTip
          });
          ele.checked = true;
        }
      });
    });
    var IsSelectAll = this.options.every(e => {
      return e.checked == true;
    });
    if (IsSelectAll) {
      this.selectAll = true;
    }
  }

  selectAllFn() {
    // this.unselectAll  = false;
    this.selectAll = !this.selectAll;
    this.options.forEach((ele, index) => {
      ele.checked = true;
    });
    var Question = this.Question;
    this.selectedItems = [];
    Question.OptionResponses[1].OptionResponse.ResponseTxt = '|||';
    Question.OptionResponses[0].OptionResponse.ResponseTxt = '|||';
    this.options.forEach(ele => {
      this.selectedItems.push({
        "id": this.selectedItems.length,
        "optionWordingName": ele.optionWordingName,
        "optionWordingId": ele.optionWordingId,
        "toolTip": ele.toolTip
      });
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt + ele.optionWordingName + '|||';
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt + ele.optionWordingId + '|||';
    });
    Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.substring(0, Question.OptionResponses[1].OptionResponse.ResponseTxt.lastIndexOf('|||'));
    Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.substring(0, Question.OptionResponses[0].OptionResponse.ResponseTxt.lastIndexOf('|||'));
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt) {
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (Question.OptionResponses[0].OptionResponse.ResponseTxt) {
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (this.config.autoSave && this.Question.validated) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  unselectAllFn() {
    this.selectAll = false;
    // this.unselectAll  = !this.unselectAll;
    this.options.forEach((ele, index) => {
      ele.checked = false;
    });
    var Question = this.Question;
    this.selectedItems = [];
    Question.OptionResponses[1].OptionResponse.ResponseTxt = null;
    Question.OptionResponses[0].OptionResponse.ResponseTxt = null;
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
    if (this.config.autoSave && this.Question.validated) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  selectedItemFn(option) {
    // this.unselectAll  = false;
    this.selectAll = false;
    if (option.checked) {
      this.addSelectedFn(option);
    } else {
      this.deleteSelectedFn(option);
    }
    if (this.isDependOn) {
      this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
    if (this.config.autoSave && this.Question.validated) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  deleteSelectedFn(option) {
    this.selectAll = false;
    var Question = this.Question
    if (Question.disabled) { return; }
    var ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt;
    var ResponseCD = Question.OptionResponses[0].OptionResponse.ResponseTxt;
    var name = ResponseTxt.split('|||');
    var CD = ResponseCD.split('|||');
    name.shift();
    CD.shift();
    for (var i = name.length; i--;) {
      if (name[i].trim() == option.optionWordingName.trim()) {
        name.splice(i, 1);
        break;
      }
    }
    var selectedItems = this.selectedItems;
    for (var k = selectedItems.length - 1; k >= 0; k--) {
      if (selectedItems[k].optionWordingName.trim() == option.optionWordingName.trim()) {
        selectedItems.splice(k, 1);
        break;
      }
    }
    for (var j = CD.length; j--;) {
      if (CD[j].trim() == option.optionWordingId.trim()) {
        CD.splice(j, 1);
        break;
      }
    }
    this.options.forEach((ele, index) => {
      if (ele.optionWordingName.trim() == option.optionWordingName.trim()) {
        ele.checked = false;
      }
    });
    Question.OptionResponses[1].OptionResponse.ResponseTxt = '|||' + name.join('|||');
    Question.OptionResponses[0].OptionResponse.ResponseTxt = '|||' + CD.join('|||');
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt == '|||') {
      this.Question.validated = false;
      Question.OptionResponses[0].OptionResponse.ResponseTxt = null;
      Question.OptionResponses[1].OptionResponse.ResponseTxt = null;
    }
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt) {
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (Question.OptionResponses[0].OptionResponse.ResponseTxt) {
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
    if (this.config.autoSave && this.Question.validated) {
      this.openTimer = true;
      if (!this.Question.timer) {
        this.autoSaveFn();
      }
    }
  }

  addSelectedFn(option) {
    var Question = this.Question
    var ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt || '';
    var ResponseCD = Question.OptionResponses[0].OptionResponse.ResponseTxt || '';
    ResponseTxt = ResponseTxt == null ? '' : ResponseTxt;
    ResponseCD = ResponseCD == null ? '' : ResponseCD;
    var name = ResponseTxt.split('|||');
    var CD = ResponseCD.split('|||');
    name.shift();
    name.push(option.optionWordingName);
    CD.shift();
    CD.push(option.optionWordingId);
    this.selectedItems.push({
      "id": this.selectedItems.length,
      "optionWordingName": option.optionWordingName,
      "optionWordingId": option.optionWordingId,
      "toolTip": option.toolTip
    });
    Question.OptionResponses[1].OptionResponse.ResponseTxt = '|||' + name.join('|||');
    Question.OptionResponses[0].OptionResponse.ResponseTxt = '|||' + CD.join('|||');
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt) {
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }

    if (Question.OptionResponses[0].OptionResponse.ResponseTxt) {
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    this.Question.validated = true;
    var check = this.options.every(e => e.checked == true);
    if (check) {
      this.selectAll = true;
    }
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
      this.config.autoSave.callBack(param);
      this.config.autoSave.updated.flage = true;
    }
  }
}

@Component({
  selector: 'Multi-KeyValue-Pair-Panel-tooltip',
  template: `
  <section>
    <ul class="select_panel_tooltip" (click)="$event.stopPropagation();">
      <li class="select_item" *ngIf="hasSelectAll">
        <div class="select_width">
         <input  class="regular-checkbox" type="checkbox"   (change)="ToggleSelectAllFn();$event.stopPropagation();"
          id="select_all" [(ngModel)]="selectAll"
          name="questionId" />
         <label for="select_all" ><span class="for-wave">wave</span></label>
          Select All
         </div>
        </li>
      <div class="search_con">
      <span class="material-icons" [ngClass]="{'material-icons-style':hasSelectAll ,'material-icons-style-no-selectall': !hasSelectAll}">search</span>
        <div class="input_con">
          <input aria-label="input" class="search_content" type="text" placeholder="Search"
          (keyup)="PanelSearchValueFn(searchValue);$event.stopPropagation();"
          [(ngModel)]="searchValue" title=""/>
        </div>
      </div>
      <li class="select_item" *ngFor="let option of panelOptions;let optionI = index;" (click)="valueChangeFn(option);$event.stopPropagation();">
      <div class ="select_width" [attr.for]=" 'multi_keyValuePair' + questionId + optionI " >
      <input  class="regular-checkbox" type="checkbox"   (change)="valueChangeFn(option);$event.stopPropagation();"
          id="{{'multi_keyValuePair' + questionId + optionI }}" [checked]="option.checked"
          [name]="questionId" >
         <label [attr.for]=" 'multi_keyValuePair' + questionId + optionI"></label>
         {{option.optionWordingName}}
          <span class="material-icons option-tooltip" [title]="option.toolTip || '' " *ngIf="option.toolTip!=null && option.tooltip!=''">info</span>
         </div>
      </li>
    </ul>
  </section>
  `,
  styles: [`
      .select_panel_tooltip{
        position: absolute;
        background: #fff;
        top:100%;
        width: 100%;
        left: 0;
        margin-top: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 300px;
        z-index: 10;
        box-shadow: 0px 1px 5px rgba(153,153,153,.3);
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
      .search_con{
        position: relative;
        border-bottom: 1px solid #cacece;
        border-top: 1px solid #cacece;
        padding-left: 20px;
      }

      .search_con {
        width: 350px!important;
    }
      .search_con:after{
          display:block;
          clear:both;
          content:"";
          visibility:hidden;
          height:0;
          zoom:1;
      }
      .search_icon{
          margin-top: 2px;
          float:left;
      }
      .input_con{
          width: 100%;
      }
      .search_content{
          width: 100% !important;
          font-size: 12px !important;
          height: 35px !important;
          border: none !important;
          outline: none !important;
          margin: 0 !important;
          padding-left: 15px;
      }
      .select_width{
        width: 100%;
        cursor: pointer;
      }
      .material-icons-style{
        position: absolute;
        left: 9px;
        top: 52px;
        font-size: 18px;
        color: #757575;
      }

      .material-icons-style-no-selectall{
        position: absolute;
        left: 9px;
        top: 10px;
        font-size: 18px;
        color: #757575;
      }
      .option-tooltip {
         color: #66696E;
         font-size:18px;
         vertical-align:middle;
         cursor:default;
       }
       .regular-checkbox {
        display: none;
      }

      .regular-checkbox+label {
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
        background-color: #f9f8fd;
      }
      .regular-checkbox+label {
        box-shadow: none;
        border: 2px solid #005b9f;
        background-color: #fff;
        border-radius: 3px;
        z-index: 1;
      }
      .regular-checkbox:checked + label:after {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: #005b9f;
        border-radius: 2px;
    }
    .regular-checkbox:checked+label:after {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #005b9f;
      border-radius: 2px;
      z-index: 7;
  }
  .regular-checkbox:checked+label:after {
    content: ' ';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 2px;
    background: #005b9f;
    left: 2px;
    font-size: 32px;
  }
  `],
  inputs: [
    'options',
    'questionId',
    'selectAll',
    'unselectAll',
    'hasSelectAll'
  ],
  outputs: [
    'togglePanelFn',
    'selectedItemFn',
    'selectAllFn',
    'unselectAllFn'
  ]
})
export class dynamicMultiKeyValuePairPanelTooltip implements OnInit {
  public questionId: any;
  public options: any;
  public searchValue: string;
  public selectAll: boolean;
  public unselectAll: boolean;
  public togglePanelFn = new EventEmitter<any>();
  public selectedItemFn = new EventEmitter<any>();
  public selectAllFn = new EventEmitter<any>();
  public unselectAllFn = new EventEmitter<any>();
  public hasSelectAll: boolean;
  public panelOptions: any;
  constructor(private dependency: DependencyService) { }

  ngOnInit() {
    this.panelOptions = this.options;
  }

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    this.togglePanelFn.emit();
  }

  PanelSearchValueFn(searchValue) {
    this.searchValueFn(searchValue);
  }

  ToggleSelectAllFn() {
    console.log();
    if (this.selectAll) {
      this.selectAllFn.emit();
      return;
    }
    this.unselectAllFn.emit();
  }

  valueChangeFn(option) {
    option.checked = !option.checked;
    this.selectedItemFn.emit(option);
  }

  searchValueFn(value) {
    this.panelOptions = this.options.filter(e => {
      return e.optionWordingName.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
  }
}
