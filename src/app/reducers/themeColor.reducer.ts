import { createReducer, on } from '@ngrx/store';
import { themeColor } from '../action/theme.action';

export interface State {
    color: string;
}

export const initThemeColor: State = {
    color: '#030c2799'
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
