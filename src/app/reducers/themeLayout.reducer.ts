import { createReducer, on } from '@ngrx/store';
import { layoutStyle } from '../action/theme.action';

export interface State {
    layout: string;
}

export const initThemeLayout: State = {
    layout: 'Vertical Layout #1'
}

const _themeStyleReducer = createReducer(initThemeLayout,
    on(layoutStyle, (state, response) => {
        console.log(response);
        return response;
    })
);

export function themeStyleReducer(state, action) {
    return _themeStyleReducer(state, action);
}
