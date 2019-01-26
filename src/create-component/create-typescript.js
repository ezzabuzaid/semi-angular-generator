const { letterAtOneToUpperCase, writeFile, pathToFolder } = require('../utils/utils');
const { angularImports, modelName, formModelImport, classHeader } = require('../utils/imports');

function createComponentLogic({ componentName, method }) {
  const modelConstructor = modelName(letterAtOneToUpperCase(componentName));
  const model = formModelImport(modelConstructor, `${componentName}.model`);

  const content = `;
    ${angularImports('core', 'Component', 'OnInit')}
    ${angularImports('forms', 'FormBuilder', 'FormControl', 'FormGroup')}
    ${model}
    @Component({
      selector: 'app-${componentName}',
      templateUrl: './${componentName}.component.html',
      styleUrls: ['./${componentName}.component.scss']
    })
    ${classHeader((letterAtOneToUpperCase(componentName) + 'Component'), 'OnInit')} {
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
