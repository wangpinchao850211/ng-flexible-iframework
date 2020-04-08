
import { PipeComponent } from './pipe';
import { PipeModuel } from '../../../app/common/HostModule/HostModule'
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        PipeModuel,
        MarkdownModule,
    ],
    declarations: [
        PipeComponent
    ],
    exports: [
        PipeComponent,
    ]
})

export class PipeComponentModel { }
