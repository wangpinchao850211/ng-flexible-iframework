import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '../../core/route.service';
import { RouterNavigationComponent } from './router-navigation.component';
import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
// const routes: Routes = [
//     {
//         path: '',  component: RouterNavigationComponent,
//     }
// ];


const routes: Routes = [
    Route.withShell([
        { path: '', redirectTo: '/RouterNavigationSample', pathMatch: 'full' },
        {
            path: 'RouterNavigationSample', component: RouterNavigationComponent,
            canDeactivate: [CanDeactivateGuard], data: { title: 'RouterNavigationSampleTest' }
        }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class RouterNavigationRouting { }

export const Components = [
    RouterNavigationComponent,
];
