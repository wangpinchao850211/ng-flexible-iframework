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

  indexArr: Array<number> = [-1];

  allQuestionData: Array<any> = []; // 所有数据
  questions = []; // 组装成的二维数组
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
    this.allQuestionData = this.Qservice.fromartTabData(this.Qservice.sections);

    // 页面渲染整体数据组装
    this.allQuestionData.forEach((item) => {
      this.questions.push(this.Assemblservice.assemblyComponent(item.Section.Rows));
    });
    // console.log(this.questions);
  }

  ngOnInit() {
    // console.log(this.Qservice.dataRows); // 可渲染所有question
    // this.questions = this.Assemblservice.assemblyComponent(this.Qservice.dataRows); 
    this.isAutoSave = CONFIG[0].useValue.IsAutoSave;
    this.el.nativeElement.querySelector('#successInfo').style.display = 'none';
  }

  openNext() {
      this.indexArr[0] = (this.indexArr[0] === 2) ? 0 : this.indexArr[0] + 1;
  }
  
  openPrev() {
      this.indexArr[0] = (this.indexArr[0] === 0) ? 2 : this.indexArr[0] - 1;
  }

  onTabClose(event) {
    console.log(event);
  }

  onTabOpen(event) {
    console.log(event);
  }

  activeIndexChange(event) {
    console.log(event);
  }
}
