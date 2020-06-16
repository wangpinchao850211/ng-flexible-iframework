import { createReducer, on } from '@ngrx/store';
import { footer } from '../action/theme.action';
import { ThemeFooter } from '../common/domain/theme';

export interface State {
    footer:  ThemeFooter 
};

export const initFooterTheme: State = {
    footer: {
        Fbackground: '#030c2799',
        FcustomBackgroundColor: 'Use custom background color',
        Fhidden: false,
        footerPosition: 'Below Static'
    }
}

const _footerThemeReducer = createReducer(initFooterTheme,
    on(footer, (state, response) => {
        
        console.log(response);
        return response;
    })
);

export function footerThemeReducer(state, action) {
    return _footerThemeReducer(state, action);
}
