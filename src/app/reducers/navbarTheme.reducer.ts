import { createReducer, on } from '@ngrx/store';
import { navbar } from '../action/theme.action';
import { ThemeNavbar, navEntity } from '../common/domain/theme';

export interface State {
    navbar:  ThemeNavbar,
    falg: number,
    falgKey: string
};

export const initNavbarTheme: State = {
    navbar: navEntity,
    falg: 0,
    falgKey: ''
}

const _navbarThemeReducer = createReducer(initNavbarTheme,
    on(navbar, (state, response) => {
        console.log(response);
        return response;
    })
);

export function navbarThemeReducer(state, action) {
    return _navbarThemeReducer(state, action);
}
