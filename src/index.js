#!/usr/bin/env node

const opn = require('opn');
const { initExpress } = require('./app');
const http = require('http');
// user port finder if port not passed
function createWebServer(app, port) {
    return new Promise((resolve) => {
        const host = 'localhost';
        const server = http.createServer(app)
            .listen(port, () => {
                console.log(`Server running on http://${host}:${[port]}`)
                resolve({ port, host })
            });
    })
}

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
    const requiredKeys = ['port', 'name', 'path'];
    const inputKeys = Object.keys(input);
    requiredKeys.forEach((key) => {
        if (inputKeys.indexOf(key) === -1) {
            throw new Error(`please use ${key} parm, e.g ozer name="Name" ...\n`);
        };
    });
    return input;
}

(async function start() {
    try {
        const args = utilizeArgs(parseArgs());
        const app = initExpress(args.name, args.path);
        const server = await createWebServer(app, args.port);
        await openBrowser(`${server.host}:${server.port}`);
    } catch (error) {
        console.error(error);
    }
}());

// https://www.npmjs.com/package/wigwam
// https://www.npmjs.com/package/sirloin

// NOTE use websocket

// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);
// var fs = require('fs');

// app.listen(80);

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }