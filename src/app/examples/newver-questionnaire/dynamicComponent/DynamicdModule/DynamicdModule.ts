import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { QuestionService } from '../../question.service';

import { BrowserModule } from '@angular/platform-browser';
// import { PipeModuel } from '../../../../../../common/HostModule/HostModule';
// import { DirectiveModuel } from '../../../directive/clicktoggle.directive';

import { dynamicDate } from '../date/date';
import { dynamicInput } from '../input/input';
import { dynamicPhone } from '../phone/phone';
import { dynamicRange } from '../range/range';
import { dynamicCheckBox } from '../checkBox/checkBox';
import { dynamicTextarea } from '../textarea/textarea';
import { dynCountrySelect } from '../countryselect/countryselect';
import { dynMultiSelect } from '../multiSelect/multiSelect';
import { dynAutoSearch } from '../autoSearch/autoSearch';
import { dynamicdynRadio } from '../radio/radio';
import { notMaped } from '../notMaped/notMaped';
import { dynamicSingleSelect } from '../singleSelect/singleSelect';
import { dynamicLabel } from '../label/label';
import { dynamicMultiKeyValuePair, dynamicMultiKeyValuePairPanel } from '../multiKeyValuePair/multiKeyValuePair';
import { dynamicMultiKeyValuePairTooltip, dynamicMultiKeyValuePairPanelTooltip } from '../multiKeyValuePairToolTip/multiKeyValuePairToolTip';
import { InputAutoSearch } from '../inputAutoSearch/inputAutoSearch';
import { sharedComponent } from '../sharedComponent/sharedComponent';
import { ErrorMsgComponent } from '../errorMsgComponent/errorMegComponet';
import { SafeHtmlPipe } from '../pipes/SafeHtml.pipe';

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

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // PipeModuel,
    // DirectiveModuel,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    SafeHtmlPipe,
    ...Components
  ],
  exports: [
    ...Components,
  ],
  entryComponents: [
    ...Components,
  ],
  providers: [QuestionService]
})

export class NewDynamicModule { }

