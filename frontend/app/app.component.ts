import { Component } from 'angular2/core';
import { HeaderNavComponent } from './navigation/header-nav.component'
import { MainComponent } from './body/main.component'

@Component({
    selector: 'todo',
    template: `
        <header></header>
        <main></main>
    `,
    directives: [
        HeaderNavComponent,
        MainComponent,
    ],
})

export class AppComponent { }
