import {Component} from 'angular2/core';
import {HeaderNavComponent} from './navigation/header-nav.component'

@Component({
    selector: 'todo',
    template: `<header></header>`,
    directives: [
        HeaderNavComponent,
    ],
})

export class AppComponent { }
