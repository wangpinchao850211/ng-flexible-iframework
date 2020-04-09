import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowLayoutComponent } from './/flow-layout/flow-layout.component';
import { RxjsLibraryComponent } from './examples/rxjs-library/rxjs-library.component';
import { LazyloadComponent } from './examples/lazyload/lazyload.component';
import { MarkdownComponent } from './examples/markdown/markdown.component';
import { PrimeNGUiComponent } from './examples/prime-ng-ui/prime-ng-ui.component';
import { PipeComponent } from './examples/pipe/pipe';
import { InjectableFromComponent } from './examples/injectable/injectablecomponent/injectablecomponent';
import { RouterNavigationComponent } from './examples/router-navigation/router-navigation.component';

import { LoginLayoutComponent } from './login/layout/layout.component';
import { LoginComponent } from './login/login/login.component';
import { SetPasswordComponent } from './login/set-password/set-password.component';
import { DeniedComponent } from './login/denied/denied.component';

import { AuthenticationGuard } from './core/authentication/authentication.guard';

import { HtmlComponent } from './webKnowledge/html/html.component';

const routes: Routes = [
  // { path: '', redirectTo: 'flowlayout/markdown', pathMatch: 'full' },
  { path: '', redirectTo: 'passport/login', pathMatch: 'full' },
  {
    path: 'passport',
    component: LoginLayoutComponent,
    children: [
        {
          path: 'login',
          component: LoginComponent,
          data: { title: '登录'}
        },
        {
            path: 'setPassword',
            component: SetPasswordComponent,
            data: { title: '设置密码' }
        },
        {
            path: 'forgetPassWord',
            component: SetPasswordComponent,
            data: { title: '忘记密码' }
        },
        // {
        //     path: 'lock',
        //     component: UserLockComponent,
        //     data: { title: '锁屏' }
        // },
    ]
  },
  {
    path: 'flowlayout',
    component: FlowLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'markdown', component: MarkdownComponent },
      { path: 'rxjs', component: RxjsLibraryComponent },
      // 惰性加载的语法：[loadChildren] 后面紧跟着一个字符串，它指向模块的相对路径，然后是一个 #，然后是该模块的类名
      { path: 'lazyload', loadChildren: () => import('./examples/lazyload/lazyload.module').then(m => m.LazyloadModule) },
      { path: 'primeng-ui', component: PrimeNGUiComponent },
      { path: 'pipe', component: PipeComponent },
      { path: 'questionnaire', loadChildren: () => import('./examples/Questionnaire/questionnaire.module').then(m => m.QuestionnaireModule) },
      { path: 'injectablecomponent', component: InjectableFromComponent },
      { path: 'routerNaigation', component: RouterNavigationComponent },
    ]
  },
  {
      path: 'TeLayout',
      component: FlowLayoutComponent,
      canActivate: [AuthenticationGuard],
      children: [
          {
            path: 'html',
            component: HtmlComponent
          },
      ]
  },
  {
      path: 'access-denied',
      component: DeniedComponent
  },
  { path: '**', redirectTo: 'flowlayout' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
