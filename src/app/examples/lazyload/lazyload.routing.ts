import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyloadComponent } from './lazyload.component';

const routes: Routes = [
    {
        path: '',  component: LazyloadComponent,
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})

export class LazyloadRouting {}

export const Components = [
    LazyloadComponent,
];
