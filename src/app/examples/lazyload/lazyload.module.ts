import { NgModule } from '@angular/core';
import { LazyloadRouting, Components } from './lazyload.routing';

@NgModule({
    imports: [
        LazyloadRouting
    ],
    declarations: [
        ...Components,
    ],
    providers: []
})

export class LazyloadModule {}