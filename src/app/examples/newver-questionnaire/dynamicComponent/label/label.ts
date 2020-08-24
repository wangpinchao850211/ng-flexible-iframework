import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';

@Component({
    selector: 'dynamic-label',
    templateUrl: './label.html',
    styleUrls: ['./label.scss']
})
export class dynamicLabel implements OnInit {
    public config: any;
    public Question: any;
    public validataion: any;
    public isDependOn: boolean = false;

    constructor(private dependency: QuestionService) { }

    ngOnInit() {
        this.Question = this.config.Question.Question;
        this.validataion = [];
        this.isDependOn = this.dependency.hasDependOn(this.Question.QuestionId);
        this.dependency.checkDependcyFn(this.Question);
    }
}
