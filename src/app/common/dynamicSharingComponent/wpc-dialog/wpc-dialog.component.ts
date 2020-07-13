import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wpc-dialog',
  templateUrl: './wpc-dialog.component.html',
  styleUrls: ['./wpc-dialog.component.scss']
})
export class WpcDialogComponent implements OnInit {

  @Input() wpc: string;
  @Input() buttons: Array<any>;
  @Input() position: string;
  @Input() solt: boolean;
  @Output() DialogSubmitted = new EventEmitter(); // 调用处事件传递，可关闭dialog
  @Output() closed = new EventEmitter(); // dialog 关闭方法一：使用dom service事件监听关闭

  constructor(
    private El: ElementRef
  ) {}

  ngOnInit() {
    this.buttons.forEach(button => {
      button.clickEvent = new EventEmitter();
      button.clickEvent.subscribe((data) => {
        console.log(data);
        if (!!data) {
          button.action(data);
        } else {
          button.action();
        }
      });
    });
    
    // console.log(this.wpc);
    // console.log(this.buttons);
    // console.log(this.position);
    // console.log(this.solt);

    if (this.position) {
      this.renderContent();
    }
  }

  renderContent() {
    const contentEl = this.El.nativeElement.children[0].children[0];
    switch (this.position) {
      case 'top':
        contentEl.style.top = '20px';
        break;
      case 'right':
        contentEl.style.right = '20px';
        contentEl.style.left = 'auto';
        break;
      case 'bottom':
        contentEl.style.bottom = '20px';
        contentEl.style.top = 'auto';
        break;
      case 'left':
        contentEl.style.left = '20px';
        break;
      default:
        break;
    }
  }

  removeDialog(ev: Event) {
    this.closed.next();
  }

  submit() {
    if (this.solt) {
      this.DialogSubmitted.emit(true); // 提交了
    }
  }

  handleClick(button) { // 循环出的button点击方法都走这里
    if (button.clickEvent) {
      switch (button.label) {
        case 'yes': 
          // 执行提交操作 当dialog提交数据在dialog组件,就可以使用此方式提交
          button.clickEvent.emit({ // 使用第二种butClick提交数据和关闭
            name: 'wangqixuan',
            password: 'wqx0211'
          }); 
          break;
        case 'no':
          button.clickEvent.emit(); // 使用第二种butClick emit 
          break;
        case 'ok': 
          // 执行提交操作
          button.clickEvent.emit({
            name: 'wangqixuan',
            password: 'wqx0211'
          });
          break;
        case 'cancel':
          button.clickEvent.emit(); // 使用第二种butClick emit 
          break;
        case 'close': 
          this.closed.next(); // 单纯关闭dialog
          break;
        case 'wait':
          break;
        case 'submit': 
          this.submit(); // 使用第三种outputs方式进行了提交
          break;
        default:
          break;
      }
    }
  }
}
