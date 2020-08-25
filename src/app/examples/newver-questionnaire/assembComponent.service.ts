import { Injectable } from '@angular/core';
import { FieldItem } from './field-item';

import { dynamicDate } from './dynamicComponent/date/date';
import { dynamicInput } from './dynamicComponent/input/input';
import { dynamicPhone } from './dynamicComponent/phone/phone';
import { dynamicRange } from './dynamicComponent/range/range';
import { newdynamicCheckBox } from './dynamicComponent/checkBox/checkBox';
import { dynamicTextarea } from './dynamicComponent/textarea/textarea';
import { dynMultiSelect } from './dynamicComponent/multiSelect/multiSelect';
import { newdynAutoSearch } from './dynamicComponent/autoSearch/autoSearch';
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

/**
 * ro：
 *  dynamicDate,
    dynamicInput,
    dynamicCheckBox,
    dynamicTextarea,
    DynMultiSelect,
    dynamicdynRadio,
    sharedComponent,
    ErrorMsgComponent,
    DynamicSingleSelect,
    dynamicLabel,
  独有的：
    dynamicRepeatableTextarea,
    dynamicPeoplepicker,
    autoResponseComponent,
    DynamicMultiSelectIdentifierPanel,
    DynTypeaheadMultiSelect,
    DynamicMultiSelectCountryPanel,
    DynamicCountryPicker,
    DynamicCountryAutoResponseList
 * */ 

/**
 * bip：
 *  dynamicDate,
    dynamicInput,
    dynamicCheckBox,
    dynamicTextarea,
    dynMultiSelect,
    dynamicdynRadio,
    sharedComponent,
    ErrorMsgComponent,
    dynamicSingleSelect,
    dynamicLabel,
独有的：
    dynamicPhone, 
    dynamicRange,
    dynAutoSearch,
    dynCountrySelect,
    notMaped,
    dynamicMultiKeyValuePair,
    dynamicMultiKeyValuePairPanel,
    dynamicMultiKeyValuePairTooltip,
    dynamicMultiKeyValuePairPanelTooltip,
    InputAutoSearch
 * */  

const components = {
  dynamicDate: dynamicDate,
  dynamicInput: dynamicInput,
  dynamicPhone: dynamicPhone,
  dynamicRange: dynamicRange,
  newdynamicCheckBox: newdynamicCheckBox,
  dynamicTextarea: dynamicTextarea,
  dynCountrySelect: dynCountrySelect,
  dynMultiSelect: dynMultiSelect,
  newdynAutoSearch: newdynAutoSearch,
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
  newdynamicCheckBox,
  dynamicTextarea,
  dynMultiSelect,
  newdynAutoSearch,
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

@Injectable()
export class AssemblComponentsService {
    constructor() { }
    assemblyComponent(data) {
      const resultComp = [];
      data.forEach((item) => {
          const config = item.Cols[0].Question.Question;
          const configData = item.Cols[0];
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
        //   result = components['newdynamicCheckBoxIdentifier'];
        //   break;
        case 8: // Radio
        result = components['dynamicRadio'];
        break;
        case 10: // Label
        result = components['dynamicLabel'];
        break;
        case 14: // Type Ahead  KeyValuePair
        result = components['newdynAutoSearch'];
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
        result = components['newdynamicCheckBox'];
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