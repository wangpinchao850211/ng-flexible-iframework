import { Component, OnInit, ElementRef } from '@angular/core';
// import { Message } from 'primeng/components/common/api';
import { Message, MessageService } from 'primeng/api';
import { DependencyService } from 'src/app/common/Questionnaire/dynamicComponents/service/dependency/dependency';
import { DataSource } from 'src/app/common/Questionnaire/DataSource';
import { CONFIG } from 'src/app/common/Questionnaire/service/config/config';

@Component({
    selector: 'questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css'],
    providers: [MessageService]
})

export class QuestionnaireComponent implements OnInit {
    public sections: any;
    public isAllValid = false;
    public isAutoSave: any;
    public tabIndex = 0;
    public msgs: Message[] = [];
    public autoSave = {
        callBack: (param) => {
            console.log(param);
            const successInfo = this.el.nativeElement.querySelector('#successInfo');
            successInfo.style.display = 'block';
            successInfo.addEventListener('webkitAnimationEnd', () => {
                successInfo.style.display = 'none';
            });
        },
        updated: { flage: false }
    };

    constructor(private dependencyService: DependencyService, private el: ElementRef, private messageService: MessageService) { }

    ngOnInit(): void {
        this.sections = DataSource.data.Sections;
        console.log(this.sections);
        this.isAutoSave = CONFIG[0].useValue.IsAutoSave;
        this.dependencyService.fromartTabData(this.sections);
        this.el.nativeElement.querySelector('#successInfo').style.display = 'none';
    }

    changeTab(index) {
        this.tabIndex = index;
    }

    showSuccessTab() {
        this.msgs = [];
        this.msgs.push({ key: 'tab1', severity: 'success', summary: 'Submited successfully.', detail: '' });
    }

    // showSuccessTab2() {
    //     this.msgs = [];
    //     this.msgs.push({ key: 'tab2', severity: 'success', summary: 'Submited successfully.', detail: '' });
    // }

    // showSuccessTab3() {
    //     this.msgs = [];
    //     this.msgs.push({ key: 'tab3', severity: 'success', summary: 'Submited successfully.', detail: '' });
    // }
}
