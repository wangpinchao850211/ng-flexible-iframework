export interface ThemeNavbar {
    Nbackground: string,
    folded: boolean,
    Nhidden: boolean,
    navbarPosition: string
}

export interface ThemeToolbar {
    Tbackground: string,
    TcustomBackgroundColor: boolean,
    Thidden: boolean,
    toolbarPosition: string
}

export interface ThemeFooter {
    Fbackground: string,
    FcustomBackgroundColor: boolean,
    Fhidden: boolean,
    footerPosition: string
}

interface layoutTheme {
    style: string,
    width: string,
    navbar: ThemeNavbar,
    toolbar: ThemeToolbar,
    footer: ThemeFooter
}

export interface ThemeBasicStore {
    colorTheme: string,
    layout: layoutTheme
}

export const themeColorEntity = 'Blue-Gray Dark';
export const themelayoutEntity = 'Vertical Layout #1';
export const themeWidthEntity = 'Fullwidth';

export const navEntity = {
    Nbackground: '#030c2799',
    folded: false,
    Nhidden: false,
    navbarPosition: 'Left'
}

export const toolbarEntity = {
    Tbackground: '#030c2799',
    TcustomBackgroundColor: false, // prime check formControl绑定还得看
    Thidden: false,
    toolbarPosition: 'Below Fixed'
}

export const footerEntity = {
    Fbackground: '#030c2799',
    FcustomBackgroundColor: false,
    Fhidden: false,
    footerPosition: 'Below Fixed'
}
