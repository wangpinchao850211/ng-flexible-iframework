import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

import { dynamicDate } from '../date/date';
import { dynamicInput } from '../input/input';
import { dynamicPhone } from '../phone/phone';
import { dynamicRange } from '../range/range';
import { dynamicCheckBox } from '../checkBox/checkBox';
import { dynamicMultiKeyValuePair, dynamicMultiKeyValuePairPanel } from '../multiKeyValuePair/multiKeyValuePair';
import { dynamicMultiKeyValuePairTooltip, dynamicMultiKeyValuePairPanelTooltip } from '../multiKeyValuePairToolTip/multiKeyValuePairToolTip';
import { dynamicTextarea } from '../textarea/textarea';
import { dynCountrySelect } from '../countryselect/countryselect';
import { dynMultiSelect } from '../multiSelect/multiSelect';
import { dynAutoSearch } from '../autoSearch/autoSearch';
import { dynamicdynRadio } from '../radio/radio';
import { dynamicSingleSelect } from '../singleSelect/singleSelect';
import { notMaped } from '../notMaped/notMaped';
import { sharedComponent } from '../sharedComponent/sharedComponent';
import { ErrorMsgComponent } from '../errorMsgComponent/errorMegComponet';
import { dynamicLabel } from '../label/label';
import { InputAutoSearch } from '../inputAutoSearch/inputAutoSearch';
import { IQuestionComponent } from '../IQuestionComponent';

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

@Directive({
  selector: '[dynamicField]'
})

export class DynamicDirective implements OnInit {
  @Input() config;
  @Input() inRequestId;
  @Input() tabIndex;
  @Input() sectionId;
  @Input() autoSave;
  @Input() isAutoSave;
  @Input() progress;
  @Input() allValidated;
  @Input() required;
  @Input() valueSelected;
  component: any;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

  ngOnInit() {
    console.log("1111111");
    console.log(this.config);
    this.config.RequestId = this.inRequestId;
    this.config.sectionId = this.sectionId;
    this.config.autoSave = this.autoSave;
    this.config.Question.Question.require = this.required;
    this.config.Question.Question.tabIndex = this.tabIndex;
    this.config.Question.Question.progress = this.progress;
    this.config.Question.Question.allValidated = this.allValidated;
    const component = this.selectComponentFn(this.config.Question.Question);
    const factory = this.resolver.resolveComponentFactory<IQuestionComponent>(component);
    this.component = this.container.createComponent<IQuestionComponent>(factory);
    this.component.instance.config = this.config;
    this.component.instance.isAutoSave = this.isAutoSave;
    // console.log(this.component);
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
