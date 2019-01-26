const { wrap, formWrapper } = require('./style-wrappers');
const { letterAtOneToUpperCase, writeFile, pathToFolder } = require('../utils/utils');
const { angularImports, modelName, formModelImport, classHeader } = require('../utils/imports');

function createComponentTemplate({ fields }) {
  return wrap(initFormField(fields));
}

function initFormField(fieldList) {
  return orderTheFieldDependOnTheirIndex(fieldList)
    .reduce((acc, curr) => {
      return acc += checkFieldType(curr);
    }, ``);
}

function orderTheFieldDependOnTheirIndex(curr) {

  const list = Object.values(curr);

  return list.sort((a, b) => a.index - b.index);

}

function checkFieldType(field) {

  let fieldWrapper = html => `<div class="col-12">${html}</div>`;
  let matFieldWrapper = html => `<mat-form-field>${html}<mat-form-field>`;
  // change the switch statement to 
  // {
  //   [wrapper](field){}
  // }
  switch (field.type) {
    case 'input':
      return fieldWrapper(matFieldWrapper(CONTROL_TEXT(field)));
    case 'select' || 'multiple':
      return fieldWrapper(matFieldWrapper(CONTROL_SELECT(field)));
    case 'radio':
      return fieldWrapper(CONTROL_RADIO(field));
    case 'checkbox':
      return fieldWrapper(CONTROL_CHECKBOX(field));
  }
}

function CONTROL_SELECT({ type, controlName, placeholder }) {

  let multiple = type === 'multiple' ? 'multiple' : '';

  return `<mat-select ${multiple} formControlName="${controlName}" placeholder="${placeholder}">
            <mat-option *ngFor="let option of options" [value]="option">{{ option }}</mat-option>
          </mat-select>`
};

function CONTROL_TEXT({ type, controlName, placeholder }) {
  return `<input matInput type="text" formControlName="${controlName}" placeholder="${placeholder}" />`
};

function CONTROL_RADIO({ type, controlName, placeholder }) {
  return `<mat-label>${placeholder}</mat-label>
            <mat-radio-group formControlName="${controlName}">
            <mat-radio-button *ngFor="let box of boxes">{{ box }}</mat-radio-button>
          </mat-radio-group>`
};

function CONTROL_CHECKBOX({ type, controlName, placeholder }) {
  return `<mat-checkbox  formControlName="${controlName}">{{ control.placeholder }}</mat-checkbox>`
};

module.exports = {
  createComponentTemplate
}
