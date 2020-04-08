export class ConstParams {
    public static get ErrorMsg(): string {
        return 'this is the error message.';
    }

    public static get WarnningMsg(): string {
        return 'this is the warnning message.';
    }

    public get MaxCacheTime(): number {
        return 30000;
    }
}
