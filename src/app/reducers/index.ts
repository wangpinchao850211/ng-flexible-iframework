import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as tabMenu from './tab.reducer';

export interface State {
  tab: tabMenu.State,
}

export const initState = {
  tab: tabMenu.initTabListState,
};

export const reducers: ActionReducerMap<State> = {
  tab: tabMenu.tabReducer,
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
