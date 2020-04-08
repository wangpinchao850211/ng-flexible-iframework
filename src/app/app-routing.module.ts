import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowLayoutComponent } from './/flow-layout/flow-layout.component';
import { RxjsLibraryComponent } from './examples/rxjs-library/rxjs-library.component';
import { LazyloadComponent } from './examples/lazyload/lazyload.component';
import { MarkdownComponent } from './examples/markdown/markdown.component';
import { PrimeNGUiComponent } from './examples/prime-ng-ui/prime-ng-ui.component';
import { AjaxComponent } from './examples/ajax/ajax.component';
import { PipeComponent } from './examples/pipe/pipe';
import { InjectableFromComponent } from './examples/injectable/injectablecomponent/injectablecomponent';
import { RouterNavigationComponent } from './examples/router-navigation/router-navigation.component';

import { HtmlComponent } from './webKnowledge/html/html.component';

const routes: Routes = [
  // { path: '', redirectTo: 'flowlayout/markdown', pathMatch: 'full' },
  { path: '', redirectTo: 'RouterNavigationSample', pathMatch: 'full' },
  {
    path: 'flowlayout',
    component: FlowLayoutComponent,
    children: [
      { path: 'markdown', component: MarkdownComponent },
      { path: 'rxjs', component: RxjsLibraryComponent },
      // 惰性加载的语法：[loadChildren] 后面紧跟着一个字符串，它指向模块的相对路径，然后是一个 #，然后是该模块的类名
      { path: 'lazyload', loadChildren: () => import('./examples/lazyload/lazyload.module').then(m => m.LazyloadModule) },
      { path: 'primeng-ui', component: PrimeNGUiComponent },
      { path: 'ajax', component: AjaxComponent },
      { path: 'pipe', component: PipeComponent },
      { path: 'questionnaire', loadChildren: () => import('./examples/Questionnaire/questionnaire.module').then(m => m.QuestionnaireModule) },
      { path: 'injectablecomponent', component: InjectableFromComponent },
      { path: 'routerNaigation', component: RouterNavigationComponent },
    ]
  },
  {
      path: 'TeLayout',
      component: FlowLayoutComponent,
      children: [
          {
            path: 'html',
            component: HtmlComponent
          },
      ]
  },
  { path: '**', redirectTo: 'flowlayout' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
