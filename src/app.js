const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { writeFile, pathToFolder, objectToArray } = require('./utils/utils');
const { createFormBuilderModel } = require('./models-types/class.model')
const { createComponentLogic } = require('./create-component/create-typescript')
const { createComponentTemplate } = require('./create-component/create-template');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

function createComponent({ body }, res, next, options) {
    const write = (option) => {
        writeFile(option, () => { });
    }

    const settings = { fields: objectToArray(body), componentName: options.name };

    write({
        fileName: `${options.name}.model.ts`,
        folderPath: pathToFolder(options.folderPath, 'models'),
        content: createFormBuilderModel(settings)
    });

    write({
        fileName: `${options.name}.component.ts`,
        folderPath: pathToFolder(options.folderPath, options.name),
        content: createComponentLogic(settings)
    });

    write({
        fileName: `${options.name}.component.html`,
        folderPath: pathToFolder(options.folderPath, options.name),
        content: createComponentTemplate(settings)
    });

    res.status(201).json({ created: true });
}

exports.initExpress = (name, folderPath) => {
    app.post('/form', function () {
        createComponent(...arguments, { name, folderPath })
    });

    const public = path.join(__dirname, '..', 'public');

    app.get('/', function (req, res) {
        res.sendFile(public);
    });

    app.use('/', express.static(public));

    return app;
}