const { letterAtOneToUpperCase } = require('../utils/utils');
const { angularImports, modelName, formModelImport, classHeader } = require('../utils/imports');
const { createValidation } = require('.././utils/validations');

const createFormBuilderClass = (fields) => {

    return fields.reduce((acc, field) => {

        const validators = createValidation(field.validators);

        const formattedField = JSON.stringify([null, validators])
            .replace(/"/g, '')
            .replace(/\\/g, "'");

        return acc += `${field.name}=${formattedField};\n`;

    }, '');
}

function createFormBuilderModel({ componentName, fields }) {

    const content = `
    ${angularImports('forms', 'Validators')}
    ${classHeader(modelName(letterAtOneToUpperCase(componentName)))}
    {
        ${createFormBuilderClass(fields)}
    }`;

    return content;
}

module.exports = { createFormBuilderModel };
