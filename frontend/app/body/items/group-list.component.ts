import {Component} from 'angular2/core';
import {TodoItemService} from '../../services/todo-item.service';
import {TodoItemComponent} from './todo-item.component';
import {ItemFormComponent} from './item-form.component';

@Component({
    selector: '[id=main]',
    templateUrl: 'src/templates/body/items/list-group-items.html',
    providers: [
        TodoItemService,
    ],
    directives: [
        TodoItemComponent,
        ItemFormComponent,
    ]
})

export class GroupListComponent {

    public constructor (
        public todoItemService:TodoItemService
    ) {  }

    public isStatusHidden(status:number):boolean {
        if (status != 1 && (status == TodoItemService.filter || TodoItemService.filter == 0)) {
            return false;
        }

        return status != TodoItemService.filter;
    }

    public isHiddenForm():boolean {
        let hidden = false;
        if (TodoItemService.filter === 2 || TodoItemService.filter === 3) {
            hidden = true;
        }

        return hidden;
    }
}
