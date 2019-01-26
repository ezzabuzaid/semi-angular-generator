const angularImports = (from, ...imports) => `import { ${[...imports]} } from '@angular/${from}';`;

const modelName = (name) => `${name}Model`;
// from not used here
const formModelImport = (model, from) => `import { ${model} } from '../models/${from}';`;

const classHeader = (name, ...interfaces) => {
  const implements = interfaces.length ? `implements ${[...interfaces]}` : '';
  return `export class ${name} ` + implements;
};

module.exports = {
  angularImports,
  modelName,
  formModelImport,
  classHeader
}
