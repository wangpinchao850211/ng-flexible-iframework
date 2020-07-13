import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Inject, ComponentRef, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomService, DiologConfig } from './dom.service';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { WpcDialogComponent } from './wpc-dialog/wpc-dialog.component';

export enum ButtonCommand {
  yes,
  no,
  ok,
  cancel,
  close,
  wait,
  submit
}

export class ConfirmService {

  requireConfirmationSource = new Subject<DiologConfig>()
  requireConfirmation$ = this.requireConfirmationSource.asObservable()

  confirm(confirmation: DiologConfig) {
    this.requireConfirmationSource.next(confirmation)
    return this
  }

}

/**
 * 实际dialog封装原则：
 * 参数一：业务dialog： DialogService OpenDialog方法可以接受外部传入业务dialog(业务dialog会调用通用组件WpcDialogComponent，这个通用组件是一个插槽组件，将业务dialog内容插入显示内容区，这样无需将业务数据传递给通用组件)
 * 参数二：dialogConfig设置到 业务dialog组件上，但是position是设置在查入层位置
 * 
 * 此项目自己封装dialog原则：没有将通用dialog的封装成完全插槽组件
 * 
 * 参数一，二：dialogConfig inputs Outputs设置到 通用dialog组件上
 * 
 * 参数三contentSolt：可传递，当传入时，是传递调用处定义#ref模板引用变量，插入通用dialog中 未传递，dialog显示默认的confirm弹出层
 * 
 * 参数四：overLayParent可传递，是设置遮罩层的参照父级（通过传递调用处定义#ref模板引用变量或者是id标识，获取到插入节点）
 * 
 * */ 

@Injectable()
export class DialogService {

  constructor(
    private domService: DomService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async OpenDialog(config: DiologConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let btns = []; // 将每个button添加自己的回调方法
      for (const key in config.inputs) {
        if (config.inputs.hasOwnProperty(key) && key === 'buttons') {
          config.inputs[key].forEach(i => {
            btns.push({
              label: i,
              action: (res) => {
                // console.log(res);
                const result = {
                  falg: this.resolveBtn(i),
                  data: res ? res : null
                };
                resolve(result);
              }
            });
          });
        }
      }
      
      // console.log(btns);
      config.inputs['buttons'] = [];
      config.inputs['buttons'] = btns;
      // console.log(config);

      // confirmService.confirm(Config); 可以使用这种Observable来初始化dialog的Input属性
      this.domService.resolverComponentRef(WpcDialogComponent, config);
    });
  }

  resolveBtn(i) {
    switch (i) {
      case 'cancel':
        return ButtonCommand.cancel;
      case 'submit':
        return ButtonCommand.submit;
      case 'close':
        return ButtonCommand.close;
      case 'ok':
        return ButtonCommand.ok;
      case 'yes':
        return ButtonCommand.yes;
      case 'no':
        return ButtonCommand.no;
      case 'wait':
        return ButtonCommand.wait;
      default:
        break;
    }
  }

  CloseDialog() {
    this.domService.removeComponent();
  }

}
