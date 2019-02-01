#!/usr/bin/env node

const opn = require('opn');
const { initExpress } = require('./app');

function openBrowser(host) {
    return opn(`http://${host}`);
}

function parseArgs() {
    const [, , ...argv] = process.argv;
    const argsAsObject = {};
    for (let index = 0; index < argv.length; index++) {
        const value = argv[index];
        argsAsObject[value] = argv[++index]
    }
    return argsAsObject;
}

function utilizeArgs() {
    const input = arguments[0];
    const requiredKeys = ['path'];
    const inputKeys = Object.keys(input);
    console.log(inputKeys);
    requiredKeys.forEach((key) => {
        console.log(input[key]);
        if (inputKeys.indexOf(key) === -1) {
            throw new Error(`please use ${key} parm, e.g ozer port="8080" ...\n`);
        };
    });
    return input;
}

(async function start() {
    try {
        const args = utilizeArgs(parseArgs());
        const server = await initExpress(args.path);
        await openBrowser(`${server.host}:${server.port}`);
    } catch (error) {
        console.error(error);
    }
}());

// var gulp = require('gulp');
// require('./gulpfile');

// if (gulp.tasks.test) { 
//     console.log('gulpfile contains task!');
//     gulp.start('test');
// }