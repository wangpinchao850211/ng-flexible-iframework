import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';     // accordion and accordion tab
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowLayoutComponent } from './flow-layout/flow-layout.component';
import { RxjsLibraryComponent } from './examples/rxjs-library/rxjs-library.component';
import { MarkdownComponent } from './examples/markdown/markdown.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import {TooltipModule} from 'primeng/tooltip';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '../app/common/http-interceptors/index';
import { AjaxService } from './common/ajax/ajax.service';
import { HttpErrorHandler } from './common/services/http-error-handler.service';
import { LoggerService } from './common/services/logger.service';
import { RouterNavigationModule } from './examples/router-navigation/router-navigation.module';

import { LoginLayoutComponent } from './login/layout/layout.component';
import { LoginComponent } from './login/login/login.component';
import { SetPasswordComponent } from './login/set-password/set-password.component';
import { PromptMessageComponent } from './login/prompt-message/prompt-message.component';

// External plugins
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { PrimeNGUiComponent } from './examples/prime-ng-ui/prime-ng-ui.component';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import { CoreModule } from './core/core.module';
import { PipeComponentModel } from '../app/examples/pipe/Module';
import { InjectableFromComponentModel } from './examples/injectable/Module';
import { GalleriaModule } from 'primeng/galleria';

// 全局管理
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, initState } from './reducers';
import { HtmlComponent } from './webKnowledge/html/html.component';
import { DeniedComponent } from './login/denied/denied.component';


export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };
  return {
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FlowLayoutComponent,
    RxjsLibraryComponent,
    MarkdownComponent,
    PrimeNGUiComponent,
    LoginLayoutComponent,
    LoginComponent,
    SetPasswordComponent,
    PromptMessageComponent,
    HtmlComponent,
    DeniedComponent
  ],
  entryComponents: [
    PromptMessageComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    RadioButtonModule,
    TabMenuModule,
    TooltipModule,
    AccordionModule,
    PanelMenuModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    PipeComponentModel,
    InjectableFromComponentModel,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptions
      }
    }),
    RouterNavigationModule,
    GalleriaModule,
    StoreModule.forRoot(reducers, {
      initialState: initState,
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [
    httpInterceptorProviders,
    AjaxService,
    HttpErrorHandler,
    LoggerService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

