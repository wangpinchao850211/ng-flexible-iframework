import { createReducer, on } from '@ngrx/store';
import { layoutWidth } from '../action/theme.action';

export interface State {
    boxWidth: string;
}

export const initThemeWidth: State = {
    boxWidth: 'Fullwidth'
}

const _themeWidthReducer = createReducer(initThemeWidth,
    on(layoutWidth, (state, response) => {
        console.log(response);
        return response;
    })
);

export function themeWidthReducer(state, action) {
    return _themeWidthReducer(state, action);
}
