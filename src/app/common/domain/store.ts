import { MenuTab } from './tab';
import { ThemeNavbar, ThemeToolbar, ThemeFooter, ThemeBasicStore } from './theme';

export interface StoreState {
    tab?: MenuTab, 
    color?: string,
    layout?: string,
    width?: string,
    navbar?: ThemeNavbar,
    toolbar?: ThemeToolbar,
    footer?: ThemeFooter,
    themeData?: ThemeBasicStore
}
