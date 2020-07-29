import { Injectable } from '@angular/core';
import { DataSource } from 'src/app/common/Questionnaire/DataSource';
import { FieldItem } from './field-item';

import { dynamicDate } from 'src/app/common/Questionnaire/dynamicComponents/date/date';
import { dynamicInput } from 'src/app/common/Questionnaire/dynamicComponents/input/input';
import { dynamicPhone } from 'src/app/common/Questionnaire/dynamicComponents/phone/phone';
import { dynamicRange } from 'src/app/common/Questionnaire/dynamicComponents/range/range';
import { dynamicCheckBox } from 'src/app/common/Questionnaire/dynamicComponents/checkBox/checkBox';
import { dynamicTextarea } from 'src/app/common/Questionnaire/dynamicComponents/textarea/textarea';
import { dynCountrySelect } from 'src/app/common/Questionnaire/dynamicComponents/countryselect/countryselect';
import { dynMultiSelect } from 'src/app/common/Questionnaire/dynamicComponents/multiSelect/multiSelect';
import { dynAutoSearch } from 'src/app/common/Questionnaire/dynamicComponents/autoSearch/autoSearch';
import { dynamicdynRadio } from 'src/app/common/Questionnaire/dynamicComponents/radio/radio';
import { notMaped } from 'src/app/common/Questionnaire/dynamicComponents/notMaped/notMaped';
import { dynamicSingleSelect } from 'src/app/common/Questionnaire/dynamicComponents/singleSelect/singleSelect';
import { dynamicLabel } from 'src/app/common/Questionnaire/dynamicComponents/label/label';
import { dynamicMultiKeyValuePair, dynamicMultiKeyValuePairPanel } from 'src/app/common/Questionnaire/dynamicComponents/multiKeyValuePair/multiKeyValuePair';
import { dynamicMultiKeyValuePairTooltip, dynamicMultiKeyValuePairPanelTooltip } from 'src/app/common/Questionnaire/dynamicComponents/multiKeyValuePairToolTip/multiKeyValuePairToolTip';
import { InputAutoSearch } from 'src/app/common/Questionnaire/dynamicComponents/inputAutoSearch/inputAutoSearch';
import { sharedComponent } from 'src/app/common/Questionnaire/dynamicComponents/sharedComponent/sharedComponent';
import { ErrorMsgComponent } from 'src/app/common/Questionnaire/dynamicComponents/errorMsgComponent/errorMegComponet';
import { from } from 'rxjs';

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
  public data: any;
  public dataRows: any[] = [];
  public dependList: any[] = [];

  constructor() {
    this.sections = DataSource.data.Sections;
  }

  fromartData(data) {
    data.forEach(item => {
      if (item.Section.ChildSections.length > 0) {
        this.fromartData(item.Section.ChildSections);
      }
      const Prows = item.Section.Rows;
      // console.log(Prows);
      this.dataRows = [...this.dataRows, ...Prows];
      // console.log(this.dataRows);
      this.initRowFn(Prows);
      Reflect.set(item, 'display', true);
      Reflect.set(item, 'clicked', { count: 1, displayVal: false });
      Reflect.set(item, 'required', { require: 0, requireValidated: 0, checked: true });
    });
    // console.log(data);
    return data;
  }

  initRowFn(data) {
    data.forEach(item => {
      const colData = item.Cols[0];
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
  }

  fromartPanelData(data) {
    for (let tab = data.length; tab--;) {
      for (let childLength = data[tab].Section.ChildSections.length; childLength--;) {
        const child = data[tab].Section.ChildSections[childLength];
        const secondChild = child.Section.ChildSections;
        for (let SchildLength = secondChild.length; SchildLength--;) {
          let Srows = secondChild[SchildLength].Section.Rows;
          this.dataRows = [...this.dataRows, ...Srows];
          console.log(Srows);
          this.initRowsFn(Srows);
        }
        const rows = child.Section.Rows;
        console.log(rows);
        this.dataRows = [...this.dataRows, ...rows];
        console.log(this.dataRows);
        this.initRowsFn(rows);
      }
      const Prows = data[tab].Section.Rows;
      console.log(Prows);
      this.dataRows = [...this.dataRows, ...Prows];
      console.log(this.dataRows);
      this.initRowsFn(Prows);
    }
    for (let i = data.length; i--;) {
      Reflect.set(data[i], 'display', true);
      Reflect.set(data[i], 'clicked', { count: 1, displayVal: false });
      Reflect.set(data[i], 'required', { require: 0, requireValidated: 0, checked: true });
    }
    this.data = data;
    console.log(this.data);
    return data;
  }

  initRowsFn(data) {
    for (let row = data.length; row--;) {
      for (let col = data[row].Cols.length; col--;) {
        const colData = data[row].Cols[col];
        const question = colData.Question.Question;
        console.log(colData);
        console.log(question);
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
        console.log(this.dependList);
      }
    }
  }

  setDisabledFn(question) {
    return question.disabled ? true : (question.QuestionVisibility != 'E' ? true : false);
  }

  assemblyComponent() {
    const resultComp = [];
    this.dataRows.forEach((item) => {
      const config = item.Cols[0].Question.Question;
      this.selectComponentFn(config);
      resultComp.push(new FieldItem(this.selectComponentFn(config), {...config}));
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
}
