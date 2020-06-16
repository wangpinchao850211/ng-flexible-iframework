import { createReducer, on } from '@ngrx/store';
import { toolbar } from '../action/theme.action';
import { ThemeToolbar } from '../common/domain/theme';

export interface State {
    toolbar:  ThemeToolbar 
};

export const initToolbarTheme: State = {
    toolbar: {
        Tbackground: '#030c2799',
        TcustomBackgroundColor: 'Use custom background color',
        Thidden: false,
        toolbarPosition: 'Below Static'
    }
}

const _toolbarThemeReducer = createReducer(initToolbarTheme,
    on(toolbar, (state, response) => {
        
        console.log(response);
        return response;
    })
);

export function toolbarThemeReducer(state, action) {
    return _toolbarThemeReducer(state, action);
}
