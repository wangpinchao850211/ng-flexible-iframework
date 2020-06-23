import { createReducer, on } from '@ngrx/store';
import { footer } from '../action/theme.action';
import { ThemeFooter, footerEntity } from '../common/domain/theme';

export interface State {
    footer:  ThemeFooter,
    falg: number,
    falgKey: string
};

export const initFooterTheme: State = {
    footer: footerEntity,
    falg: 0,
    falgKey: ''
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
