export interface MenuTab {
    id?: string;
    url: string;
    name: string;
    isSelect?: boolean;
    skipLocationChange?: boolean;
    data?: any;
}

export enum MenuToTabMapping {
    RouterNavigation = '/flowlayout/routerNaigation',
    Markdown = '/flowlayout/markdown',
    Rxjs = '/flowlayout/rxjs',
    PrimeNGUI = '/flowlayout/primeng-ui',
    Questionnaire = '/flowlayout/questionnaire',
    pipe = '/flowlayout/pipe',
    books = '/TeLayout/books',
}
