import { createReducer, on } from '@ngrx/store';
import { navbar } from '../action/theme.action';
import { ThemeNavbar } from '../common/domain/theme';

export interface State {
    navbar:  ThemeNavbar 
};

export const initNavbarTheme: State = {
    navbar: {
        Nbackground: '#030c2799',
        folded: false,
        Nhidden: false,
        navbarPosition: 'Left'
    }
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
