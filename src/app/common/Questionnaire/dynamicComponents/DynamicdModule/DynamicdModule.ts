import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDirective, Components } from '../directive/dynamic.directive';
import { DependencyService } from '../service/dependency/dependency';
import { ProgressService } from '../service/progress/progress';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SafeHtmlPipe } from 'src/app/common/pipes/SafeHtml.pipe';
import { BrowserModule } from '@angular/platform-browser';
// import { PipeModuel } from '../../../../../../common/HostModule/HostModule';
// import { DirectiveModuel } from '../../../directive/clicktoggle.directive';

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
    DynamicDirective,
    SafeHtmlPipe,
    ...Components
  ],
  exports: [
    DynamicDirective,
    ...Components,
  ],
  entryComponents: [
    ...Components,
  ],
  providers: [
    ProgressService,
    DependencyService
  ]
})
export class DynamicModule { }

