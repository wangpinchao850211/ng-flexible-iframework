import { Component, OnInit, DoCheck, HostListener, EventEmitter, OnDestroy } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
@Component({
  selector: 'dynamic-multi-keyValuePair',
  templateUrl: './multiKeyValuePair.html',
  styleUrls: ['./multiKeyValuePair.scss']
})
export class dynamicMultiKeyValuePair implements OnInit, DoCheck, OnDestroy {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.Question.timer) {
      this.autoSaveFn();
    }
  }
  public config: any;
  public Question: any;
  public isAutoSave: any;
  public hasDependcy: boolean = false;
  public selectedPanel: boolean = false;
  public isDependOn: boolean = false;
  public selectAll: boolean = false;
  public unselectAll: boolean;
  public options: any[] = [];
  public TierId: any;
  public DependQuestions: any;
  public clicked: boolean = false;
  public maxLength: number = 3;
  public openTimer: boolean = false;
  constructor(private dependency: DependencyService) { }

  ngOnInit() {
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    this.TierId = this.dependency.extraData.ExtraData.TierId;
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    if (!Reflect.has(this.Question, 'timer')) {
      Reflect.set(this.Question, 'timer', null);
    }
    Reflect.set(this.Question, 'selectedItems', []);
    Reflect.set(this.Question, 'default', false);
    this.initOptionsFn();
    this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
    this.dependency.checkDependcyFn(this.Question);
    this.selectAllFn();
    console.log('dynKeyValueSelectIdentifier', this.Question);
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

  togglePanelFn() {
    if (this.Question.disabled) { return; };
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    if (this.Question.selectedItems.length == 0) {
      for (var i = 0; i < this.options.length; i++) {
        this.options[i].checked = false;
      }
      this.selectAll = false;
      this.unselectAll = false;
    }
    this.selectedPanel = !this.selectedPanel;
    this.clicked = true;
  }

  togglePanelFnEmit() {
    this.selectedPanel = false;
    if (this.Question.Validation.length > 0 && this.clicked) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '');
    }
  }

  initOptionsFn() {
    this.options = this.dependency.extraData.ExtraData['Countries'];
    if (this.options[0].optionWordingName == 'Global') {
      this.options.splice(0, 1); // delete Global
    }
    this.options = this.options.filter(e => {
      return e.tierId <= this.TierId;
    });
    this.options.forEach(e => {
      Reflect.set(e, 'checked', true);
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
          this.Question.selectedItems.push({
            "id": index,
            "optionWordingName": ele.optionWordingName,
            "optionWordingId": ele.optionWordingId,
            "tierId": ele.tierId
          });
          ele.checked = true;
        }
      });
    });
  }

  selectAllFn() {
    this.unselectAll = false;
    this.selectAll = !this.selectAll;
    this.Question.default = false;
    this.options.forEach((ele, index) => {
      ele.checked = true;
    });
    var Question = this.Question;
    this.Question.selectedItems = [];
    Question.OptionResponses[1].OptionResponse.ResponseTxt = '|||';
    Question.OptionResponses[0].OptionResponse.ResponseTxt = '|||';
    this.options.forEach(ele => {
      this.Question.selectedItems.push({
        "id": this.Question.selectedItems.length,
        "optionWordingName": ele.optionWordingName,
        "optionWordingId": ele.optionWordingId,
        'tierId': ele.tierId
      });
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt + ele.optionWordingName + '|||';
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt + ele.optionWordingId + '|||';
    });

    Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.substring(0, Question.OptionResponses[1].OptionResponse.ResponseTxt.lastIndexOf('|||'));
    Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.substring(0, Question.OptionResponses[0].OptionResponse.ResponseTxt.lastIndexOf('|||'));

    if (Question.OptionResponses[1].OptionResponse.ResponseTxt) {
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (Question.OptionResponses[0].OptionResponse.ResponseTxt) {
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    this.Question.validated = true;
    this.dependency.resetProgressBar(Question);
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

  unselectAllFn() {
    this.selectAll = false;
    this.unselectAll = !this.unselectAll;
    this.Question.default = false;
    this.options.forEach((ele, index) => {
      ele.checked = false;
    });
    var Question = this.Question;
    this.Question.selectedItems = [];
    Question.OptionResponses[1].OptionResponse.ResponseTxt = null;
    Question.OptionResponses[0].OptionResponse.ResponseTxt = null;
    this.Question.validated = false;
    this.dependency.resetProgressBar(Question);
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

  selectedItemFn(option) {
    this.unselectAll = false;
    this.selectAll = false;
    this.Question.default = false;
    if (option.checked) {
      this.addSelectedFn(option);
    } else {
      this.deleteSelectedFn(option);
    }
    if (this.isDependOn) {
      this.DependQuestions = this.dependency.sendDependFn(this.Question, this.Question.OptionResponses, '');
    }
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.Question.OptionResponses[1].OptionResponse.ResponseTxt);
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

  deleteSelectedFn(option) {
    var Question = this.Question
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
    var selectedItems = this.Question.selectedItems;
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
    // console.log(Question);
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt) {
      Question.OptionResponses[1].OptionResponse.ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (Question.OptionResponses[0].OptionResponse.ResponseTxt) {
      Question.OptionResponses[0].OptionResponse.ResponseTxt = Question.OptionResponses[0].OptionResponse.ResponseTxt.replace("||||||", "|||");
    }
    if (Question.OptionResponses[1].OptionResponse.ResponseTxt == '|||') {
      this.Question.validated = false;
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

  addSelectedFn(option) {
    var Question = this.Question
    var ResponseTxt = Question.OptionResponses[1].OptionResponse.ResponseTxt;
    var ResponseCD = Question.OptionResponses[0].OptionResponse.ResponseTxt;
    ResponseTxt = ResponseTxt == null ? '' : ResponseTxt;
    ResponseCD = ResponseCD == null ? '' : ResponseCD;
    var name = ResponseTxt.split('|||');
    var CD = ResponseCD.split('|||');
    name.shift();
    name.push(option.optionWordingName);
    CD.shift();
    CD.push(option.optionWordingId);
    this.Question.selectedItems.push({
      "id": this.Question.selectedItems.length,
      "optionWordingName": option.optionWordingName,
      "optionWordingId": option.optionWordingId,
      'tierId': option.tierId
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
          this.Question.lastSave = res.inputValue
        }
      });
    }

  }


  ngDoCheck() {
    var Question = this.Question;
    if (Question.default) {
      this.selectAllFn();
    }
  }
}


@Component({
  selector: 'Multi-KeyValue-Pair-Panel',
  template: `
  <section>
    <ul class="select_panel" (click)="$event.stopPropagation();">
      <li class="select_item" (click)="PanelSelectAllFn();">
         <input  class="regular-checkbox" type="checkbox"   (change)="PanelSelectAllFn();$event.stopPropagation();"
          id="select_all" [(ngModel)]="selectAll"
          name="questionId" />
         <label for="select_all" ><span class="for-wave">wave</span></label>
         <label class="myOption" >Select All Tier{{ TierId }} geographies </label>
        </li>
        <li class="select_item" (click)="PanelUnselectAllFn();">
         <input  class="regular-checkbox" type="checkbox"   (change)="PanelUnselectAllFn();$event.stopPropagation();"
          id="unselect_all" [(ngModel)]="unselectAll"
          name="questionId" />
         <label for="unselect_all" ><span class="for-wave">wave</span></label>
         <label class="unSelectOption" >Unselect All geographies(You need to reselect one geographies)</label>
        </li>

      <div class="search_con">
        <span class="material-icons material-icons-style">search</span>
        <div class="input_con">
          <input aria-label="input" class="search_content" type="text" placeholder="Search"
          (keyup)="PanelSearchValueFn(searchValue);$event.stopPropagation();"
          [(ngModel)]="searchValue" title=""/>
        </div>
      </div>

      <li class="select_item"  *ngFor="let option of panelOptions;let optionI = index;" (click)="valueChangeFn(option);">
         <input  class="regular-checkbox" type="checkbox"   (change)="valueChangeFn(option);$event.stopPropagation();"
          id="{{'multi_keyValuePair' + questionId + optionI }}" [checked]=" option.checked "
          [name]="questionId" />
         <label [attr.for]=" 'multi_keyValuePair' + questionId + optionI "><span class="for-wave">wave</span></label>
         <label class="myOption" >{{option.optionWordingName}}</label>
        </li>
    </ul>
  </section>
  `,
  styles: [`
      .select_panel{
        position: absolute;
        background: #f9f9f9;
        top:100%;
        width: 100%;
        left: 0;
        margin-top: 10px;
        overflow-y: scroll;
        max-height: 300px;
        z-index: 10;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .2);
        overflow-x:hidden;
      }
      .noStyle{
        display:none;
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
        padding-left: 35px;
        background-color: #fff;
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
          width: 100%;
          font-size: 12px;
          height: 35px;
          border: none;
          outline: none;
      }
      .material-icons-style{
        position: absolute;
        left: 9px;
        top: 10px;
        font-size: 18px;
        color: #757575;
      }
       .myOption{
        width: 100%;
        margin-left:25px;
        margin-top: -20px;
        float: left;
        display: inline-block;
        cursor:pointer;
      }
      .unSelectOption{
        margin-top: -20px;
        display: inline-block;
        cursor: pointer;
        margin-left:25px;
      }
      .for-wave{
        display: none;
      }
  `],
  inputs: [
    'options',
    'questionId',
    'TierId',
    'selectAll',
    'unselectAll'
  ],
  outputs: [
    'togglePanelFn',
    'selectedItemFn',
    'selectAllFn',
    'unselectAllFn'
  ]
})
export class dynamicMultiKeyValuePairPanel implements OnInit {
  public questionId: any;
  public options: any;
  public searchValue: string;
  public selectAll: boolean;
  public unselectAll: boolean;
  public TierId: any;
  public togglePanelFn = new EventEmitter<any>();
  public selectedItemFn = new EventEmitter<any>();
  public selectAllFn = new EventEmitter<any>();
  public unselectAllFn = new EventEmitter<any>();

  public panelOptions: any;
  constructor(private dependency: DependencyService) { }

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    this.togglePanelFn.emit();
  }

  ngOnInit() {
    this.panelOptions = this.options;
  }

  PanelSearchValueFn(searchValue) {
    this.searchValueFn(searchValue);
  }

  PanelSelectAllFn() {
    this.selectAllFn.emit();
  }

  PanelUnselectAllFn() {
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
