
const path = require('path');
const http = require('http');
const static = require('node-static');
const portfinder = require('portfinder');
const WebSocket = require('ws');

const { writeFile, pathToFolder } = require('./utils/utils');
const { createFormBuilderModel } = require('./models-types/class.model')
const { createComponentLogic } = require('./create-component/create-typescript')
const { createComponentTemplate } = require('./create-component/create-template');

function createComponent(fields, { name, path }) {


    const write = (option) => {
        writeFile(option, () => { });
    }

    const settings = { fields, name };

    write({
        fileName: `${settings.name}.model.ts`,
        folderPath: pathToFolder(path, 'models'),
        content: createFormBuilderModel(settings)
    });

    write({
        fileName: `${settings.name}.component.ts`,
        folderPath: pathToFolder(path, settings.name),
        content: createComponentLogic(settings)
    });

    write({
        fileName: `${settings.name}.component.html`,
        folderPath: pathToFolder(path, settings.name),
        content: createComponentTemplate(settings)
    });

    write({
        fileName: `${settings.name}.component.scss`,
        folderPath: pathToFolder(path, settings.name),
        content: ''
    });

}

exports.initServer = (folderPath) => {
    const public = path.join(__dirname, '..', 'public');

    function handler(request, response) {
        const file = new static.Server(public);

        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();

    }

    const server = http.createServer(handler);

    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        ws.on('message', function (model) {
            const { fields, name } = JSON.parse(model);
            createComponent(fields, { name, path: folderPath });
            ws.send('Component created');
        });;
    });

    // const io = socketIo(server);
    // io.on('connection', function (socket) {
    //     socket.on('form', function ({ fields, name }) {
    //         createComponent(fields, { name, path: folderPath });
    //         socket.emit('form', 'Component created');
    //     });
    // });

    listen = (port) => {
        return new Promise(resolve => {
            server.listen(port, () => {
                console.log(`Server running on http://${host}:${port}`);
                resolve(port);
            });
        })
    }

    const host = 'localhost';
    return portfinder.getPortPromise({ host })
        .then(listen)
        .then((port) => ({ port, host }));
}

process.chdir(path.join(process.cwd(), 'src', 'app'));