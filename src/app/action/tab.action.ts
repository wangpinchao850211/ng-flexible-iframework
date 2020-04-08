import { createAction, props } from '@ngrx/store';
import { MenuTab } from '../common/domain/tab';

export const addTab = createAction('[Add] Tab', (response: MenuTab) =>response);
export const removeTab = createAction('[Remove] Tab', (response: MenuTab) => response);
