
import { InjectableFromComponent } from './injectablecomponent/injectablecomponent';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../common/services/heroservice';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,       
        BrowserModule,
        MarkdownModule,
    ],
    declarations: [
        InjectableFromComponent
    ],
    
    exports: [
        InjectableFromComponent,
    ],
    providers: [HeroService]
})

export class InjectableFromComponentModel { }

