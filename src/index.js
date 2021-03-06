#!/usr/bin/env node

const opn = require('opn');
const program = require('commander');
const { initServer } = require('./app');

function openBrowser(host) {
    return opn(`http://${host}`);
}
// commander used instead
function parseArgs() {
    const [, , ...argv] = process.argv;
    const argsAsObject = {};
    for (let index = 0; index < argv.length; index++) {
        const value = argv[index];
        argsAsObject[value] = argv[++index]
    }
    return argsAsObject;
}

// commander used instead
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

async function start(path) {
    try {
        const server = await initServer(path);
        await openBrowser(`${server.host}:${server.port}`);
    } catch (error) {
        console.error(error);
    }
};

program
    .option('-p, --path <required>', 'The folder path where the file will be generated')
    .action(({ path }) => {
        start(path);
    })
    .parse(process.argv);
