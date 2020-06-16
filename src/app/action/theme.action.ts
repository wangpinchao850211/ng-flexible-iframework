import { createAction, props } from '@ngrx/store';
import { ThemeNavbar, ThemeToolbar, ThemeFooter } from '../common/domain/theme';

export const themeColor = createAction('[Theme] Color', (response: {color: string}) =>response);

export const layoutStyle = createAction('[Theme] layoutStyle', (response: {layout: string}) =>response);

export const layoutWidth = createAction('[Theme] layoutWidth', (response: {boxWidth: string}) =>response);

export const navbar = createAction('[Theme] navbar', (response: {navbar: ThemeNavbar}) =>response);

export const toolbar = createAction('[Theme] toolbar', (response: {toolbar: ThemeToolbar}) =>response);

export const footer = createAction('[Theme] footer', (response: {footer: ThemeFooter}) =>response);
