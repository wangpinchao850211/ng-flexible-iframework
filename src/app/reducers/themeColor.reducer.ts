import { createReducer, on } from '@ngrx/store';
import { themeColor } from '../action/theme.action';
import { themeColorEntity } from '../common/domain/theme';

export interface State {
    color: string;
}

export const initThemeColor: State = {
    color: themeColorEntity
}

const _themeColorReducer = createReducer(initThemeColor,
    on(themeColor, (state, response) => {
        console.log(response);
        return response;
    })
);

export function themeColorReducer(state, action) {
    return _themeColorReducer(state, action);
}
