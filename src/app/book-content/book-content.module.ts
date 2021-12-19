import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookContentRoutingModule } from './book-content-routing.module';
import { BookAuthComponent } from './book-auth/book-auth.component';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [BookDetailComponent, BookAuthComponent],
  imports: [
    CommonModule,
    FormsModule, // 这个是可使用ng-modle绑定
    ReactiveFormsModule, // 这个是可以使用form表单绑定
    ToastModule, // (异步加载组件单独引入,调用不了外部急性加载组件toast)
    BookContentRoutingModule
  ],
  providers: [
    MessageService // (异步加载组件单独引入,调用不了外部急性加载组件toast)
  ]
})
export class BookContentModule { }
