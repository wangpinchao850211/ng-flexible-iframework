import { NgModule } from '@angular/core';
import { QuestionnaireRouting, Components } from './questionnaire.routing';
import { DynamicModule } from 'src/app/common/Questionnaire/dynamicComponents/DynamicdModule/DynamicdModule';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
    imports: [
        CommonModule,
        QuestionnaireRouting,
        DynamicModule,
        MessageModule,
        MessagesModule
    ],
    declarations: [
        ...Components
    ],
    providers: []
})

export class QuestionnaireModule {
}
