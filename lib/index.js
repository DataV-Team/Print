"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var print = {
    log: function (info, clear) {
        if (clear)
            print.clear();
        console.log(info);
    },
    warn: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[31;33m' + info + '\x1b[0m');
    },
    error: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[31;40m' + info + '\x1b[0m');
    },
    success: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[42;30m' + info + '\x1b[0m');
    },
    tip: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[40;32m' + info + '\x1b[0m');
    },
    red: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[31m' + info + '\x1b[39m');
    },
    green: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[32m' + info + '\x1b[39m');
    },
    white: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[37m' + info + '\x1b[39m');
    },
    yellow: function (info, clear) {
        if (clear)
            print.clear();
        console.log('\x1b[31;33m' + info + '\x1b[0m');
    },
    clear: function () {
        process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
    },
};
exports.default = print;
