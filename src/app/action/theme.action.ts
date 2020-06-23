import { createAction, props } from '@ngrx/store';
import { ThemeNavbar, ThemeToolbar, ThemeFooter, ThemeBasicStore } from '../common/domain/theme';

export const themeColor = createAction('[Theme] Color', (response: {color: string}) =>response);

export const layoutStyle = createAction('[Theme] layoutStyle', (response: {layout: string, falg: number}) =>response);

export const layoutWidth = createAction('[Theme] layoutWidth', (response: {boxWidth: string}) =>response);

// navbar, toolbar, footer 加一个初始化标识
export const navbar = createAction('[Theme] navbar', (response: {navbar: ThemeNavbar, falg: number, falgKey: string}) =>response);

export const toolbar = createAction('[Theme] toolbar', (response: {toolbar: ThemeToolbar, falg: number, falgKey: string}) =>response);

export const footer = createAction('[Theme] footer', (response: {footer: ThemeFooter, falg: number, falgKey: string}) =>response);

export const basicThemeStore = createAction('[Theme] basicThemeStore', (response: { themeData: ThemeBasicStore}) => response);
