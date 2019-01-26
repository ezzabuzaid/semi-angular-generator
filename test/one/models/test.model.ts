
    import { Validators } from '@angular/forms';
    export class TestModel 
    {
        name=[null,[]];
age=[null,[Validators.required,Validators.minLength]];
car=[null,[]];

    }