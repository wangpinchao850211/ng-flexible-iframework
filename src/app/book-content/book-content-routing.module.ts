import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';
import { BookResolerService } from './book-resoler.service';
import { BookAuthComponent } from './book-auth/book-auth.component';
import { BookAuthGuard } from './guard/book-auth.guard';


const routes: Routes = [
    {
        path: ':id', 
        component: BookDetailComponent,
        canActivate: [BookAuthGuard],
        canDeactivate: [CanDeactivateGuard],
        resolve: {
            book: BookResolerService
        }
    },
    { // 这个可以作为默认组件，当有id时，显示id组件，没有时显示此组件, 显示权限信息
        path: '',
        component: BookAuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BookContentRoutingModule { }

