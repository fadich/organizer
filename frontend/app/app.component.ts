import { Component } from 'angular2/core';
import { HeaderNavComponent } from './navigation/header-nav.component'
import { WrapperComponent } from './body/wrapper.component'

@Component({
    selector: 'todo',
    template: `
        <header></header>
        <wrapper></wrapper>
    `,
    directives: [
        HeaderNavComponent,
        WrapperComponent,
    ],
})

export class AppComponent { }
