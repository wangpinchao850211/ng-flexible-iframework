import { NgModule } from '@angular/core';
import { RouterNavigationRouting, Components } from './router-navigation.routing';
import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
@NgModule({
    imports: [
        RouterNavigationRouting
    ],
    declarations: [
        ...Components,
    ],
    providers: [CanDeactivateGuard]
})

export class RouterNavigationModule {}