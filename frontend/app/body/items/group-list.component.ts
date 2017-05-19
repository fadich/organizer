import { Component } from 'angular2/core';
import { TodoItemService } from './todo-item.service';

@Component({
    selector: '[id=main]',
    templateUrl: 'src/templates/body/items/list-group-items.html',
    providers: [
        TodoItemService
    ],
})

export class GroupListComponent {

    public constructor (
        public todoItemService:TodoItemService
    ) {  }
}
