import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleQuestionnaireComponent } from './simpleQuestionnaire/simpleQuestionnaire.component';
import { QuestionnaireRouting } from './simpleQuestionnaire.routing';

@NgModule({
  imports: [
    CommonModule,
    QuestionnaireRouting
  ],
  declarations: [SimpleQuestionnaireComponent]
})
export class SimpleQuestionnaireModule { }
