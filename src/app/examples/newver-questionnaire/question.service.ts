import { Injectable } from '@angular/core';
import { DataSource } from 'src/app/common/Questionnaire/DataSource';
import { FieldItem } from './field-item';


import { from } from 'rxjs';
import { dynamicDate } from './dynamicComponent/date/date';
import { dynamicInput } from './dynamicComponent/input/input';
import { dynamicPhone } from './dynamicComponent/phone/phone';
import { dynamicRange } from './dynamicComponent/range/range';
import { dynamicCheckBox } from './dynamicComponent/checkBox/checkBox';
import { dynamicTextarea } from './dynamicComponent/textarea/textarea';
import { dynMultiSelect } from './dynamicComponent/multiSelect/multiSelect';
import { dynAutoSearch } from './dynamicComponent/autoSearch/autoSearch';
import { dynamicdynRadio } from './dynamicComponent/radio/radio';
import { dynCountrySelect } from './dynamicComponent/countryselect/countryselect';
import { notMaped } from './dynamicComponent/notMaped/notMaped';
import { sharedComponent } from './dynamicComponent/sharedComponent/sharedComponent';
import { ErrorMsgComponent } from './dynamicComponent/errorMsgComponent/errorMegComponet';
import { dynamicSingleSelect } from './dynamicComponent/singleSelect/singleSelect';
import { dynamicLabel } from './dynamicComponent/label/label';
import { dynamicMultiKeyValuePair, dynamicMultiKeyValuePairPanel } from './dynamicComponent/multiKeyValuePair/multiKeyValuePair';
import { dynamicMultiKeyValuePairTooltip, dynamicMultiKeyValuePairPanelTooltip } from './dynamicComponent/multiKeyValuePairToolTip/multiKeyValuePairToolTip';
import { InputAutoSearch } from './dynamicComponent/inputAutoSearch/inputAutoSearch';

const components = {
  dynamicDate: dynamicDate,
  dynamicInput: dynamicInput,
  dynamicPhone: dynamicPhone,
  dynamicRange: dynamicRange,
  dynamicCheckBox: dynamicCheckBox,
  dynamicTextarea: dynamicTextarea,
  dynCountrySelect: dynCountrySelect,
  dynMultiSelect: dynMultiSelect,
  dynAutoSearch: dynAutoSearch,
  dynamicRadio: dynamicdynRadio,
  notMaped: notMaped,
  dynamicSingleSelect: dynamicSingleSelect,
  dynamicLabel: dynamicLabel,
  dynamicMultiKeyValuePair: dynamicMultiKeyValuePair,
  dynamicMultiKeyValuePairTooltip: dynamicMultiKeyValuePairTooltip,
  InputAutoSearch: InputAutoSearch
};

export const Components = [
  dynamicDate,
  dynamicInput,
  dynamicPhone,
  dynamicRange,
  dynamicCheckBox,
  dynamicTextarea,
  dynMultiSelect,
  dynAutoSearch,
  dynamicdynRadio,
  dynCountrySelect,
  notMaped,
  sharedComponent,
  ErrorMsgComponent,
  dynamicSingleSelect,
  dynamicLabel,
  dynamicMultiKeyValuePair,
  dynamicMultiKeyValuePairPanel,
  dynamicMultiKeyValuePairTooltip,
  dynamicMultiKeyValuePairPanelTooltip,
  InputAutoSearch
];


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public sections: any;

  // dependency
  public data: any;
  public dataRows: any[] = [];
  public currentRows: any[] = [];
  public extraData: any;
  public requestId: string = '00000000-0000-0000-0000-000000000000';
  public dependFlage: any;
  public saveUpdateFlage: boolean = false;
  public allValidated: boolean = true;
  public isShowTooltip: boolean = true;
  public dependList: any[] = [];
  public appDetailsData: any[] = [];
  public required: any[] = [];
  public IsNew: boolean = false;
  public IsThirdParty: boolean = false;
  public tabIndex: number;
  public autoSave: any;
  public ConstentData: any[] = [];
  public isNewQuestionnaire = true;
  public EmailQuestion: any = {};

  constructor() {
    this.sections = DataSource.data.Sections;
  }

  assemblyComponent() {
    const resultComp = [];
    this.dataRows.forEach((item) => {
      const config = item.Cols[0].Question.Question;
      const configData = item.Cols[0];
      this.selectComponentFn(config);
      resultComp.push(new FieldItem(this.selectComponentFn(config), {...configData}));
    });
    console.log(resultComp);

    return resultComp;
  }

  selectComponentFn(param) {
    if (param.QuestionIdentifier) { return this.hasIdentifierFn(param.QuestionTypeId); }
    return this.noIdentifierFn(param.QuestionTypeId);
  }
  // 1 Date
  // 2 Single Select
  // 3 Type Ahead
  // 4 Text
  // 5 Upload Button
  // 6 Textarea
  // 7 CheckBox
  // 8 Radio
  // 9 Multiple Select
  // 10 Label
  // 11 Button
  // 12 Link
  // 13 CommentWithAttachments
  // 14 Type Ahead _KeyValuePair
  // 15 Compound
  // 16 Single Select_KeyValuePair
  // 17 Multiple Select_KeyValuePair
  // 18 file upload
  // 19 Phone
  // 20 RangeBar
  // 21 WithLine
  hasIdentifierFn(param) {
    var result;
    switch (param) {
      case 1: // Date
        result = components['dynamicDate'];
        break;
      case 2: // Single Select
        result = components['dynamicSingleSelect'];
        break;
      case 3:
        result = components['InputAutoSearch'];
        break;
      case 4: // Textbox
        result = components['dynamicInput'];
        break;
      // case 4: // Textbox
      //   result = components['dynamicInputIdentifier'];
      //   break;
      case 6: // Textarea
        result = components['dynamicTextarea'];
        break;
      // case 7: // 7 CheckBox
      //   result = components['dynamicCheckBoxIdentifier'];
      //   break;
      case 8: // Radio
        result = components['dynamicRadio'];
        break;
      case 10: // Label
        result = components['dynamicLabel'];
        break;
      case 14: // Type Ahead  KeyValuePair
        result = components['dynAutoSearch'];
        // result = components['dynamicInputIdentifier'];
        break;
      case 16: // Single Select KeyValuePair
        result = components['dynCountrySelect'];
        break;
      case 17: // MultipleSelect
        result = components['dynMultiSelectNew'];
        // result = components['dynamicMultiKeyValuePairTooltip'];
        break;
      // must update
      case 18:
        result = components['annualreportAtt'];
        break;
      case 19:
        result = components['dynamicPhone'];
        break;
      case 20:
        result = components['dynamicRange'];
        break;
      case 21:
        result = components['dynamicMultiKeyValuePair'];
        break;
      case 22:
        result = components['dynamicMultiKeyValuePairTooltip'];
        break;
      default:
        result = components['notMaped'];
    }
    return result;
  }

  noIdentifierFn(param) {
    var result;
    switch (param) {
      case 1: // Date
        result = components['dynamicDate'];
        break;
      case 2: // Single Select
        result = components['dynamicSingleSelect'];
        break;
      case 4: // Textbox
        result = components['dynamicInput'];
        break;
      case 6: // Textarea
        result = components['dynamicTextarea'];
        break;
      case 7: // 7 CheckBox
        result = components['dynamicCheckBox'];
        break;
      case 8: // Radio
        result = components['dynamicRadio'];
        break;
      case 10: // Label
        result = components['dynamicLabel'];
        break;
      case 17: // MultipleSelect
        result = components['dynamicMultiKeyValuePair'];
        // result = components['dynamicMultiKeyValuePairTooltip'];
        break;
      case 18:
        result = components['annualreportAtt'];
        break;
      case 19:
        result = components['dynamicPhone'];
        break;
      case 20:
        result = components['dynamicRange'];
        break;
      case 21:
        result = components['dynMultiSelectNew'];
        break;
      default:
        result = components['notMaped'];
    }
    return result;
  }


  // dependency

  initRowsFn(data) {
    data.forEach(item => {
      item.Cols.forEach(i => {
        const question = i.Question.Question;
        !Reflect.has(question, 'display') ? Reflect.set(question, 'display', true) : null;
        !Reflect.has(question, 'disabled') ? Reflect.set(question, 'disabled', false) : null;
        !Reflect.has(question, 'validated') ? Reflect.set(question, 'validated', false) : null;
        // init validated
        question.validated = question.OptionResponses.some(e => {
          if (e.OptionResponse.ResponseTxt) { return true; }
        });
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (!mandatory) {
          question.validated = true;
        }
        // init disabled
        question.disabled = this.setDisabledFn(question);
        // init dependency
        if (question.Dependency && question.Dependency.length > 0) {
          question.Dependency.forEach(i => {
            i.DependencyTypeId == 1 || i.DependencyTypeId == 3 ? question.display = false : null;
            i.DependencyTypeId == 2 ? question.disabled = true : null;
          });
          // get depend List
          this.dependList = [...this.dependList, ...question.Dependency];
        }
        // console.log(this.dependList);
      });
    });
  }

  setDisabledFn(question) {
    return question.disabled ? true : (question.QuestionVisibility != 'E' ? true : false);
  }

  fromartRows(data) {
    this.initRowsFn(data);
    Reflect.set(data, 'required', { require: 0, requireValidated: 0, checked: true });
    this.data = data;
    return this.data;
  }

  fromartTabData(data) {
    data.forEach(item => {
      if (item.Section.ChildSections.length > 0) {
        this.fromartTabData(item.Section.ChildSections);
      }
      const Prows = item.Section.Rows;
      // console.log(Prows);
      
      // console.log(this.dataRows);
      // setTimeout(() => {
      //   this.dataRows.forEach((i) => {
      //     i.Cols.forEach(j => {
      //       // 可让所有检验通过，进度条100%;
      //       console.log(j.Question.Question );
      //       j.Question.Question.validated = true;
      //       j.Question.Question.updated = false;
      //     });
      //   });
      // }, 0);
      this.initRowsFn(Prows);
      Reflect.set(item, 'display', true);
      Reflect.set(item, 'clicked', { count: 1, displayVal: false });
      Reflect.set(item, 'required', { require: 0, requireValidated: 0, checked: true });
      this.dataRows = [...this.dataRows, ...Prows];
    });
    this.data = data;
    return data;
  }
 /*

  initRowsFn(data) {
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const colData = data[row].Cols[col];
        const question = colData.Question.Question;
        !Reflect.has(question, 'display') ? Reflect.set(question, 'display', true) : null;
        !Reflect.has(question, 'disabled') ? Reflect.set(question, 'disabled', false) : null;
        !Reflect.has(question, 'validated') ? Reflect.set(question, 'validated', false) : null;
        // init validated
        question.validated = question.OptionResponses.some(e => {
          if (e.OptionResponse.ResponseTxt) { return true; }
        });
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (!mandatory) {
          question.validated = true;
        }
        // init disabled
        question.disabled = this.setDisabledFn(question);
        if (question.Dependency && question.Dependency.length > 0) {
          for (let d = question.Dependency.length; d--;) {
            question.Dependency[d].DependencyTypeId == 1 || question.Dependency[d].DependencyTypeId == 3
              ? question.display = false : null;
            question.Dependency[d].DependencyTypeId == 2 ? question.disabled = true : null;
          }
          // get depend List
          this.dependList = [...this.dependList, ...question.Dependency];
        }
      }
    }
  }

  fromartRows(data) {
    this.initRowsFn(data);
    Reflect.set(data, 'required', { require: 0, requireValidated: 0, checked: true });
    this.data = data;
    return this.data;
  }

  fromartTabData(data) {
    for (let tab = data.length; tab--;) {
      for (let childLength = data[tab].Section.ChildSections.length; childLength--;) {
        const child = data[tab].Section.ChildSections[childLength];
        const secondChild = child.Section.ChildSections;
        for (let SchildLength = secondChild.length; SchildLength--;) {
          let Srows = secondChild[SchildLength].Section.Rows;
          this.dataRows = [...this.dataRows, ...Srows];
          this.initRowsFn(Srows);
        }
        const rows = child.Section.Rows;
        this.dataRows = [...this.dataRows, ...rows];
        this.initRowsFn(rows);
      }
      const Prows = data[tab].Section.Rows;
      this.dataRows = [...this.dataRows, ...Prows];
      this.initRowsFn(Prows);
    }
    for (let i = data.length; i--;) {
      Reflect.set(data[i], 'display', true);
      Reflect.set(data[i], 'clicked', { count: 1, displayVal: false })
      Reflect.set(data[i], 'required', { require: 0, requireValidated: 0, checked: true });
    }
    // data[0].display = true;
    //data[0].clicked.count = 1;
    this.data = data;
    return data;
  }
*/

  setTabStatus(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      data[i].Section.SectionValidStatus = true;
    }
  }

  // 获取第一个tab的require校验数量比例
  checkFirstTabStatus(data) {
    const tab = data[0];
    console.log(tab);
    const require = this.getAllRerequiredFn([tab]);
    console.log(require);
    const requireValidated = this.getAllRerequireValidatedFn([tab]);
    console.log(requireValidated);
    if (require <= requireValidated && require != 0) {
      tab.Section.SectionValidStatus = true;
    } else {
      tab.Section.SectionValidStatus = false;
    }
  }

  // 获取所有必填表单的数量
  getAllRerequiredFn(data) {
    const currentRows = this.getAllrowsFn(data);
    let sum = 0;
    for (let i = currentRows.length; i--;) {
      for (let row = currentRows[i].rows.length; row--;) {
        for (let col = currentRows[i].rows[row].Cols.length; col--;) {
          const question = currentRows[i].rows[row].Cols[col].Question.Question;
          const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
          if (question.display && question.Validation.length > 0 && mandatory) {
            sum = sum + 1;
          }
        }
      }
    }
    return sum;
  }

  // 获取所有必填表单通过校验的数量
  getAllRerequireValidatedFn(data) {
    const currentRows = this.getAllrowsFn(data);
    let sum = 0;
    for (let i = currentRows.length; i--;) {
      for (let row = currentRows[i].rows.length; row--;) {
        for (let col = currentRows[i].rows[row].Cols.length; col--;) {
          const question = currentRows[i].rows[row].Cols[col].Question.Question;
          const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
          if (question.display && question.validated && mandatory) {
            sum = sum + 1;
          }
        }
      }
    }
    return sum;
  }

  // 不强制校验，并且未通过校验的是否存在，返回boolean
  getNoMandatoryAllRerequireValidatedFn(data) {
    const currentRows = this.getAllrowsFn(data);
    for (let i = currentRows.length; i--;) {
      for (let row = currentRows[i].rows.length; row--;) {
        for (let col = currentRows[i].rows[row].Cols.length; col--;) {
          const question = currentRows[i].rows[row].Cols[col].Question.Question;
          const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
          if (question.display && !question.disabled
            && !mandatory && !question.validated) {
            return false;
          }
        }
      }
    }
    return true;
  }

  fixEveryRow(data) {
    data.forEach(item => {
      if (item.Section.ChildSections.length > 0) {
        this.fixEveryRow(item.Section.ChildSections);
      }
      this.currentRows = [ ...this.currentRows, ...item.Section.Rows];
    });
  }

  getAllrowsFn(Data) {
    // console.log(Data);
    const currentRows = [];
    this.currentRows = []; // 每次调用fixEveryRow，都要清一下存储变量
    this.fixEveryRow(Data);
    currentRows.push({ rows: [...this.currentRows], sectionId: Data[0].Section.SectionId });
    // console.log(currentRows);
    return currentRows;
  }

  /*
  getAllrowFn(Data) {
    console.log(Data);
    const currentRows = [];
    for (let tab = Data.length; tab--;) {
      const Section = Data[tab].Section;
      let tempt = [];
      for (let child = Section.ChildSections.length; child--;) {
        const secondSection = Section.ChildSections[child].Section;
        tempt = [...tempt, ...secondSection.Rows];
        const secondChild = secondSection.ChildSections;
        for (let children = secondChild.length; children--;) {
          tempt = [...tempt, ...secondChild[children].Section.Rows];
        }
      }
      tempt = [...tempt, ...Section.Rows];
      currentRows.push({ rows: [...tempt], sectionId: Section.SectionId });
    }
    console.log(currentRows);
    return currentRows;
  }
  */

  // 第三部分，dependency，start
  /**
   * 根据question.QuestionIdentifier 值取出有此值的question
   * data：Section里的Rows数据
   * identifier：string 查找的字符串值
   * */ 
  findResponsesByIdentifierFn(data, identifier) { // 
    console.log(data);
    console.log(identifier);
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const question = data[row].Cols[col].Question.Question;
        if (identifier == 'Countries' || identifier == 'additionalCountriesNoGobal') {
          if (question.QuestionIdentifier &&
            (question.QuestionIdentifier == 'Countries' || question.QuestionIdentifier == 'additionalCountriesNoGobal')) {
            return question.OptionResponses;
          }
        } else {
          if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf(identifier) >= 0) {
            return question.OptionResponses;
          }
        }
      }
    }
  }

  // 页面触发更新数据和校验
  /**
   * 页面表单变更，有依赖关系的表单会触发此函数，寻找出有依赖Question，返回，并调取重新设置页面的setDependcyFn，(注意调取这个函数时，是在每个动态组件里控制是否有依赖，从而确定是否调取这个函数)
   * emitQuestion：传递过来的question数据，是渲染成哪种表单的源数据
   * value：传递过来以选中的option（multiSelect 是传的option，radio传的是OptionResponses，Yes，No的选项）
   * change: string 变更的标识（addInit，delete, add, deleteAll）
   * this.data: 当前页面的question所有原始数据
   * */ 
  sendDependFn(emitQuestion, value, change) {
    console.log(emitQuestion);
    console.log(value);
    console.log(change);
    console.log(this.data);
    const data = this.data;
    let dependencyTypeId;
    let dependencyQuestion = [];

    /**
     * 此循环就用question里Dependency的SourceQuestionId 与 emitQuestion的QuestionId相同，来取出dependencyQuestion
     * */ 
    for (let row = data.length; row--;) {
      if (Reflect.has(data[row], 'Cols')) {
        for (let col = data[row].Cols.length; col--;) {
          const colData = data[row].Cols[col];
          const question = colData.Question.Question;
          for (let d = question.Dependency.length; d--;) {
            for (let s = question.Dependency[d].DependencySource.length; s--;) {
              if (question.Dependency[d].DependencySource[s].SourceQuestionId == emitQuestion.QuestionId) {
                dependencyTypeId = question.Dependency[d].DependencyTypeId;
                dependencyQuestion = [...dependencyQuestion, ...data[row]];
                break;
              }
            }
          }
        }
      } else {
        for (let sonLength = data[row].Section.ChildSections.length; sonLength--;) {
          const son = data[row].Section.ChildSections[sonLength];
          if (son.Section) {
              const gLenght = son.Section.ChildSections.length;
              if (gLenght > 0) {
                  for (let grandSonLength = son.Section.ChildSections.length; grandSonLength--;)  {
                    const grandSon = son.Section.ChildSections[grandSonLength];
                    const rows = grandSon.Section.Rows;
                    for (let r = rows.length; r--;) {
                        for (let c = rows[r].Cols.length; c--;) {
                            const question = rows[r].Cols[c].Question.Question;
                            for (let d = question.Dependency.length; d--;) {
                                for (let s = question.Dependency[d].DependencySource.length; s--;) {
                                    if (question.Dependency[d].DependencySource[s].SourceQuestionId === emitQuestion.QuestionId) {
                                        dependencyTypeId = question.Dependency[d].DependencyTypeId;
                                        dependencyQuestion = [...dependencyQuestion, ...rows[r]];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
              } else {
                  const rows = son.Section.Rows;
                  for (let r = rows.length; r--;) {
                      for (let c = rows[r].Cols.length; c--;) {
                          const question = rows[r].Cols[c].Question.Question;
                          for (let d = question.Dependency.length; d--;) {
                              for (let s = question.Dependency[d].DependencySource.length; s--;) {
                                  if (question.Dependency[d].DependencySource[s].SourceQuestionId == emitQuestion.QuestionId) {
                                      dependencyTypeId = question.Dependency[d].DependencyTypeId;
                                      dependencyQuestion = [...dependencyQuestion, ...rows[r]];
                                      break;
                                  }
                              }
                          }
                      }
                  }
              }
          }
        }
        const sectionRows = data[row].Section.Rows;
        for (let Prow = sectionRows.length; Prow--;) {
          for (let Pcol = sectionRows[Prow].Cols.length; Pcol--;) {
            const PcolData = sectionRows[Prow].Cols[Pcol];
            const Pquestion = PcolData.Question.Question;
            for (let Pd = Pquestion.Dependency.length; Pd--;) {
              for (let Ps = Pquestion.Dependency[Pd].DependencySource.length; Ps--;) {
                if (Pquestion.Dependency[Pd].DependencySource[Ps].SourceQuestionId == emitQuestion.QuestionId) {
                  dependencyTypeId = Pquestion.Dependency[Pd].DependencyTypeId;
                  dependencyQuestion = [...dependencyQuestion, ...sectionRows[Prow]];
                  break;
                }
              }
            }
          }
        }
      }
    }
    console.log(dependencyTypeId);
    console.log(dependencyQuestion);
    
    this.setDependcyFn(dependencyTypeId, value, dependencyQuestion, change, emitQuestion);
    return dependencyQuestion;
  }

  /**
   * 此函数根据dependencyTypeId的值，调取4种不同的变更方法
   * TypeId：dependencyTypeId可有1，2，3，4
   * value：传递来的option
   * Question：dependencyQuestion：要显示隐藏的question
   * change：string 变更的标识
   * emitQuestion：传递过来的question数据
   * */ 
  setDependcyFn(TypeId, value, Question, change, emitQuestion) {
    switch (TypeId) {
      case 1:
        this.valueChangeDisplayFn(Question);
        break;
      case 2:
        this.valueChangeEnableFn(Question);
        break;
      case 3:
        this.changeDisplayFn(value, Question, change, emitQuestion);
        break;
      default:
    }
  }

  // dependencyTypeId = 1时: 一般都是radio
  // Question是dependencyQuestion，外层级，取出内层的具体question，调取显示的方法setDisplayDependencyFn
  valueChangeDisplayFn(Question) {
    for (let q = Question.length; q--;) {
      for (let col = Question[q].Cols.length; col--;) {
        // 取出显示的question数据与emitQuestion是同级别的
        const question = Question[q].Cols[col].Question.Question;
        this.setDisplayDependencyFn(question);
      }
    }
  }

  /**
   *  通过dependency[0].FrontFormula，直接显示或隐藏的question，
   *  若显示并调取firstCheckQuestionValidations校验，
   *  最后重置resetProgressBar进度条
   *  question：要显示或隐藏的question
   * */
  setDisplayDependencyFn(question) {
    // console.log(question);
    console.log('YYYYYYYYY1111111111');
    const dependency = question.Dependency;
    const obj = this.data; // 取到所有数据，符合FrontFormula中的表达式
    if (dependency.length === 0 || !dependency[0].FrontFormula) { return; }
    try {
      // FrontFormula字符串转成表达式, 直接赋值给question.display显示或隐藏表单
      question.display = eval(dependency[0].FrontFormula); 
      if (question.display) {
        let tab = this.data[0];
        if (question.tabIndex) { tab = this.data[question.tabIndex] }
        if ((this.IsNew && tab.clicked && tab.clicked.displayVal) || !this.IsNew) {
          question.updated = true;
          this.firstCheckQuestionValidations(question);
        }
      }
      if (!question.display) {
        question.validated = false;
        question.updated = false;
        question.OptionResponses.forEach(e => {
          e.OptionResponse.ResponseTxt = '';
        });
        if (Reflect.has(question, 'selectedItems')) {
          question.selectedItems = []
        }

        if (Reflect.has(question, 'timer')) {
          question.timer = null;
        }
        if (Reflect.has(question, 'options')) {
          question.options.forEach(e => {
            e.checked = false;
          });
        }
        if (Reflect.has(question, 'lastSave')) {
          question.lastSave = null;
        }
        /*code => question.QuestionTypeId != 2 && !question.QuestionIdentifier
         * is for set BS select default languages  value
         */
        if (Reflect.has(question, 'default')) {
          question.default = true;
        }
        if (Reflect.has(question, 'selecteItem') && question.QuestionIdentifier != 'Language') {
          question.selecteItem = { name: '' };
        }
        if (Reflect.has(question, 'options')) {
          question.options.forEach(e => { Reflect.set(e, 'checked', false); });
        }
      }
    } catch (err) { }
    this.resetProgressBar(question);
  }

  /**
   * 根据question.QuestionIdentifier判断使用哪种传值setValidationFn（同dynamic.directive中渲染组件相同）
   * question：要设置校验值的question
   * 起到分支作用，主要操作在setValidationFn()中
   * */ 
  firstCheckQuestionValidations(question) {
    if (question.QuestionIdentifier) {
      switch (question.QuestionTypeId) {
        case 1: // Date
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 2: // Single Select
          const selected = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt == 'true');
          this.setValidationFn(question, selected ? 'true' : '');
          break;
        case 3:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 4: // Textbox
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 6:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 7: // CheckBox
          if (question.QuestionIdentifier == 'BDASelected' && question.OptionResponses.length == 1) {
            this.setValidationFn(question, true + '');
          }
          else {
            var CBflage = question.OptionResponses.some(e => {
              return e.OptionResponse.ResponseTxt == 'true';
            });
            CBflage ? this.setValidationFn(question, true + '') : this.setValidationFn(question, '');
          }
          break;
        case 8: // Radio
          const Rflage = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt == 'true');
          Rflage ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '');
          break;
        case 14: // Type Ahead  KeyValuePair
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 16: // Single Select KeyValuePair
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 17: // MultipleSelect
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        // must update
        case 18:
          question.HasSuccess ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '');
          break;
        case 19:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 21:
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 22:
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        default:
          break;
      }
    } else {
      switch (question.QuestionTypeId) {
        case 1: // Date
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 2: // Single Select
          const selected = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt == 'true');
          this.setValidationFn(question, selected ? 'true' : '');
          break;
        case 4: // Textbox
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 6: // Textarea
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 7: // CheckBox
          const CBNflage = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt == 'true');
          CBNflage ? this.setValidationFn(question, true + '') : this.setValidationFn(question, '');
          break;
        case 8: // Radio
          const Rfnlage = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt == 'true');
          Rfnlage ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '');
          break;
        case 17: // MultipleSelect
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 18:
          question.HasSuccess ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '');
          break;
        case 19:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        default:
          break;
      }
    }
  }

  /**
   * 为question设置具体的validated值
   * 第一步调取checkValidationFn进行每一个规则的校验，并给出校验结果
   * 第二步setQuestionValidatedFn：Question.Validation每一项都为true，最后Question.validated为true，否则为false
   * 第三步重置一下进度条
   * 第四步通过getAllvalidatedFn，返回是否全部通过校验，否则为false
   * */ 
  setValidationFn(Question, value) {
    this.checkValidationFn(value, Question.Validation);
    Question.validated = this.setQuestionValidatedFn(Question.Validation);
    this.resetProgressBar(Question);
    this.allValidated = this.getAllvalidatedFn();
  }

  // 设置当前question的validated
  setQuestionValidatedFn(validation) {
    return validation.every(e => e.validated == true);
  }

  // 获取所有表单是否通过校验，boolean
  getAllvalidatedFn() {
    try {
      const rows = this.data[0].Section.Rows;
      const arr = rows.filter(e => {
        const question = e.Cols[0].Question.Question;
        return question.OptionResponses[0].OptionResponse.ResponseTxt;
      });
      const flage = arr.every(e => {
        const question = e.Cols[0].Question.Question;
        if (question.validated) {
          return true;
        }
      });
      this.allValidated = flage;
    } catch (err) { }
    return this.allValidated;
  }

  /**
   * 起到分支作用，根据Question.Validation数组的每一个ValidationTypeId，来进行不同的正则方法校验
   * value：firstCheckQuestionValidations方法传入的校验值
   * validation：当前Question的校验规则数组
   * */ 
  checkValidationFn(value, validation) {
    let questionValidated = true;
    for (let i = validation.length; i--;) {
      const validationItem = validation[i];
      switch (validationItem.ValidationTypeId) {
        case 10:
        case 12:
          const validated1 = this.confirmEmailFn(validationItem.FrontFormula);
          Reflect.set(validationItem, 'validated', validated1);
          questionValidated = !validated1 ? false : questionValidated;
          break;
        case 11: // primary country
        case 13: // primary country
          const validated2 = this.checkPrimaryCountryFn(value, validationItem.FrontFormula);
          Reflect.set(validationItem, 'validated', validated2);
          questionValidated = !validated2 ? false : questionValidated;
          break;
        case 4:
          const validated3 = this.CurrencyFn(value, validationItem.FrontFormula);
          Reflect.set(validationItem, 'validated', validated3);
          questionValidated = !validated3 ? false : questionValidated;
          break;
        case 14:
          const validated5 =this.BiUserEmailFn(value, validationItem.FrontFormula);
            Reflect.set(validationItem, 'validated', validated5);
          questionValidated = !validated5 ? false : questionValidated;
          break;
        default:
          const validated4 = this.validateFormulaFn(value, validationItem.FrontFormula);
          Reflect.set(validationItem, 'validated', validated4);
          questionValidated = !validated4 ? false : questionValidated;
      }
    }
    return questionValidated;
  }

  // 五个正则校验方法start
  CurrencyFn(value, FrontFormula) {
    if (value.indexOf('$') != -1) {
      value = value.substring(1);
    }
    const pattern = new RegExp(FrontFormula);
    var res = pattern.test(value);
    if (res && value.indexOf('.') == -1 && value.length >= 14) {
      res = false;
    }

    return res;
  }
  BiUserEmailFn(value,FrontFormula){
    var emailReg =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    // RegExp pattern1 = new RegExp(emailReg);
    var emailPattern = emailReg.test(value);
    if(emailPattern){    
      var inclueAccOrAvaEmail= this.validateFormulaFn(value.toLowerCase(), FrontFormula);
      if(inclueAccOrAvaEmail){
        return true;
      }
      else{
        return value.split("@")[1].toLowerCase()=="accenture.com"|| value.split("@")[1].toLowerCase()=="avanade.com"?false:true;;
      }
    }
    else{
      return true;
    }
  }

  validateFormulaFn(value, item) {
    const patten = new RegExp(item);
    return patten.test(value);
  }

  checkPrimaryCountryFn(value, FrontFormula) {
    // if (value == '') { return true; }
    let validated = false;
    const obj = this.data;
    let additional = FrontFormula.substring(FrontFormula.indexOf('obj'), FrontFormula.indexOf('.OptionResponses'));
    additional = eval(additional);
    let primary = FrontFormula.substring(FrontFormula.lastIndexOf('obj'), FrontFormula.lastIndexOf('.OptionResponses'));
    primary = eval(primary);
    if (additional.OptionResponses[0].OptionResponse.ResponseTxt != null) {
      const target = eval(FrontFormula);
      validated = target >= 0 ? false : true;
    } else {
      validated = true;
    }
    if (validated) {
      additional.validated = true;
      additional.updated = true;
      primary.validated = true;
      primary.updated = true;
      if (primary.OptionResponses[0].OptionResponse.ResponseTxt == null) {
        primary.validated = false;
      }
      if (this.autoSave && this.autoSave.callBack && primary.validated == true) {
        var param = this.fomartAutoSaveDataFn(primary, primary.sectionId);
        this.autoSave.callBack(param);
      }

    } else if (!validated) {
      additional.validated = false;
      additional.updated = true;
      primary.validated = false;
      primary.updated = true;
      for(let s = 0; s < primary.Validation.length; s++) {
        if(primary.Validation[s].ValidationTypeId == 11 || primary.Validation[s].ValidationTypeId == 13){
           primary.Validation[s].validated = false;
        }
      }

      for (let i = 0; i < additional.Validation.length; i++) {
        additional.Validation[i].validated = false;
      }
    }
    return validated;
  }

  fomartAutoSaveDataFn(question, sectionId) {
    const listItem = [];
    let flage = false;
    const optionResponses = question.OptionResponses;
    if (question.QuestionTypeId == 7 || question.QuestionTypeId == 8) {
      flage = optionResponses.every(e => e.OptionResponse.ResponseTxt == 'false');
    }
    if (question.QuestionTypeId == 4 || question.QuestionTypeId == 6
      || question.QuestionTypeId == 17 || question.QuestionTypeId == 22) {
      flage = !question.OptionResponses[0].OptionResponse.ResponseTxt ? true : false;
    }
    if (flage && question.QuestionIdentifier == 'additionalCountriesNoGobal') {
      for (let i = optionResponses.length; i--;) {
        listItem.push({
          "RequestId": this.requestId,
          "QuestionIdentifier": question.QuestionIdentifier || '',
          "RepeatSectionIdentifier": optionResponses[i].OptionResponse.RepeatSectionIdentifier || '',
          "RepeatQuestionIdentifier": optionResponses[i].OptionResponse.RepeatQuestionIdentifier || '',
          "OptionId": optionResponses[i].OptionResponse.OptionId,
          "ResponseTxt": optionResponses[i].OptionResponse.ResponseTxt,
          "UserEmail": '',
          "OptionDesc": optionResponses[i].OptionResponse.OptionDesc,
          "SectionId": sectionId,
          "SectionStatus": 'N',
          "IsDeleteFlag": flage
        });
      }
      return listItem;
    }
    if (flage) {
      listItem.push({
        "RequestId": this.requestId,
        "QuestionIdentifier": question.QuestionIdentifier || '',
        "RepeatSectionIdentifier": question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier || '',
        "RepeatQuestionIdentifier": question.OptionResponses[0].OptionResponse.RepeatQuestionIdentifier || '',
        "OptionId": question.OptionResponses[0].OptionResponse.OptionId,
        "ResponseTxt": question.OptionResponses[0].OptionResponse.ResponseTxt,
        "UserEmail": '',
        "OptionDesc": question.OptionResponses[0].OptionResponse.OptionDesc,
        "SectionId": sectionId,
        "SectionStatus": 'N',
        "IsDeleteFlag": flage
      });
      return listItem;
    }
    for (let i = optionResponses.length; i--;) {
      listItem.push({
        "RequestId": this.requestId,
        "QuestionIdentifier": question.QuestionIdentifier || '',
        "RepeatSectionIdentifier": optionResponses[i].OptionResponse.RepeatSectionIdentifier || '',
        "RepeatQuestionIdentifier": optionResponses[i].OptionResponse.RepeatQuestionIdentifier || '',
        "OptionId": optionResponses[i].OptionResponse.OptionId,
        "ResponseTxt": optionResponses[i].OptionResponse.ResponseTxt,
        "UserEmail": '',
        "OptionDesc": optionResponses[i].OptionResponse.OptionDesc,
        "SectionId": sectionId,
        "SectionStatus": 'N',
        "IsDeleteFlag": (optionResponses[i].OptionResponse.ResponseTxt == 'true') || (!!optionResponses[i].OptionResponse.ResponseTxt && optionResponses[i].OptionResponse.ResponseTxt != 'true' && optionResponses[i].OptionResponse.ResponseTxt != 'false') ? false : true
      });
    }
    return listItem;
  }

  confirmEmailFn(FrontFormula) {//
    const obj = this.data;
    let additional = FrontFormula.substring(FrontFormula.indexOf('obj'), FrontFormula.indexOf('.OptionResponses'));
    additional = eval(additional);
    let primary = FrontFormula.substring(FrontFormula.lastIndexOf('obj'), FrontFormula.lastIndexOf('.OptionResponses'));
    primary = eval(primary);

    if(!additional.OptionResponses[0].OptionResponse.ResponseTxt){
      additional.OptionResponses[0].OptionResponse.ResponseTxt = "";
    }
    
    if(!primary.OptionResponses[0].OptionResponse.ResponseTxt){
      primary.OptionResponses[0].OptionResponse.ResponseTxt = "";
    }
    const validated = eval(FrontFormula);    

    if (validated) {
      additional.updated = true;
      primary.updated = true;
    } else if (!validated) {
      additional.updated = true;
      primary.updated = true;
    }
    return validated;
  }
  // 五个正则校验方法end

  // dependencyTypeId = 2时
  // 取出内层的具体question，调取显示的方法setEnableDependencyFn
  valueChangeEnableFn(Question) {
    for (let q = Question.length; q--;) {
      for (let col = Question[q].Cols.length; col--;) {
        const question = Question[q].Cols[col].Question.Question;
        this.setEnableDependencyFn(question);
      }
    }
  }

  // FrontFormula字符串转成表达式, 直接赋值给question.disabled确定表单是否可编辑
  setEnableDependencyFn(question) {
    console.log('YYYYYYYYY22222222222222222');
    const dependency = question.Dependency;
    if (dependency.length === 0 || !dependency[0].FrontFormula) { return; }
    const obj = this.data;
    if (question.QuestionVisibility == 'V') { return; }
    try {
      question.disabled = !eval(dependency[0].FrontFormula);
      const hasValue = question.OptionResponses.some(e => e.OptionResponse.ResponseTxt);
      question.validated = !question.disabled && hasValue ? true : false;
      if (question.disabled) {
        question.validated = true;
        question.updated = false;
        question.OptionResponses.forEach(e => { e.OptionResponse.ResponseTxt = ''; });
        if (question.QuestionIdentifier == 'Language') {
          question.selecteItem = { name: 'None Selected' };
        }
      }
    } catch (err) { }
    this.resetProgressBar(question);
  }

  /**
   * dependencyTypeId = 3时
   * 多用于multiselect的初始化addInit，delete，deleteAll，add，的页面变更操作，主要是调取singleSelectDisplayFn，重要方法!!!
   * value：传递来的option
   * Question：dependencyQuestion：要显示隐藏的question
   * change：string 变更的标识（addInit，delete，deleteAll，add）
   * emitQuestion：传递过来的question数据
   * */ 
  changeDisplayFn(value, Question, change, emitQuestion) {
    for (let i = Question.length; i--;) {
      this.singleSelectDisplayFn(value, Question[i], change, emitQuestion);
      Question[i].Cols.forEach(col => {
        const question = col.Question.Question;
        !Reflect.has(question, 'tabIndex') ? Reflect.set(question, 'tabIndex', emitQuestion.tabIndex) : null;
        !Reflect.has(question, 'require') ? Reflect.set(question, 'require', emitQuestion.require) : null;
        !Reflect.has(question, 'progress') ? Reflect.set(question, 'progress', emitQuestion.progress) : null;
        if (question.QuestionIdentifier == 'PrimaryCountries') {
          const ca = question.OptionResponses[1].OptionResponse.ResponseTxt || '';
          this.setValidationFn(question, ca); // 为为question设置具体的validated值
        }
        this.resetProgressBar(question);
      });
    }
  }

  /**
   * 重点，增删改查，初始化（常用，细细研究）
   * value：传递来的option
   * Question：dependencyQuestion：要显示隐藏的question
   * change：string 变更的标识（addInit，delete，deleteAll，add）
   * emitQuestion：传递过来的question数据
   * */ 
  singleSelectDisplayFn(value, Question, change, emitQuestion) {
    console.log('YYYYYYYYY333333333333333');
    for (let i = value.length; i--;) {
      if (value[i].itemName == 'Global' && change == 'add') {
        for (let j = Question.Cols.length; j--;) {
          const _Question = Question.Cols[j].Question.Question;
          _Question.display = true;
          const key = _Question.QuestionIdentifier.indexOf('Countries') >= 0 ? 'Countries' : _Question.QuestionIdentifier;
          _Question.options = this.extraData.ExtraData[key].slice(1);
          _Question.seartchValue = '';
          _Question.OptionResponses[0].OptionResponse.ResponseTxt = '';
          _Question.OptionResponses[1].OptionResponse.ResponseTxt = '';
        }
        return;
      }
      if ((value[i].itemName == 'Global' && change == 'delete')) {
        for (let j = Question.Cols.length; j--;) {
          const _Question = Question.Cols[j].Question.Question;
          _Question.display = false;
          _Question.options = [];
          _Question.seartchValue = '';
          _Question.OptionResponses[0].OptionResponse.ResponseTxt = '';
          _Question.OptionResponses[1].OptionResponse.ResponseTxt = '';
        }
        return;
      }
    }
    if (change == 'deleteAll') {
      for (let j = Question.Cols.length; j--;) {
        const _Question = Question.Cols[j].Question.Question;
        _Question.display = false;
        _Question.options = [];
        _Question.seartchValue = '';
        _Question.OptionResponses[0].OptionResponse.ResponseTxt = '';
        _Question.OptionResponses[1].OptionResponse.ResponseTxt = '';
        _Question.validated = false;
      }
      return;
    }
    if (change == 'add') {
      Question.Cols.forEach(col => {
        const question = col.Question.Question;
        question.display = true;
        if (!Reflect.has(question, 'options')) { Reflect.set(question, 'options', []); }
        value.forEach(v => {
          const flage = question.options.findIndex(e => {
            if (e.optionWordingId == v.optionWordingId) { return true; };
          });
          if (flage >= 0) { return; }
          col.Question.Question.options.push({
            optionWordingId: v.optionWordingId,
            optionWordingName: v.itemName
          });
        });
        if (question.options.length == 1) {
          question.OptionResponses[0].OptionResponse.ResponseTxt = question.options[0].optionWordingId;
          question.OptionResponses[1].OptionResponse.ResponseTxt = question.options[0].optionWordingName;
          question.selectedItem = {
            optionWordingId: question.options[0].optionWordingId,
            optionWordingName: question.options[0].optionWordingName
          };
          question.validated = true;
          question.display = false;
        } else if (question.options.length > 1) {
          question.OptionResponses[0].OptionResponse.ResponseTxt = '';
          question.OptionResponses[1].OptionResponse.ResponseTxt = '';
          question.seartchValue = '';

          question.validated = false;
          question.display = true;
        }
      });
      return;
    }
    if (change == 'addInit') {
      Question.Cols.forEach(col => {
        const question = col.Question.Question;
        question.display = true;
        if (!Reflect.has(question, 'options')) { Reflect.set(question, 'options', []); }
        if (!Reflect.has(question, 'seartchValue')) {
          Reflect.set(question, 'seartchValue', '');
        }
        value.forEach(v => {
          const flage = question.options.findIndex(e => {
            if (e.optionWordingId == v.optionWordingId) { return true; };
          });
          if (flage >= 0) { return; }
          col.Question.Question.options.push({
            optionWordingId: v.optionWordingId,
            optionWordingName: v.itemName
          });
        });
        if (question.options.length == 1) {
          if (question.options[0].optionWordingName == 'Global' && question.OptionResponses[1].OptionResponse.ResponseTxt != null) {
            question.selectedItem = {
              optionWordingId: question.OptionResponses[0].OptionResponse.ResponseTxt,
              optionWordingName: question.OptionResponses[1].OptionResponse.ResponseTxt
            }
            question.validated = true;
            question.display = true;
            const key = question.QuestionIdentifier.indexOf('Countries') >= 0 ? 'Countries' : question.QuestionIdentifier;
            if (this.extraData.ExtraData[key][0].optionWordingName == 'Global') {
              question.options = this.extraData.ExtraData[key].slice(1);
            } else {
              question.options = this.extraData.ExtraData[key];
            }
          } else {
            question.OptionResponses[0].OptionResponse.ResponseTxt = question.options[0].optionWordingId;
            question.OptionResponses[1].OptionResponse.ResponseTxt = question.options[0].optionWordingName;
            question.selectedItem = {
              optionWordingId: question.options[0].optionWordingId,
              optionWordingName: question.options[0].optionWordingName
            };
            question.validated = true;
            question.display = false;
          }
        } else if (question.options.length > 1) {
          question.validated = false;
          question.display = true;
        }
      });
      return;
    }

    Question.Cols.forEach(col => {
      const question = col.Question.Question;
      question.display = true;
      value.forEach((v) => {
        question.options.forEach((options, index) => {
          if (question.selectedItem.optionWordingId == v.optionWordingId) {
            question.selectedItem = {
              optionWordingId: '0',
              optionWordingName: 'None Selected'
            }
            question.validated = false;
          }
          if (options.optionWordingId == v.optionWordingId) {
            question.options.splice(index, 1);
          }
        });
      });
      if (question.options.length == 1) {
        question.OptionResponses[0].OptionResponse.ResponseTxt = question.options[0].optionWordingId;
        question.OptionResponses[1].OptionResponse.ResponseTxt = question.options[0].optionWordingName;
        question.selectedItem = {
          optionWordingId: question.options[0].optionWordingId,
          optionWordingName: question.options[0].optionWordingName
        };
        col.Question.Question.display = false;
      }
      if (col.Question.Question.options.length === 0) {
        question.display = false;
      }
    });
  }

  resetProgressBar(Question) {
    const tab = this.data[Question.tabIndex];
    // check preStart page Validate progress
    try {
      Question.require.require = this.getRowsRerequiredFn(this.data); // 所有需要校验的数量
      Question.require.requireValidated = this.getRowsRerequireValidatedFn(this.data); // 校验通过的question数量
      Question.require.checked = this.getNoMandatoryRerequireValidatedFn(this.data); // 校验未通过，并且mandatory为不强制时的布尔值
      Question.progress.require = this.getRowsRerequiredFn(this.data);
      Question.progress.requireValidated = this.getRowsRerequireValidatedFn(this.data);
      Question.progress.checked = this.getNoMandatoryRerequireValidatedFn(this.data);
    } catch (err) { }
    // check tab page
    try {
      Question.require.require = this.getAllRerequiredFn([tab]); // 获取所有必填表单的数量
      Question.require.requireValidated = this.getAllRerequireValidatedFn([tab]);// 获取所有必填表单通过校验的数量
      Question.require.checked = this.getNoMandatoryAllRerequireValidatedFn([tab]);// 不强制校验，并且未通过校验的是否存在，返回boolean
      Question.progress.require = this.getAllRerequiredFn(this.data);
      Question.progress.requireValidated = this.getAllRerequireValidatedFn(this.data);
      Question.progress.checked = this.getNoMandatoryAllRerequireValidatedFn(this.data);
      Reflect.set(tab, 'displayQues', 0);
      tab.displayQues = this.getRowsDisplayedFn([tab]); // 获取所有显示的question
      // for case detail submit button flage
      localStorage.removeItem('QuestionSubmitFlage');

      if (Question.progress.require == Question.progress.requireValidated) { // 是否必填表单都通过校验
        localStorage.setItem('QuestionSubmitFlage', 'true');
      } else {
        localStorage.setItem('QuestionSubmitFlage', 'false');
      }
    } catch (err) { }
    // Approval Details validation
    try {
      Question.allValidated.flage = this.getRowsValidatedFn(this.data[0].Section.Rows);
    } catch (err) { }
    setTimeout(() => {
      if (tab) {
        if (Reflect.has(tab, 'requireValidatedcount')) {
          tab.requireValidatedcount = Question.require.requireValidated;
          tab.requiredcount = Question.require.require;
        }

        if (tab.displayQues == 0) {
          tab.Section.SectionValidStatus = false;
          return;
        }
        if (Question.require) {
          if (Question.require.require <= Question.require.requireValidated) {
            tab.Section.SectionValidStatus = true;
          } else {
            tab.Section.SectionValidStatus = false;
          }
        }
      }
    }, 0);
  }

  /**
   * rows：this.data，所有需要校验的数量
   * 只有ValidationTypeId为5时，并且question.Validation.length有长度时添加Rerequire数量
   * */ 
  getRowsRerequiredFn(rows) {
    let sum = 0;
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        const question = rows[row].Cols[col].Question.Question;
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (question.display && !question.disabled && question.Validation.length > 0 && mandatory) {
          sum = sum + 1;
        }
      }
    }
    return sum;
  }

  /**
   * rows：this.data，校验通过的question数量
   * 只有ValidationTypeId为5时，并且question.validated为true时添加Rerequire数量
   * */ 
  getRowsRerequireValidatedFn(rows) {
    let sum = 0;
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        const question = rows[row].Cols[col].Question.Question;
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (question.display && !question.disabled && question.validated && mandatory) {
          sum = sum + 1;
        }
      }
    }
    return sum;
  }

  /**
   * rows：this.data，
   * 校验未通过，并且有校验规则数组，mandatory为false不强制时
   * 返回boolean
   * */ 
  getNoMandatoryRerequireValidatedFn(rows) {
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        const question = rows[row].Cols[col].Question.Question;
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (question.display && !question.disabled && !question.validated && question.Validation.length > 0 && !mandatory) {
          return false;
        }
      }
    }
    return true;
  }

  // 获取所有显示的question
  getRowsDisplayedFn(data) {
    const currentRows = this.getAllrowsFn(data);
    let sum = 0;
    for (let i = currentRows.length; i--;) {
      for (let row = currentRows[i].rows.length; row--;) {
        for (let col = currentRows[i].rows[row].Cols.length; col--;) {
          const question = currentRows[i].rows[row].Cols[col].Question.Question;
          if (question.display) {
            sum = sum + 1;
          }
        }
      }
    }
    return sum;
  }

  // 获取所有的校验是否都通过
  getRowsValidatedFn(rows) {
    let flage = true;
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        const question = rows[row].Cols[col].Question.Question;
        // check Approval term limited requied
        if (question.Validation.length > 0 && question.Validation[0].ValidationTypeId == 5 && !question.validated && question.display) {
          flage = false;
          break;
        }
        // check all Validated
        if (question.OptionResponses[0].OptionResponse.ResponseTxt && !question.validated && question.display) {
          flage = false;
          break;
        }
      }
    }
    return flage;
  }

  // 第三部分，dependency，end

  // 第四部分，外部动态组件或者是业务组件调取下面方法start

  validateBefore(order,questionId) {
    if (this.IsNew && this.ConstentData.length > 0 && order) {
      for (var s = 0; s < order; s++) {
        const res = [];
        // tab.Section.ChildSections.Section.ChildSections.Section.Rows.Cols
        if (Reflect.has(this.ConstentData[s].Data, 'ChildSections')) {
          for (let i = 0; i < this.ConstentData[i].Data.ChildSections.length; i++) {
            const childsection = this.ConstentData[i].Data.ChildSections[i].Section.ChildSections;
            for (let j = 0; j < childsection.length; j++) {
              const rows = childsection[j].Section.Rows;
              for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const cols = rows[rowIndex].Cols;
                for (let colIndex = 0; colIndex < cols.length; colIndex++) {
                  res.push(cols[colIndex]);
                }
              }
            }
          }
        }
        // tab.Section.ChildSections.Section.Rows.Cols
        for (let i = 0; i < this.ConstentData[s].Data.ChildSections.length; i++) {
          const rows = this.ConstentData[s].Data.ChildSections[i].Section.Rows;
          for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const cols = rows[rowIndex].Cols;
            for (let colIndex = 0; colIndex < cols.length; colIndex++) {
              res.push(cols[colIndex]);
            }
          }
        }
        // tab.Section.Rows.Cols
        for (let rowIndex = 0; rowIndex < this.ConstentData[s].Data.Rows.length; rowIndex++) {
          const cols = this.ConstentData[s].Data.Rows[rowIndex].Cols;
          for (let colIndex = 0; colIndex < cols.length; colIndex++) {
            res.push(cols[colIndex]);
          }
        }
        for (let i = 0; i < res.length; i++) {
          const question = res[i].Question.Question;
          if(question.QuestionId == questionId){
            break;
          }
          if (question.Validation.length > 0 && question.display) {
            question.updated = true;
            this.checkQuestionValidations(question);
          }
        }
      }
    }
  }

  getQuestions(value, IsNew) {
    if (value) {
      const res = [];
      // tab.Section.ChildSections.Section.ChildSections.Section.Rows.Cols
      if (Reflect.has(value, 'ChildSections')) {
        for (let i = 0; i < value.ChildSections.length; i++) {
          const childsection = value.ChildSections[i].Section.ChildSections;
          for (let j = 0; j < childsection.length; j++) {
            const rows = childsection[j].Section.Rows;
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
              const cols = rows[rowIndex].Cols;
              for (let colIndex = 0; colIndex < cols.length; colIndex++) {
                res.push(cols[colIndex]);
              }
            }
          }
        }
      }
      // tab.Section.ChildSections.Section.Rows.Cols
      for (let i = 0; i < value.ChildSections.length; i++) {
        const rows = value.ChildSections[i].Section.Rows;
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const cols = rows[rowIndex].Cols;
          for (let colIndex = 0; colIndex < cols.length; colIndex++) {
            res.push(cols[colIndex]);
          }
        }
      }
      // tab.Section.Rows.Cols
      for (let rowIndex = 0; rowIndex < value.Rows.length; rowIndex++) {
        const cols = value.Rows[rowIndex].Cols;
        for (let colIndex = 0; colIndex < cols.length; colIndex++) {
          res.push(cols[colIndex]);
        }
      }
      for (let i = 0; i < res.length; i++) {
        const question = res[i].Question.Question;
        if (question.Validation.length > 0 && question.display) {
          question.updated = true;
          if (!IsNew) {
            this.firstCheckQuestionValidations(question);
          } else {
            this.checkQuestionValidations(question);
          }
        }
      }
    }
  }

  /**
   * 同FirstcheckQuestionValidations相同，只是在validateBefore（）和getQuestions（）中调取
   * 根据question.QuestionIdentifier判断使用哪种传值setValidationFn（同dynamic.directive中渲染组件相同）
   * question：要设置校验值的question
   * 起到分支作用，主要操作在setValidationFn()中
   * */ 
  checkQuestionValidations(question) {
    if (question.QuestionIdentifier) {
      switch (question.QuestionTypeId) {
        case 1: // Date
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 2: // Single Select
          let value = 'test';
          if (!question.selecteItem.name || question.selecteItem.name == 'None Selected') { value = ''; }
          this.setValidationFn(question, value != '' ? question.selecteItem.name : '');
          break;
        case 3:
          this.setValidationFn(question, question.seartchValue || '');
          break;
        case 4: // Textbox
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 6:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 7: // CheckBox
          question.flage ? this.setValidationFn(question, true + '') : this.setValidationFn(question, '');
          break;
        case 8: // Radio
          !question.flage ? this.setValidationFn(question, '') : '';
          break;
        case 14: // Type Ahead  KeyValuePair
          this.setValidationFn(question, question.seartchValue || '');
          break;
        case 16: // Single Select KeyValuePair
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 17: // MultipleSelect
          question.flage ? this.setValidationFn(question, true + '') : this.setValidationFn(question, '');
          break;
        // must update
        case 18:
          question.HasSuccess ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '')
          break;
        case 19:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 21:
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 22:
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        default:
          break;
      }
    } else {
      switch (question.QuestionTypeId) {
        case 1: // Date
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 2: // Single Select
          let value = 'test';
          if (!question.selecteItem.name || question.selecteItem.name == 'None Selected') { value = '' }
          this.setValidationFn(question, value != '' ? question.selecteItem.name : '');
          break;
        case 4: // Textbox
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 6: // Textarea
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          break;
        case 7: // CheckBox
          question.flage ? this.setValidationFn(question, true + '') : this.setValidationFn(question, '');
          break;
        case 8: // Radio
          !question.flage ? this.setValidationFn(question, '') : '';
          break;
        case 17: // MultipleSelect
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        case 18:
          question.HasSuccess ? this.setValidationFn(question, 'true') : this.setValidationFn(question, '')
          break;
        case 19:
          this.setValidationFn(question, question.OptionResponses[0].OptionResponse.ResponseTxt || '');
          this.setValidationFn(question, question.OptionResponses[1].OptionResponse.ResponseTxt || '');
          break;
        default:
          break;
      }
    }
  }

  fomartAutoSaveDependcyDataFn(data, sectionId) {
    const listItem = [];
    for (let q = data.length; q--;) {
      for (let col = data[q].Cols.length; col--;) {
        const question = data[q].Cols[col].Question.Question;
        let flage = false;
        const optionResponses = question.OptionResponses;
        flage = optionResponses.every(e => {
          return e.OptionResponse.ResponseTxt == '';
        });
        if (question.display) {
           continue;
        } 
        if (flage) {
          for (let j = 0; j < optionResponses.length; j++) {
            listItem.push({
              "RequestId": this.requestId,
              "QuestionIdentifier": question.QuestionIdentifier || '',
              "RepeatSectionIdentifier": question.OptionResponses[j].OptionResponse.RepeatSectionIdentifier || '',
              "RepeatQuestionIdentifier": question.OptionResponses[j].OptionResponse.RepeatQuestionIdentifier || '',
              "OptionId": question.OptionResponses[j].OptionResponse.OptionId,
              "ResponseTxt": question.OptionResponses[j].OptionResponse.ResponseTxt,
              "UserEmail": '',
              "OptionDesc": question.OptionResponses[j].OptionResponse.OptionDesc,
              "SectionId": sectionId,
              "SectionStatus": 'N',
              "IsDeleteFlag": flage
            });
          }
        }

        if (question.QuestionIdentifier == 'PrimaryCountries' && !flage) {
          for (let j = 0; j < optionResponses.length; j++) {
            listItem.push({
              "RequestId": this.requestId,
              "QuestionIdentifier": question.QuestionIdentifier || '',
              "RepeatSectionIdentifier": question.OptionResponses[j].OptionResponse.RepeatSectionIdentifier || '',
              "RepeatQuestionIdentifier": question.OptionResponses[j].OptionResponse.RepeatQuestionIdentifier || '',
              "OptionId": question.OptionResponses[j].OptionResponse.OptionId,
              "ResponseTxt": question.OptionResponses[j].OptionResponse.ResponseTxt,
              "UserEmail": '',
              "OptionDesc": question.OptionResponses[j].OptionResponse.OptionDesc,
              "SectionId": sectionId,
              "SectionStatus": 'N',
              "IsDeleteFlag": flage
            });
          }
        }
      }
    }
    return listItem;
  }

  hasDependOn(questionId) {
    const dependList = this.dependList;
    for (let i = dependList.length; i--;) {
      for (let j = dependList[i].DependencySource.length; j--;) {
        if (dependList[i].DependencySource[j].SourceQuestionId == questionId) {
          return true;
        }
      }
    }
    return false;
  }

  checkDependcyFn(Question) {
    if (Question.Dependency.length == 0) { return; }
    switch (Question.Dependency[0].DependencyTypeId) {
      case 1:
        this.setDisplayDependencyFn(Question);
        break;
      case 2:
        this.setEnableDependencyFn(Question);
        break;
      case 3:
        this.changeDisplayFn('value', Question, 'change', 'emitQuestion');
        break;
      default:
    }
  }

  getAdminPeoplePickerValidatedFn(rows) {
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        const question = rows[row].Cols[col].Question.Question;
        const mandatory = question.Validation.some(e => { if (e.ValidationTypeId == 5) { return true; } });
        if (question.QuestionIdentifier.indexOf('PeoplePicker') != -1 && question.display && !question.disabled
          && !question.validated && !mandatory) {
          return false;
        }
      }
    }
    return true;
  }

  getEmailQuestion(validation) {
    for (let v = validation.length; v--;) {
      switch (validation[v].ValidationTypeId) {
        case 10:
        case 12:
          const question = this.getEmailFn(validation[v].FrontFormula);
          return question;
      }
    }
  }

  getEmailFn(FrontFormula) {
    var obj = this.data;
    let additional = FrontFormula.substring(FrontFormula.indexOf('obj'), FrontFormula.indexOf('.OptionResponses'));
    additional = eval(additional);
    return additional;
  }

  getSectionResponseListFn(section, RequestId, sectionStatus) {
    const firstChilds = section.ChildSections;
    let param = [];
    param = [...param, ...this.getResponseListFn(section.Rows, section.SectionId, RequestId, sectionStatus)];
    for (let i = firstChilds.length; i--;) {
      const childSeciton = firstChilds[i].Section;
      const Rows = childSeciton.Rows;
      param = [...param, ...this.getResponseListFn(Rows, section.SectionId, RequestId, sectionStatus)];
      const secondChilds = childSeciton.ChildSections;
      for (let j = secondChilds.length; j--;) {
        const childRows = secondChilds[j].Section.Rows;
        param = [...param, ...this.getResponseListFn(childRows, section.SectionId, RequestId, sectionStatus)];
      }
    }
    for (let index = param.length; index--;) {
      if ((!param[index].ResponseTxt || param[index].ResponseTxt == 'false') && param[index].QuestionIdentifier != 'CRRQuestion') {
        param.splice(index, 1);
      }
    }
    return param;
  }

  getResponseListFn(rows, sectionId, RequestId, sectionStatus) {
    const listItem = [];
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        let flage = false;
        const question = rows[row].Cols[col].Question.Question;
        if (question.QuestionTypeId == 18 ||
          (!question.validated && !question.disabled && question.QuestionIdentifier != 'PrimaryCountries')
        ) { continue; }
        const optionResponses = question.OptionResponses;
        if (question.QuestionTypeId == 7 || question.QuestionTypeId == 8 || question.QuestionTypeId == 2) {
          flage = optionResponses.every(e => {
            return e.OptionResponse.ResponseTxt == 'false';
          });
        }
        if (flage) {
          listItem.push({
            "RequestId": RequestId,
            "QuestionIdentifier": question.QuestionIdentifier || '',
            "RepeatSectionIdentifier": question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier || '',
            "RepeatQuestionIdentifier": question.OptionResponses[0].OptionResponse.RepeatQuestionIdentifier || '',
            "OptionId": question.OptionResponses[0].OptionResponse.OptionId,
            "ResponseTxt": question.OptionResponses[0].OptionResponse.ResponseTxt,
            "UserEmail": '',
            "OptionDesc": question.OptionResponses[0].OptionResponse.OptionDesc,
            "SectionId": sectionId,
            "SectionStatus": 'N',
            "IsDeleteFlag": flage
          });
          continue;
        }

        for (let i = optionResponses.length; i--;) {
          listItem.push({
            "RequestId": RequestId,
            "QuestionIdentifier": question.QuestionIdentifier || '',
            "RepeatSectionIdentifier": optionResponses[i].OptionResponse.RepeatSectionIdentifier || '',
            "RepeatQuestionIdentifier": optionResponses[i].OptionResponse.RepeatQuestionIdentifier || '',
            "OptionId": optionResponses[i].OptionResponse.OptionId,
            "ResponseTxt": optionResponses[i].OptionResponse.ResponseTxt,
            "QuestionVisibility": question.QuestionVisibility || '',
            "UserEmail": '',
            "OptionDesc": optionResponses[i].OptionResponse.OptionDesc,
            "SectionId": sectionId,
            "SectionStatus": sectionStatus,
            "IsDeleteFlag": (optionResponses[i].OptionResponse.ResponseTxt == 'true') || (!!optionResponses[i].OptionResponse.ResponseTxt && optionResponses[i].OptionResponse.ResponseTxt != 'true' && optionResponses[i].OptionResponse.ResponseTxt != 'false') ? false : true
          });
        }
      }
    }
    return listItem;
  }

  getPreStartResponseListFn(rows, sectionId, RequestId, sectionStatus) {
    const listItem = [];
    for (let row = rows.length; row--;) {
      for (let col = rows[row].Cols.length; col--;) {
        let flage = false;
        const question = rows[row].Cols[col].Question.Question;
        if (question.QuestionTypeId == 18 || (!question.validated && !question.disabled)) { continue; }
        const optionResponses = question.OptionResponses;
        if (question.QuestionTypeId == 7 || question.QuestionTypeId == 8 || question.QuestionTypeId == 2) {
          flage = optionResponses.every(e => e.OptionResponse.ResponseTxt == 'false');
        }
        if (flage) {
          listItem.push({
            "RequestId": RequestId,
            "QuestionIdentifier": question.QuestionIdentifier || '',
            "RepeatSectionIdentifier": question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier || '',
            "RepeatQuestionIdentifier": question.OptionResponses[0].OptionResponse.RepeatQuestionIdentifier || '',
            "OptionId": question.OptionResponses[0].OptionResponse.OptionId,
            "ResponseTxt": question.OptionResponses[0].OptionResponse.ResponseTxt,
            "UserEmail": '',
            "OptionDesc": question.OptionResponses[0].OptionResponse.OptionDesc,
            "SectionId": sectionId,
            "SectionStatus": 'N',
            "IsDeleteFlag": flage
          });
          continue;
        }
        for (let i = optionResponses.length; i--;) {
          listItem.push({
            "RequestId": RequestId,
            "QuestionIdentifier": question.QuestionIdentifier || '',
            "RepeatSectionIdentifier": optionResponses[i].OptionResponse.RepeatSectionIdentifier || '',
            "RepeatQuestionIdentifier": optionResponses[i].OptionResponse.RepeatQuestionIdentifier || '',
            "OptionId": optionResponses[i].OptionResponse.OptionId,
            "ResponseTxt": optionResponses[i].OptionResponse.ResponseTxt,
            "QuestionVisibility": question.QuestionVisibility || '',
            "UserEmail": '',
            "OptionDesc": optionResponses[i].OptionResponse.OptionDesc,
            "SectionId": sectionId,
            "SectionStatus": sectionStatus,
            "IsDeleteFlag": (optionResponses[i].OptionResponse.ResponseTxt == 'true') || (!!optionResponses[i].OptionResponse.ResponseTxt && optionResponses[i].OptionResponse.ResponseTxt != 'true' && optionResponses[i].OptionResponse.ResponseTxt != 'false') ? false : true
          });
        }
      }
    }
    return listItem;
  }

  findPeoplepickerByIdentifierFn(data, identifier) {
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const question = data[row].Cols[col].Question.Question;
        if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf(identifier) >= 0) {
          return question;
        }
      }
    }
  }

  finddelegatePeoplePickerByIdentifierFn(data, identifier) {
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const question = data[row].Cols[col].Question.Question;
        if (identifier == 'Countries') {
          if (question.QuestionIdentifier && question.QuestionIdentifier == 'Countries') {
            return question;
          }
        } else if (identifier == 'delegatePeoplePicker') {
          if (question.QuestionIdentifier
            && (question.QuestionDesc == 'Accenture Delegate' || question.QuestionDesc == 'Avanade Delegate')) {
            return question;
          }
        } else {
          if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf(identifier) >= 0) {
            return question;
          }
        }
      }
    }
  }

  findQuestionByIdentifierFn(data, identifier) {
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const question = data[row].Cols[col].Question.Question;
        if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf(identifier) >= 0) {
          return question;
        }
      }
    }
  }

  setRowsListFn(section) {
    let list = [];
    list = [...list, ...section.Rows];
    const firstChilds = section.ChildSections;
    for (let i = firstChilds.length; i--;) {
      const childSeciton = firstChilds[i].Section;
      list = [...list, ...childSeciton.Rows];
      const secondChilds = childSeciton.ChildSections;
      for (let j = secondChilds.length; j--;) {
        const childRows = secondChilds[j].Section.Rows;
        list = [...list, ...childRows];
      }
    }
    return list;
  }

  setRepeatDisableForAppDetailsFn(questionId, RepeatSectionIdentifier, status) {
    const data = this.appDetailsData;
    for (let s = 0; s < data.length; s++) {
      const section = data[s];
      for (let i = 0; i < section.length; i++) {
        if (Reflect.has(section[i], 'Cols')) {
          for (let col = 0; col < section[i].Cols.length; col++) {
            const question = section[i].Cols[col].Question.Question;
            if (question.QuestionId == questionId) {
              if (status == 'true' && question.OptionResponses[0].OptionResponse.RepeatSectionIdentifier != RepeatSectionIdentifier) {
                question.disabled = true;
              } else if (status == 'false') {
                question.disabled = false;
              }
            }
          }
        }
      }
    }
  }

  fromartAppDetailsFn(data) {
    this.appDetailsData.push(data);
  }

  setRepeatForAppDetailsFn(question) {
    const OptionResponse = question.OptionResponses[0].OptionResponse;
    if (question.QuestionIdentifier && question.QuestionIdentifier.indexOf("ChkApproveLimited") > -1) {
      this.setRepeatDisableForAppDetailsFn(question.QuestionId, OptionResponse.RepeatSectionIdentifier, OptionResponse.ResponseTxt);
    }
  }

  setTooltipStyle(value) {
    let e: any = event || window.event;
    setTimeout(()=>{
      if(!e) { return;}
      // let hidden : any = document.getElementById(value.Identifier);
      // hidden.style.visibility = 'hidden'
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      const x = e.pageX ? e.pageX : e.clientX + scrollX;
      const y = e.pageY ? e.pageY : e.clientY + scrollY;

      const Width = document.getElementById(value.Identifier).clientWidth;
      const right = scrollX + document.documentElement.clientWidth - 100;
      const defaultHeight = document.getElementById(value.Identifier).clientHeight;
      if(defaultHeight > 30) { 
        let ele = document.getElementById(value.Identifier);
        if(defaultHeight < 50){
          if(ele.clientHeight != 30) {
            for(var i = 0; i < 10; i++) {
              let wid = 500 + (i + 1) * 10;
              ele.style.width= wid.toString() + 'px';
              if(ele.clientHeight == 30) {
                 break;
              }
            }
          }
        }
        else {
          ele.style.width= '600px';
        }
      }
      
      if(right - x < 600){
        if(value.IsLeft) { 
          let ele = document.getElementById(value.Identifier);
          ele.style.marginLeft = value.marginLeft;
        }
        else {
          value.IsLeft = true;
          let len = 600 - (right - x) + 20;
          value.marginLeft = '-' + len.toString() + 'px';
          let ele = document.getElementById(value.Identifier);
          ele.style.marginLeft = value.marginLeft;
        }
      }
      else {
        value.IsLeft = false;
        value.marginLeft = '-23px';
        let ele = document.getElementById(value.Identifier);
        ele.style.marginLeft = value.marginLeft;
      }

      const Height = document.getElementById(value.Identifier).clientHeight;
      const bottom = scrollY +  document.documentElement.clientHeight;

      if(bottom - y < (Height + 20)){
        if(value.IsAbove) {
          let ele = document.getElementById(value.Identifier);
          ele.style.marginTop = value.marginTop;
        }
        else {
          value.IsAbove = true;
          value.marginTop = '-' + (Height + 10).toString() + 'px';
          let ele = document.getElementById(value.Identifier);
          ele.style.marginTop = value.marginTop;
        }
        let elebefore = document.getElementById(value.Identifier + '_before');
        elebefore.style.marginTop = '-10px';
        elebefore.style.marginLeft = '-15px';
        elebefore.style.borderTop = '5px solid #fff';
        elebefore.style.borderBottom = '0px solid #fff';
      }
      else {
        value.IsAbove = false;
        value.marginTop = '30px';
        let ele = document.getElementById(value.Identifier);
        ele.style.marginTop = value.marginTop;
        let elebefore = document.getElementById(value.Identifier + '_before');
        elebefore.style.marginTop = '20px';
        elebefore.style.marginLeft = '-13px';
        elebefore.style.borderBottom = '5px solid #fff';
        elebefore.style.borderTop = '';
      }

      let visible: any = document.getElementById(value.Identifier);
      visible.style.visibility = 'visible';
      let visiblebefore = document.getElementById(value.Identifier + '_before');
      visiblebefore.style.visibility = 'visible';
    })
  }

  // 第四部分，外部动态组件或者是业务组件调取下面方法end
}
