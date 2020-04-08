import { Component, OnInit, HostListener, EventEmitter, AfterViewChecked } from '@angular/core';
import { DependencyService } from '../service/dependency/dependency';
// import { confirmService } from '../../../../../../common/components/confirm/confirmDialog.service';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '../../DataSource';

@Component({
  selector: 'dynamic-auto-search',
  template: `
    <section class="auto_search_con" *ngIf="Question.display">
        <dynamic-shared-component [FieldNo]="Question.QuestionNo" [inputHTML]="Question.QuestionDesc"
            [validataion]="Question.Validation" [title]="Question.Tooltip">
        </dynamic-shared-component>
        <input aria-label="input" class="identifier_input" type="text"
            [(ngModel)]="seartchValue" (keyup)="keyupSearchFn($event)" title=""
            (blur) = "blurCheck()" [disabled]="Question.disabled"
           [ngClass]="{'input_disabled':Question.disabled,'error_msg':Question.updated && !Question.validated }" />
        <div *ngIf="flage.toggle">
          <section class="search_results" (click)="$event.stopPropagation();">
            <ul>
              <li *ngFor="let result of searchResults" (click)="reslultSelectItemFn(result);$event.stopPropagation();" class="search_item">
                {{result}}
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
          <dynamic-ErrorMsg-component  [validataion]="Question.Validation">
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
            border: 1px solid #005b9f;
            background-color: #fff;
            border-radius: 4px;
            font-size: 14px;
            width: 350px;
            height: 40px;
            color: #2D3540;
            outline: none;
            box-sizing: inherit;
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
          .search_con{
              position: relative;
              height: 40px;
              line-height: 40px;
              padding: 0 15px;
              border-radius: 4px;
              font-size: 14px;
              border: 1px solid #8C44A3;
              width:350px;
              color: #2D3540;
              background: #fff;
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
          .error{
            text-align: center;
            line-height: 100px;
          }
          .search_results{
            top: 40px;
            left: 0;
            z-index: 9;
            padding: 15px;
            width:350px;
            background-color: #fff;
            -webkit-box-shadow: 0 2px 7px #999999;
            -moz-box-shadow: 0 2px 7px #999999;
            box-shadow: 0 2px 7px #999999;
          }
          .search_input{
            padding: 0 10px;
            border: 1px solid #8C44A3;
            border-radius: 2px;
            height: 36px;
            width:100%;
            color: #2D3540;
          }
          .Portrait-loader {
            width: 50px;
            height: 50px;
            display: block;
            z-index: 10000;
            pointer-events: auto;
            margin: 0 auto;
        }

        .Portrait-loader .dot {
            position: absolute;
            width: 50px;
            height: 50px;
            animation: 1.7s dotrotate cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
        }

        .Portrait-loader .dot:nth-child(1) {
            animation-delay: 0.2s;
        }

        .Portrait-loader .dot:nth-child(2) {
            animation-delay: 0.35s;
        }

        .Portrait-loader .dot:nth-child(3) {
            animation-delay: 0.45s;
        }

        .Portrait-loader .dot:nth-child(4) {
            animation-delay: 0.55s;
        }

        .Portrait-loader .dot:after,
        .Portrait-loader .dot .first {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            background: #2473C3;
            border-radius: 50%;
            left: 50%;
            margin-left: -4px;
        }

        .Portrait-loader .dot .first {
            margin-top: -4px;
            animation: 1.7s dotscale cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
            animation-delay: 0.2s;
        }
        @keyframes dotrotate {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(360deg);
          }
      }
      @keyframes dotscale {
          0%,
          10% {
              width: 16px;
              height: 16px;
              margin-left: -8px;
              margin-top: -4px;
          }
          50% {
              width: 8px;
              height: 8px;
              margin-left: -4px;
              margin-top: 0;
          }
          90%,
          100% {
              width: 16px;
              height: 16px;
              margin-left: -8px;
              margin-top: -4px;
          }
      }
          .search_results.show{ display: block; }
          .search_item{
            margin: 5px 0;
            padding: 0 14px;
            line-height: 30px;
            font-size: 14px;
            color: #333333;
            list-style:none;
          }
          .search_item:hover{
            background-color: #ebeaff;
            cursor: pointer;
          }
  `]
})
export class dynAutoSearch implements OnInit, AfterViewChecked {
  public config: any;
  public isAutoSave: any;
  public Question: any;
  // public service: any;
  public seartchValue: any;
  public preClearValue: any;
  public flage = {
    load: false,
    error: false,
    toggle: false,
  };
  // public user: any;
  public caseId = 'PreStart';
  public isConfigedSponsorByEmail: boolean;
  public validation = {
    'ErrorMsg': '',
    'Expression': 'DELETE',
    'FrontFormula': '^0',
    'ValidationTypeId': 999 // 999 is specific Type
  };

  public clicked: boolean = false;
  public Timer: any;
  public searchResults: any;
  constructor(
    private dependency: DependencyService,
    // public _confirm: confirmService,
    private route: ActivatedRoute
  ) {
      console.log(this.config);
  }

  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    if (!this.flage.load) {
      this.flage.toggle = false;
      this.hideItemFn();
    }
  }

  ngAfterViewChecked() {
    if (!this.Question.display) {
      this.seartchValue = '';
    }
  }

  ngOnInit() {
    // this.service = this.factory.getService();
    // console.log(this.isAutoSave);
    this.Question = this.config.Question.Question;
    if (!!this.config.autoSave && !!this.config.autoSave.callBack) {
      this.removeDup();
    }
    // this.user = this.auth.getUserInfoFn();
    if (!Reflect.has(this.Question, 'updated')) {
      Reflect.set(this.Question, 'updated', false);
    }
    this.route.params.subscribe(params => {
      if (!!params.caseId) {
        this.caseId = params.caseId;
      } else if (!!params.requestId) {
        this.caseId = params.requestId;
      }
    });
    this.dependency.checkDependcyFn(this.Question);
    this.seartchValue = this.Question.OptionResponses[1].OptionResponse.ResponseTxt || '';

    if (Reflect.has(this.Question, 'OldValue')) {
      this.Question.OldValue = this.seartchValue;
      this.Question.NewValue = this.seartchValue;
    } else {
      Reflect.set(this.Question, 'OldValue', this.seartchValue);
      Reflect.set(this.Question, 'NewValue', this.seartchValue);
    }
    if (!Reflect.has(this.Question, 'seartchValue')) {
      Reflect.set(this.Question, 'seartchValue', this.seartchValue);
    }
  }

  hideItemFn() {
    if (this.Question.Validation.length > 0 && !this.flage.toggle && this.clicked && !this.Question.validated) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.seartchValue || '');
    }
  }

  clearValueFn() {
    this.Question.updated = true;
    this.Question.validated = true;
    this.seartchValue = '';
    if (Reflect.has(this.Question, 'NewValue')) {
      this.Question.NewValue = this.seartchValue;
    }
    const validationList: any = [];
    if (!!this.Question.Validation && this.Question.Validation.length > 0) {
      for (let i = 0; i < this.Question.Validation.length; i++) {
        const tempValidation = this.Question.Validation[i];
        if (tempValidation.ValidationTypeId != '999') {
          validationList.push(tempValidation);
        }
      }
    }
    this.Question.Validation = validationList;
    this.dependency.setValidationFn(this.Question, this.seartchValue);
    this.preClearValue = this.Question.OptionResponses[0].OptionResponse.ResponseTxt || '';
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = '';
    this.Question.OptionResponses[1].OptionResponse.ResponseTxt = '';
    if (this.config.autoSave) { this.autoSaveAndUpdateAppData(''); }
  }

  checkSponserFn() {
    let question = this.Question;
    if (this.caseId === 'PreStart') {
      if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf('delegate') >= 0) {
        let _promise = Promise.all([
          // this.service.GetInputSponsorInfo({ 'eid': this.seartchValue }),
          // this.service.autoSearch({ 'keyword': this.seartchValue, 'eid': this.user.EID })
        ]);
        _promise.then(res => {
          const [sponsorInfo, peoplelist] = [...res];
          const sponsorResult = sponsorInfo.Data;
          this.searchResults = peoplelist.Data;
          if (!this.searchResults || this.searchResults.length == 0) {
            this.flage.toggle = false;
          }
          if (!sponsorResult) {
            this.validation.ErrorMsg = 'Please enter a valid Delegate from '; //+ this.user.CompanyName;
            question.Validation.forEach(function (value, index) {
              if (value.Expression == 'DELETE') {
                question.Validation.splice(index, 1);
                question.validated = true;
              }
            });
            this.Question.Validation.push(this.validation);
          }
          this.QuestionValidationAutoSave();
          this.flage.load = false;
        }, err => {
          this.flage.load = false;
          this.flage.error = true;
        });
      }
      if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf('sponser') >= 0) {
        let _promise = Promise.all([
          // this.service.GetInputSponsorInfo({ 'eid': this.seartchValue }),
          // this.service.autoSearch({ 'keyword': this.seartchValue, 'eid': this.user.EID })
        ]);
        _promise.then(res => {
          const [sponsorInfo, peoplelist] = [...res];
          const sponsorResult = sponsorInfo.Data;
          this.searchResults = peoplelist.Data;
          if (!this.searchResults || this.searchResults.length === 0) {
            this.flage.toggle = false;
          }
          if (!sponsorResult) {
            this.validation.ErrorMsg = 'Please enter a valid Business Sponsor from '; // + this.user.CompanyName;
            question.Validation.forEach(function (value, index) {
              if (value.Expression == 'DELETE') {
                question.Validation.splice(index, 1);
                question.validated = true;
              }
            });
            this.Question.Validation.push(this.validation);
            this.QuestionValidationAutoSave();
          } else if (!!sponsorResult.JobCodeDescription && sponsorResult.JobCodeDescription > 4) {
            // this.service.getConfigedSponsor({ 'mail': sponsorResult.Email }).then(subRes => {
            //   const spInfo = subRes.Data;
            //   this.isConfigedSponsorByEmail = (!!spInfo && spInfo.length > 0) ? true : false;
            //   if (!this.isConfigedSponsorByEmail) {
            //     this.validation.ErrorMsg = 'Please select a valid Business Sponsor';
            //     question.Validation.forEach(function (value, index) {
            //       if (value.Expression == 'DELETE') {
            //         question.Validation.splice(index, 1);
            //         question.validated = true;
            //       }
            //     });
            //     this.Question.Validation.push(this.validation);
            //   }
            //   this.QuestionValidationAutoSave();
            // });
          } else {
            this.QuestionValidationAutoSave();
          }
          this.flage.load = false;
        }, err => {
          this.flage.load = false;
          this.flage.error = true;
        });
      }
    } else {
      if (question.QuestionIdentifier &&
        (question.QuestionIdentifier.indexOf('delegate') >= 0 || question.QuestionIdentifier.indexOf('sponser') >= 0)) {
        let _promise = Promise.all([
          // this.service.getCaseInfo({ 'requestId': this.caseId }),
          // this.service.GetInputSponsorInfo({ 'eid': this.seartchValue }),
          // this.service.autoSearch({ 'keyword': this.seartchValue, 'eid': this.user.EID })
        ]);
        _promise.then(res => {
          const [caseInfo, sponsorInfo, peoplelist] = [...res];
          const sponsorResult = sponsorInfo.Data;
          this.searchResults = peoplelist.Data;
          if (!this.searchResults || this.searchResults.length == 0) {
            this.flage.toggle = false;
          }
          if (question.QuestionIdentifier.indexOf('delegate') >= 0) {
            if (!sponsorResult || sponsorResult.companyCdOwnedByCd != caseInfo.CompanyCd) {
              const CompanyName = caseInfo.CompanyCd == 'ACN' ? 'Accenture' : 'Avanade';
              this.validation.ErrorMsg = 'Please enter a valid Delegate from ' + CompanyName;
              question.Validation.forEach(function (value, index) {
                if (value.Expression == 'DELETE') {
                  question.Validation.splice(index, 1);
                  question.validated = true;
                }
              });
              this.Question.Validation.push(this.validation);
            }
            if (this.Question.Validation.length > 0) {
              this.Question.updated = true;
              this.dependency.setValidationFn(this.Question, this.seartchValue);
            } else {
              this.Question.validated = true;
            }
            if (this.config.autoSave && this.Question.validated) {
              this.autoSaveAndUpdateAppData(sponsorResult.SapNumber);
            }
          } else if (question.QuestionIdentifier.indexOf('sponser') >= 0) {
            if (!sponsorResult || sponsorResult.companyCdOwnedByCd != caseInfo.CompanyCd) {
              const CompanyName = caseInfo.CompanyCd == 'ACN' ? 'Accenture' : 'Avanade';
              this.validation.ErrorMsg = 'Please enter a valid Business Sponsor from ' + CompanyName;
              question.Validation.forEach(function (value, index) {
                if (value.Expression == 'DELETE') {
                  question.Validation.splice(index, 1);
                  question.validated = true;
                }
              });
              this.Question.Validation.push(this.validation);
              if (this.Question.Validation.length > 0) {
                this.Question.updated = true;
                this.dependency.setValidationFn(this.Question, this.seartchValue);
              } else {
                this.Question.validated = true;
              }
              if (this.config.autoSave && this.Question.validated) {
                this.autoSaveAndUpdateAppData(sponsorResult.SapNumber);
              }
            } else if (!!sponsorResult.JobCodeDescription && sponsorResult.JobCodeDescription > 4) {
              // this.service.getConfigedSponsor({ 'mail': sponsorResult.Email }).then(subRes => {
              //   const spInfo = subRes.Data;
              //   this.isConfigedSponsorByEmail = (!!spInfo && spInfo.length > 0) ? true : false;
              //   if (!this.isConfigedSponsorByEmail) {
              //     this.validation.ErrorMsg = 'Please select a valid Business Sponsor';
              //     question.Validation.forEach(function (value, index) {
              //       if (value.Expression == 'DELETE') {
              //         question.Validation.splice(index, 1);
              //         question.validated = true;
              //       }
              //     });
              //     this.Question.Validation.push(this.validation);
              //   }
              //   if (this.Question.Validation.length > 0) {
              //     this.Question.updated = true;
              //     this.dependency.setValidationFn(this.Question, this.seartchValue);
              //   } else {
              //     this.Question.validated = true;
              //   }
              //   if (this.config.autoSave && this.Question.validated) {
              //     this.autoSaveAndUpdateAppData(sponsorResult.SapNumber);
              //   }
              // });
            } else {
              if (this.Question.Validation.length > 0) {
                this.Question.updated = true;
                this.dependency.setValidationFn(this.Question, this.seartchValue);
              } else {
                this.Question.validated = true;
              }
              if (this.config.autoSave && this.Question.validated) {
                this.autoSaveAndUpdateAppData(sponsorResult.SapNumber);
              }
            }
          }
          this.flage.load = false;
        }, err => {
          this.flage.load = false;
          this.flage.error = true;
        });
      } else {
        let _promise = Promise.all([
          // this.service.GetInputSponsorInfo({ 'eid': this.seartchValue }),
          // this.service.autoSearch({ 'keyword': this.seartchValue, 'eid': this.user.EID })
        ]);

        _promise.then(res => {
          const [sponsorInfo, peoplelist] = [...res];
          const sponsorResult = sponsorInfo.Data;
          this.searchResults = peoplelist.Data;

          if (!this.searchResults || this.searchResults.length == 0) {
            this.flage.toggle = false;
          }
          if (this.Question.Validation.length > 0) {
            this.Question.updated = true;
            this.dependency.setValidationFn(this.Question, this.seartchValue);
          } else {
            this.Question.validated = true;
          }
          if (this.config.autoSave && this.Question.validated) { this.autoSaveAndUpdateAppData(sponsorResult.SapNumber); }
          this.flage.load = false;
        }, err => {
          this.flage.load = false;
          this.flage.error = true;
        });
      }
    }
  }

  QuestionValidationAutoSave() {
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.setValidationFn(this.Question, this.seartchValue);
    } else {
      this.Question.validated = true;
    }
    if (this.config.autoSave && this.Question.validated) { this.autoSaveFn(); }
  }

  autoSaveFn() {
    console.log('sssssssssssssssss');
    console.log(this.Question.disabled);
    console.log(this);

    if (this.Question.disabled) {
        // this.Question.disabled = true;
        // this.dependency.initRowsFn(this.Question);
        return;
    }
    if (this.isAutoSave) {
      if (!this.config.autoSave || !this.config.autoSave.callBack) { return; }
      const param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
      this.config.autoSave.callBack(param);
      this.config.autoSave.updated.flage = true;
    }
  }

  autoSaveAndUpdateAppData(value) {
    if (!this.config.autoSave || !this.config.autoSave.callBack) { return; }
    const param = this.dependency.fomartAutoSaveDataFn(this.Question, this.config.sectionId);
    let DataSourcedesc = 'SponsorSapNumber';
    if (this.Question.QuestionIdentifier.indexOf('delegate') >= 0) {
      DataSourcedesc = 'DelegateSapNumber';
    }
    const DataSource = [{ 'desc': DataSourcedesc, 'value': value }];
    // this.service.SaveautoSearch({ 'ResponseSaveInfo': param, 'dataSource': DataSource, 'requestId': param[0].RequestId }).then(res => {
    //   if (!!param && param.length > 0
    //     && !!param[0].RequestId
    //     && res
    //     && value == ''
    //     && this.Question.QuestionIdentifier.indexOf('delegate') >= 0) {
    //     this.service.Clear({ 'email': this.preClearValue, 'requestId': param[0].RequestId });
    //   }
    // });
  }

  selectItemFn(res) {
    let q = this.Question;
    q.validated = true;
    this.dependency.resetProgressBar(this.Question);
    this.dependency.allValidated = this.dependency.getAllvalidatedFn(this.Question.tabIndex);
    q.Validation.forEach(function (value, index) {
      if (value.Expression == 'DELETE') {
        q.Validation.splice(index, 1);
        q.validated = true;
      }
    });
    if (Reflect.has(this.Question, 'OldValue')) {
      this.Question.NewValue = res.enterpriseID;
    }
    this.setPeopleInfo(res);
    this.Question.Validation = q.Validation;
    this.seartchValue = res;
    this.Question.seartchValue = this.seartchValue;
    this.Question.OptionResponses[0].OptionResponse.ResponseTxt = res;
    this.Question.OptionResponses[1].OptionResponse.ResponseTxt = res;
    // this.checkSponserFn();
    this.flage.toggle = false;
    this.clicked = true;
    this.autoSaveFn();
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

  setPeopleInfo(res) {
    if (!Reflect.has(this.Question, 'FirstName')) {
      Reflect.set(this.Question, 'FirstName', res.FirstName);
    }
    if (!Reflect.has(this.Question, 'LastName')) {
      Reflect.set(this.Question, 'LastName', res.LastName);
    }
    if (!Reflect.has(this.Question, 'SapNumber')) {
      Reflect.set(this.Question, 'SapNumber', res.SapNumber);
    }
    if (!Reflect.has(this.Question, 'Email')) {
      Reflect.set(this.Question, 'Email', res.Email);
    }
    if (!Reflect.has(this.Question, 'companyCdOwnedByCd')) {
      Reflect.set(this.Question, 'companyCdOwnedByCd', res.companyCdOwnedByCd);
    }
  }

  reslultSelectItemFn(item) {
    this.selectItemFn(item);
  }

  blurCheck() {
    this.dependency.validateBefore(this.Question.tabIndex + 1, this.Question.QuestionId);
    if (this.Question.Validation.length > 0) {
      this.Question.updated = true;
      this.dependency.reSetValidationFn(this.Question, this.seartchValue);
      if (this.Question.validated) {
        this.autoSaveFn();
      }
    }
  }

  keyupSearchFn(param) {
    clearTimeout(this.Timer);
    if (!this.seartchValue || !this.seartchValue.length) {
      this.clearValueFn();
      this.flage.toggle = false;
      return;
    }
    this.Question.updated = true;
    this.Question.validated = false;
    this.dependency.resetProgressBar(this.Question);
    this.dependency.allValidated = this.dependency.getAllvalidatedFn(this.Question.tabIndex);
    this.clicked = false;
    if (this.seartchValue.length < 4) {
      this.flage.toggle = false;
      return;
    }
    this.searchResults = [];
    this.flage.toggle = true;
    this.flage.load = true;
    this.flage.error = false;
    this.Timer = setTimeout(() => {
      DataSource.EidData.forEach(ele => {
        if (ele.indexOf(this.seartchValue) >= 0) {
          this.searchResults.push(ele);
        }
      });
      if (this.searchResults.length === 0) {
        this.flage.toggle = false;
      }
      this.flage.load = false;
    }, 200);
  }
}
