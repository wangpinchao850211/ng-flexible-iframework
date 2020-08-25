import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestionWrapperComponent } from './question-wrapper/question-wrapper.component';
import { QuestionDirective } from './question.directive';
import { InsertFieldComponent } from './insert-field.component';
import { NewDynamicModule } from './dynamicComponent/DynamicdModule/DynamicdModule';
// import { QuestionService } from './question.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

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
    CommonModule,
    AccordionModule, // 注意在哪使用，就在哪个module引入
    ButtonModule
  ],
  entryComponents: [InsertFieldComponent],
  providers: []
})
export class NewverQuestionnaireModule { }
