import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from '../question.service';
import { AssemblComponentsService } from '../assembComponent.service';
import { CONFIG } from '../config';

@Component({
  selector: 'app-question-wrapper',
  templateUrl: './question-wrapper.component.html',
  styleUrls: ['./question-wrapper.component.scss'],
  providers: [ QuestionService, AssemblComponentsService ]
})
export class QuestionWrapperComponent implements OnInit {
  questions = [];
  public isAutoSave: any;
  public tabIndex = 0;
  public autoSave = {
      callBack: (param) => {
          // console.log(param);
          const successInfo = this.el.nativeElement.querySelector('#successInfo');
          successInfo.style.display = 'block';
          successInfo.addEventListener('webkitAnimationEnd', () => {
              successInfo.style.display = 'none';
          });
      },
      updated: { flage: false }
  };

  constructor(
    private Qservice: QuestionService,
    private Assemblservice: AssemblComponentsService,
    private el: ElementRef
  ) {
    console.log(this.Qservice.sections);
    this.Qservice.fromartTabData(this.Qservice.sections);
  }

  ngOnInit() {
    console.log(this.Qservice.dataRows);
    this.questions = this.Assemblservice.assemblyComponent(this.Qservice.dataRows);
    this.isAutoSave = CONFIG[0].useValue.IsAutoSave;
    this.el.nativeElement.querySelector('#successInfo').style.display = 'none';
  }

}
