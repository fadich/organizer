import { Component } from 'angular2/core';
import { TodoItemService } from './todo-item.service';
import { ActionsComponent } from './actions.component';

@Component({
    selector: '[id=main]',
    templateUrl: 'src/templates/body/items/list-group-items.html',
    providers: [
        TodoItemService,
    ],
    directives: [
        ActionsComponent,
    ]
})

export class GroupListComponent {

    public constructor (
        public todoItemService:TodoItemService
    ) {  }
}
