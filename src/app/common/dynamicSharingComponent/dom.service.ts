import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Inject, Type, ComponentRef, EmbeddedViewRef, Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface DiologPos { // 不用了，定义dialog弹出层位置，使用传入插入节点进行显示
  top: string;
  left: string;
  width: string;
  height: string;
}
export interface DiologConfig {
  inputs: object;
  outputs: object;
  contentSolt?: {
    ref: ElementRef,
  },
  overLayParent?: string
}

@Injectable({
  providedIn: 'root'
})
export class DomService {

  private dialogComponentRef: ComponentRef<any>;
  private dialogComponentEle;
  private parentEl: ElementRef;
  private ParentIdEL: any; // 可以简化
  private soltRef: ElementRef; // 存储solt节点
  private render: Renderer2;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    // ComponentFactoryResolver 得到组件工厂类，将一个组件插入到组件树中
    // ApplicationRef得到angular程序组件树

    // render工厂方法
    this.render = rendererFactory.createRenderer(null, null);
    // dialog 添加节点
    this.parentEl = this.render.selectRootElement('body', true);
  }

  resolverComponentRef(
    dialog: Type<any>, 
    dialogConfig: DiologConfig
  ) {

    // 第一步使用this.resolver创建组件，并且使用this.injector将依赖进行实力化创建
    const dialogComponentRef = this.resolver
      .resolveComponentFactory(dialog)
      .create(this.injector);
    
    // 第二步将外部的config的input，output设置在组件类上
    this.attachConfig(dialogConfig, dialogComponentRef);
    this.dialogComponentRef = dialogComponentRef;

    // 第三步将创建的组件添加到组件试图树上
    this.appRef.attachView(dialogComponentRef.hostView);

    // 第四步将元素插入到具体的dom节点上
    this.dialogComponentEle = (dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // 有传进来的#viewChild，要插入dialogComponentEle的时，如下方法
    if (dialogConfig.contentSolt) {
      this.soltRef = dialogConfig.contentSolt.ref.nativeElement;
      const contentEle = this.dialogComponentEle.children[0].children[0].children[1];
      this.render.removeChild(contentEle, contentEle.children[0]);
      this.render.setStyle(this.soltRef, 'display', 'block'); // 将自定义solt显示出来
      this.render.appendChild(contentEle, this.soltRef);
    }

    // 有传进来的paren id就插入传入节点下，否则默认  插入body
    if (dialogConfig.overLayParent) {
      this.ParentIdEL = document.getElementById(dialogConfig.overLayParent);
      this.render.appendChild(this.ParentIdEL, this.dialogComponentEle);
    } else {
      this.render.appendChild(this.parentEl, this.dialogComponentEle);
    }
    
    // 第五步设置显示样式
    this.toggleAll();
    
    // Listen to the close event
    dialogComponentRef.instance.closed.subscribe(() => { // 可扩展closed属性
      console.log('dialog closed');
      this.removeComponent();
    });
  }

  private attachConfig(config: DiologConfig, componentRef: ComponentRef<any>) {
    const inputs = config.inputs;
    const outputs = config.outputs;
    // 对组件的input中的每一个key值进行设置上外部config中的值
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        const element = inputs[key];
        componentRef.instance[key] = element;
      }
    }
    // 对组件的Onput中的每一个key值进行设置上外部config中的值
    for (const key in outputs) {
      if (outputs.hasOwnProperty(key)) {
        const element = outputs[key];
        componentRef.instance[key] = element;
      }
    }
  }

  removeComponent() {
    this.render.removeChild(this.parentEl, this.dialogComponentEle);
    this.appRef.detachView(this.dialogComponentRef.hostView);
    if (this.soltRef) { 
      this.render.setStyle(this.soltRef, 'display', 'none'); // 单纯关闭dialog，也要不显示solt自定义ref
    }
  }

  private toggleAll() {
    if (this.ParentIdEL) {
      this.toggleVisibility(this.ParentIdEL); // 换成相对遮罩的父节点(注意应添加上: class="hidden")
    } else {
      this.toggleVisibility(this.render.selectRootElement('body', true));
    }
  }

  private toggleVisibility(element: HTMLElement) {
    if (element.classList.contains('show')) {
      element.classList.remove('show');
      element.classList.add('hidden');
      return;
    }
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      element.classList.add('show');
    }
  }

}
