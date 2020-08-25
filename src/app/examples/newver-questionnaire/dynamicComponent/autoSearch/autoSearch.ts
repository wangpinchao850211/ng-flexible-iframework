import { Component, OnInit, HostListener, EventEmitter, AfterViewChecked } from '@angular/core';
import { QuestionService } from '../../question.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from 'src/app/common/Questionnaire/DataSource';

@Component({
  selector: 'dynamic-auto-search',
  templateUrl: './autoSearch.html',
  styleUrls: ['./autoSearch.scss'],
})
export class newdynAutoSearch implements OnInit, AfterViewChecked {
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
    private dependency: QuestionService,
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
    OleOptionResponses.push(OleOptionResponses[OleOptionResponses.length-1]);
    const ids = _.map(_.map(OleOptionResponses, 'OptionResponse'), 'OptionId'); // 取出id
    const duplication = Array.from(new Set(ids));                               // 去重id
    if (ids.length !== duplication.length) { // 有重复, 去重
      this.Question.OptionResponses = _.uniqBy(OleOptionResponses, 'OptionResponse.OptionId');
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
