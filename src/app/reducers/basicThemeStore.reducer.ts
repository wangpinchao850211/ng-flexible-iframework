import { createReducer, on } from '@ngrx/store';
import { basicThemeStore } from '../action/theme.action';
import { ThemeBasicStore, navEntity, toolbarEntity, footerEntity } from '../common/domain/theme';

export interface State {
    themeData: ThemeBasicStore
}

export const initThemeBasicData: State = {
    themeData: {
        colorTheme: 'Default Light', // #030c2799
        layout: {
            style: 'Vertical Layout #1',
            width: 'Fullwidth',
            navbar: navEntity,
            toolbar: toolbarEntity,
            footer: footerEntity
        }
    }
}

// 只负责初始化theme form
const _themeBasicDataReducer = createReducer(initThemeBasicData, 
    on(basicThemeStore, (state, response) => {
        console.log(response); 
        return response;
    })
)

export function themeBasicDataReducer(state, action) {
    return _themeBasicDataReducer(state, action);
}

