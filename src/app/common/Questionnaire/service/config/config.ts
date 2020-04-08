import { InjectionToken } from '@angular/core';

const QUESTIONVALUE = {
    "IsAutoSave": true,
    "IsShowTooltip": true
};

export const QUESTION = new InjectionToken<any>('question');
const QUESTION_CONFIG = { provide: QUESTION, useValue: QUESTIONVALUE }


export const CONFIG = [
	QUESTION_CONFIG
];
