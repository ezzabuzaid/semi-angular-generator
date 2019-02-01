const { wrap, formWrapper } = require('./style-wrappers');
const { letterAtOneToUpperCase, writeFile, pathToFolder } = require('../utils/utils');
const { angularImports, modelName, formModelImport, classHeader } = require('../utils/imports');

function createComponentTemplate({ fields }) {
  return wrap(initFormField(fields));
}

function initFormField(fieldList) {
  return fieldList.reduce((acc, curr) => acc += checkFieldType(curr), ``);
}

function checkFieldType(field) {

  let fieldWrapper = html => `<div class="col-12">${html}</div>`;
  let matFieldWrapper = html => `<mat-form-field appearance=${field.appearance}>${html}</mat-form-field>`;
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

function CONTROL_SELECT({ type, name, placeholder }) {

  let multiple = type === 'multiple' ? 'multiple' : '';

  return `<mat-select ${multiple} formControlName="${name}" placeholder="${placeholder}">
            <mat-option *ngFor="let option of options" [value]="option">{{ option }}</mat-option>
          </mat-select>`
};

function CONTROL_TEXT({  name, placeholder }) {
  return `<input matInput type="text" formControlName="${name}" placeholder="${placeholder}" />`
};

function CONTROL_RADIO({  name, placeholder }) {
  return `<mat-label>${placeholder}</mat-label>
            <mat-radio-group formControlName="${name}">
            <mat-radio-button *ngFor="let box of boxes">{{ box }}</mat-radio-button>
          </mat-radio-group>`
};

function CONTROL_CHECKBOX({ name, placeholder }) {
  return `<mat-checkbox  formControlName="${name}">${control.placeholder}</mat-checkbox>`
};

module.exports = {
  createComponentTemplate
}
