import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestionWrapperComponent } from './question-wrapper/question-wrapper.component';
import { QuestionDirective } from './question.directive';
import { InsertFieldComponent } from './insert-field.component';
import { NewDynamicModule } from './dynamicComponent/DynamicdModule/DynamicdModule';

const routes: Routes = [
  {
      path: '', component: QuestionWrapperComponent,
  }
];

@NgModule({
  declarations: [
    QuestionWrapperComponent, 
    QuestionDirective,
    InsertFieldComponent,
  ],
  imports: [
    NewDynamicModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  entryComponents: [InsertFieldComponent]
})
export class NewverQuestionnaireModule { }
