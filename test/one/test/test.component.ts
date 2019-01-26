;
    import { Component,OnInit } from '@angular/core';
    import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
    import { TestModel } from '../models/test.model';
    @Component({
      selector: 'app-test',
      templateUrl: './test.component.html',
      styleUrls: ['./test.component.scss']
    })
    export class TestComponent implements OnInit {
    Form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.Form = this.fb.group(new TestModel);
    }
}