import {Component} from 'angular2/core';
import {TodoItemService} from '../../services/todo-item.service';
import {TodoItemComponent} from './todo-item.component';

@Component({
    selector: '[id=main]',
    templateUrl: 'src/templates/body/items/list-group-items.html',
    providers: [
        TodoItemService,
    ],
    directives: [
        TodoItemComponent,
    ]
})

export class GroupListComponent {

    public constructor (
        public todoItemService:TodoItemService
    ) {  }
}
