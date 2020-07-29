import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-wrapper',
  templateUrl: './question-wrapper.component.html',
  styleUrls: ['./question-wrapper.component.scss']
})
export class QuestionWrapperComponent implements OnInit {

  questions = [];

  constructor(
    private Qservice: QuestionService
  ) {
    console.log(this.Qservice.sections);
    this.Qservice.fromartData(this.Qservice.sections);
  }

  ngOnInit() {
    console.log(this.Qservice.dataRows);
    console.log(this.Qservice.assemblyComponent());
    // this.questions = this.Qservice.dataRows;
  }

}
