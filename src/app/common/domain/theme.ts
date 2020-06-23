export interface ThemeNavbar {
    Nbackground: string,
    folded: boolean,
    Nhidden: boolean,
    navbarPosition: string
}

export interface ThemeToolbar {
    Tbackground: string,
    TcustomBackgroundColor: string,
    Thidden: boolean,
    toolbarPosition: string
}

export interface ThemeFooter {
    Fbackground: string,
    FcustomBackgroundColor: string,
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

export const navEntity = {
    Nbackground: '#030c2799',
    folded: false,
    Nhidden: false,
    navbarPosition: 'Left'
}

export const toolbarEntity = {
    Tbackground: '#030c2799',
    TcustomBackgroundColor: 'Use custom background color',
    Thidden: false,
    toolbarPosition: 'Below Fixed'
}

export const footerEntity = {
    Fbackground: '#030c2799',
    FcustomBackgroundColor: 'Use custom background color',
    Fhidden: false,
    footerPosition: 'Below Fixed'
}
