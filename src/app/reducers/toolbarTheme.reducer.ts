import { createReducer, on } from '@ngrx/store';
import { toolbar } from '../action/theme.action';
import { ThemeToolbar, toolbarEntity } from '../common/domain/theme';

export interface State {
    toolbar:  ThemeToolbar,
    falg: number,
    falgKey: string
};

export const initToolbarTheme: State = {
    toolbar: toolbarEntity,
    falg: 0,
    falgKey: ''
}

const _toolbarThemeReducer = createReducer(initToolbarTheme,
    on(toolbar, (state, response) => {
        console.log(response);
        console.log(state);
        return response;
    })
);

export function toolbarThemeReducer(state, action) {
    return _toolbarThemeReducer(state, action);
}
