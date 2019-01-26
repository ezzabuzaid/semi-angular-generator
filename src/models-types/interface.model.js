const { letterAtOneToUpperCase, writeFile } = require('../utils/utils');
const { angularImports, modelName, formModelImport } = require('../utils/imports');

// Unuesd
const createTypedClass = (fields) => {
    
    
    return fields.reduce((acc, field) => {
    
        if (typeof field === 'string') field = 'string';
    
        else if (typeof field === 'number') field = 'number'
    
        else if (Array.isArray(field)) {
    
            if (typeof field[0] === 'string') field = 'Array<string>';
    
            else if (typeof field[0] === 'number') field = 'Array<number>'
    
        }
    
        return acc += `${field};\n`;
    
    }, '');
};

function createInterface(componentName, classBody, method, path) {

    const content = `export interface ${modelName(letterAtOneToUpperCase(componentName))} { ${createTypedClass(classBody)} }`;
    
    path = `${process.cwd()}/${path}/models/${componentName}.model.ts`;
    
    writeFile(path, content, () => {
        console.log('model class is ready')
    
    });
}
module.exports = { createInterface };