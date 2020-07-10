declare const print: {
    log(info: string, clear?: boolean | undefined): void;
    warn(info: string, clear?: boolean | undefined): void;
    error(info: string, clear?: boolean | undefined): void;
    success(info: string, clear?: boolean | undefined): void;
    tip(info: string, clear?: boolean | undefined): void;
    red(info: string, clear?: boolean | undefined): void;
    green(info: string, clear?: boolean | undefined): void;
    white(info: string, clear?: boolean | undefined): void;
    yellow(info: string, clear?: boolean | undefined): void;
    clear(): void;
};
export default print;
