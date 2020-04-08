import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Events {
    IntermediariesTab: EventEmitter<any> = new EventEmitter();
    clearData: EventEmitter<any> = new EventEmitter();
    IsClosed: EventEmitter<any> = new EventEmitter<any>();
    IsSuccess: EventEmitter<any> = new EventEmitter<any>();
    files: EventEmitter<any> = new EventEmitter<any>();
    questionId: EventEmitter<any> = new EventEmitter<any>();
}
