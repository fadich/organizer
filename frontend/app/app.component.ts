import { Component } from 'angular2/core';
import { HeaderNavComponent } from './navigation/header-nav.component'
import { MainComponent } from './body/main.component'
import { TodoItemService } from './services/todo-item.service'

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

export class AppComponent {  }
