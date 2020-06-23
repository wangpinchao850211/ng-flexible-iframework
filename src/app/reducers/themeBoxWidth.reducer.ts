import { createReducer, on } from '@ngrx/store';
import { layoutWidth } from '../action/theme.action';
import { themeWidthEntity } from '../common/domain/theme';

export interface State {
    boxWidth: string;
}

export const initThemeWidth: State = {
    boxWidth: themeWidthEntity
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
