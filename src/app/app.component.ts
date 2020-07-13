import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { WpcDialogComponent } from './common/dynamicSharingComponent/wpc-dialog/wpc-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    injector: Injector
  ) {
    // 将“popupcomponent”转换为自定义元素。
    const PopupElement = createCustomElement(WpcDialogComponent, {injector});
    // 在浏览器中注册自定义元素。
    customElements.define('wpc-dialog', PopupElement);
  }
}
