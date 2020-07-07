import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookContentRoutingModule } from './book-content-routing.module';
import { BookAuthComponent } from './book-auth/book-auth.component';



@NgModule({
  declarations: [BookDetailComponent, BookAuthComponent],
  imports: [
    CommonModule,
    BookContentRoutingModule
  ]
})
export class BookContentModule { }
