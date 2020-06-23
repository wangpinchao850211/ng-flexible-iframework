import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as tabMenu from './tab.reducer';
import * as themeBasicData from './basicThemeStore.reducer';
import * as themeColor from './themeColor.reducer';
import * as themeStyle from './themeLayout.reducer';
import * as themeWidth from './themeBoxWidth.reducer';
import * as navbarTheme from './navbarTheme.reducer';
import * as toolbarTheme from './toolbarTheme.reducer';
import * as footerTheme from './footerTheme.reducer';

export interface State {
  tab: tabMenu.State,
  themeData: themeBasicData.State,
  color: themeColor.State,
  layout: themeStyle.State,
  width: themeWidth.State,
  navbar: navbarTheme.State,
  toolbar: toolbarTheme.State,
  footer: footerTheme.State
}

export const initState = {
  tab: tabMenu.initTabListState,
  themeData: themeBasicData.initThemeBasicData,
  color: themeColor.initThemeColor,
  layout: themeStyle.initThemeLayout,
  width: themeWidth.initThemeWidth,
  navbar: navbarTheme.initNavbarTheme,
  toolbar: toolbarTheme.initToolbarTheme,
  footer: footerTheme.initFooterTheme
};

export const reducers: ActionReducerMap<State> = {
  tab: tabMenu.tabReducer,
  themeData: themeBasicData.themeBasicDataReducer,
  color: themeColor.themeColorReducer,
  layout: themeStyle.themeStyleReducer,
  width: themeWidth.themeWidthReducer,
  navbar: navbarTheme.navbarThemeReducer,
  toolbar: toolbarTheme.toolbarThemeReducer,
  footer: footerTheme.footerThemeReducer
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
