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

    public static fullViewedItem:number = 0;
    public todoItemService:TodoItemService;

    public constructor () {
        this.todoItemService = new TodoItemService();
    }

    public isStatusHidden(status:number):boolean {
        if (status != 1 && (status == TodoItemService.filter || TodoItemService.filter == 0)) {
            return false;
        }

        return status != TodoItemService.filter;
    }

    public fullViewItem(itemId:number):GroupListComponent {
        GroupListComponent.fullViewedItem = GroupListComponent.fullViewedItem == itemId ? 0 : itemId;
        return this;
    }

    public isFullView(itemId:number):boolean {
        return GroupListComponent.fullViewedItem == itemId;
    }
}
