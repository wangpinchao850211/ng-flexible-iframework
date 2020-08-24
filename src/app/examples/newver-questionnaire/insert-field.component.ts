import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, AfterViewInit, ViewContainerRef } from '@angular/core';
import { QuestionDirective } from './question.directive';
import { QuestionService } from './question.service';
import { IQuestionComponent } from './IQuestionComponent'

@Component({
  selector: 'app-insert-field',
  template: `
    <ng-template appQuestion></ng-template>
  `,
  styles: []
})
export class InsertFieldComponent implements OnInit, AfterViewInit {

  @ViewChild(QuestionDirective, { static: true }) questionHost: QuestionDirective;

  currentComponent = null;//当前的组件

  @Input() question: any;//需要动态加载组件

  @Input() inRequestId;
  @Input() tabIndex;
  @Input() sectionId;
  @Input() autoSave;
  @Input() isAutoSave;
  @Input() progress;
  @Input() allValidated;
  @Input() required;
  @Input() valueSelected;

  constructor(
    private Qservice: QuestionService,
    private componentFactoryResolver: ComponentFactoryResolver, 
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngAfterViewInit() {
    // this.loadComponent(); 放上面了，否则Question.display报错，生命周期问题
  }

  loadComponent() {
    console.log(this.question);
    this.setQuestion(this.question.data);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<IQuestionComponent>(this.question.component);

    let viewContainerRef = this.questionHost.viewContainerRef;
    // let viewContainerRef = this.container;

    let componentRef = viewContainerRef.createComponent<IQuestionComponent>(componentFactory);
    (<any>componentRef.instance).config = this.question.data;
    (<any>componentRef.instance).isAutoSave = this.isAutoSave;
  }

  setQuestion(config) {
    config.RequestId = this.inRequestId;
    config.sectionId = this.sectionId;
    config.autoSave = this.autoSave;
    config.Question.Question.require = this.required;
    config.Question.Question.tabIndex = this.tabIndex;
    config.Question.Question.progress = this.progress;
    config.Question.Question.allValidated = this.allValidated;
  }
}
