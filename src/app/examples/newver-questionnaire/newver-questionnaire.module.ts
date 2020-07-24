import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestionWrapperComponent } from './question-wrapper/question-wrapper.component';

const routes: Routes = [
  {
      path: '', component: QuestionWrapperComponent,
  }
];

@NgModule({
  declarations: [QuestionWrapperComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class NewverQuestionnaireModule { }
