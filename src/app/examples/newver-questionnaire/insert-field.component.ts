import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { QuestionDirective } from './question.directive';

@Component({
  selector: 'app-insert-field',
  template: `
    <ng-template appQuestion></ng-template>
  `,
  styles: []
})
export class InsertFieldComponent implements OnInit, AfterViewInit {

  @ViewChild(QuestionDirective, { static: false }) questionHost: QuestionDirective;

  currentComponent = null;//当前的组件

  @Input() question: any;//需要动态加载组件

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    console.log(this.question);
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    console.log(this.question);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.question.component);
    let viewContainerRef = this.questionHost.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
