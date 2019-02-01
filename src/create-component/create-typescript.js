const { letterAtOneToUpperCase, pipe, toCamelCase, } = require('../utils/utils');
const { angularImports, modelName, formModelImport, classHeader } = require('../utils/imports');

function createComponentLogic({ name }) {

  const className = pipe(
    toCamelCase,
    letterAtOneToUpperCase
  )(name);

  const modelConstructor = modelName(className);
  const model = formModelImport(modelConstructor, `${name}.model`);

  const content = `
    ${angularImports('core', 'Component', 'OnInit')}
    ${angularImports('forms', 'FormBuilder', 'FormControl', 'FormGroup')}
    ${model}
    @Component({
      selector: 'app-${name}',
      templateUrl: './${name}.component.html',
      styleUrls: ['./${name}.component.scss']
    })
    ${classHeader((className + 'Component'), 'OnInit')} {
    Form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.Form = this.fb.group(new ${modelConstructor});
    }
}`;

  return content;

}


module.exports = {
  createComponentLogic
}
