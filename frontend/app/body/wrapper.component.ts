import { Component } from 'angular2/core';
import { MainComponent } from './main.component';

@Component({
    selector: 'wrapper',
    templateUrl: 'src/templates/body/wrapper.html',
    directives: [
        MainComponent,
    ],
})

export class WrapperComponent { }
