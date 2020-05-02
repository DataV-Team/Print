"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var print = {
    log: function (info) {
        console.log(info);
    },
    warn: function (info) {
        console.log('\x1b[31;33m' + info + '\x1b[0m');
    },
    error: function (info) {
        console.log('\x1b[31;40m' + info + '\x1b[0m');
    },
    tip: function (info) {
        console.log('\x1b[40;32m' + info + '\x1b[0m');
    },
    success: function (info) {
        console.log('\x1b[42;30m' + info + '\x1b[0m');
    },
    yellow: function (info) {
        console.log('\x1b[31;33m' + info + '\x1b[0m');
    },
};
exports.default = print;
