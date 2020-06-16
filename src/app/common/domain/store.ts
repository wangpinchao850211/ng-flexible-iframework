import { MenuTab } from './tab';
import { ThemeNavbar, ThemeToolbar, ThemeFooter } from './theme';

export interface StoreState {
    tab?: MenuTab, 
    color?: string,
    layout?: string,
    width?: string,
    navbar?: ThemeNavbar,
    toolbar?: ThemeToolbar,
    footer?: ThemeFooter
}
