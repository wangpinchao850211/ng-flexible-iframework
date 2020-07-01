import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginLayoutComponent } from './login/layout/layout.component';
import { LoginComponent } from './login/login/login.component';
import { SetPasswordComponent } from './login/set-password/set-password.component';
import { PromptMessageComponent } from './login/prompt-message/prompt-message.component';
import { DeniedComponent } from './login/denied/denied.component';

import { FlowLayoutComponent } from './flow-layout/flow-layout.component';
import { RxjsLibraryComponent } from './examples/rxjs-library/rxjs-library.component';
import { MarkdownComponent } from './examples/markdown/markdown.component';
import { PrimeNGUiComponent } from './examples/prime-ng-ui/prime-ng-ui.component';
import { PipeComponentModel } from '../app/examples/pipe/Module';
import { RouterNavigationModule } from './examples/router-navigation/router-navigation.module';
import { BooksComponent } from './webKnowledge/books/books.component';

import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from '../app/common/http-interceptors/index';
import { AjaxService } from './common/ajax/ajax.service';
import { HttpErrorHandler } from './common/services/http-error-handler.service';
import { LoggerService } from './common/services/logger.service';

// External plugins
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
// primeng
import { AccordionModule } from 'primeng/accordion';     // accordion and accordion tab
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';

// 全局管理
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, initState } from './reducers';
import { CardComponent } from './webKnowledge/card/card.component';
import { ListComponent } from './webKnowledge/list/list.component';
import { WpcMenuComponent } from './flow-layout/share/wpc-menu/wpc-menu.component';
import { WpcHeaderComponent } from './flow-layout/share/wpc-header/wpc-header.component';
import { WpcFooterComponent } from './flow-layout/share/wpc-footer/wpc-footer.component';
import { WpcTabComponent } from './flow-layout/share/wpc-tab/wpc-tab.component';
import { WpcOptionsComponent } from './themes/wpc-options/wpc-options.component';
import { ThemeSoltComponent } from './themes/theme-solt/theme-solt.component';
import { FilterBookPipe } from './common/pipes/searchBook.pipe';

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

const primeModule = [
    FileUploadModule,
    RadioButtonModule,
    TabMenuModule,
    TooltipModule,
    AccordionModule,
    PanelMenuModule,
    CheckboxModule,
    DropdownModule,
    InputSwitchModule,
    GalleriaModule,
    RatingModule,
    TableModule
];

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
    BooksComponent,
    DeniedComponent,
    CardComponent,
    ListComponent,
    WpcMenuComponent,
    WpcHeaderComponent,
    WpcFooterComponent,
    WpcTabComponent,
    WpcOptionsComponent,
    ThemeSoltComponent,
    FilterBookPipe
  ],
  entryComponents: [
    PromptMessageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    AppRoutingModule,
    PipeComponentModel,
    RouterNavigationModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...primeModule,
    BrowserAnimationsModule,
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

