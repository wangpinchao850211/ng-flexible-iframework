import { createReducer, on } from '@ngrx/store';
import { layoutStyle } from '../action/theme.action';
import { themelayoutEntity } from '../common/domain/theme';

export interface State {
    layout: string;
    falg: number
}

export const initThemeLayout: State = {
    layout: themelayoutEntity,
    falg: 0
}

const _themeStyleReducer = createReducer(initThemeLayout,
    on(layoutStyle, (state, response) => {
        // console.log(response);
        // const res = { 
        //     ...response, 
        //     falg: response.falg=== 0 ?
        //           response.falg++ : 
        //           response.falg
        // };
        // console.log(res);
        
        return response;
    })
);

export function themeStyleReducer(state, action) {
    return _themeStyleReducer(state, action);
}
