import {Component, Input} from 'angular2/core';
import {TodoItem} from '../../entities/todo-item';
import { ActionsComponent } from './actions.component';
import { GroupListComponent } from './group-list.component';

@Component({
    selector: '.r-item',
    templateUrl: 'src/templates/body/items/todo-item.html',
    directives: [
        ActionsComponent,
    ]
})

export class TodoItemComponent {
    @Input() item:TodoItem;

    public isFullView(itemId:number):boolean {
        return GroupListComponent.fullViewedItem[itemId] == itemId;
    }

    public fullViewItem(itemId:number):TodoItemComponent {
        GroupListComponent.fullViewedItem[itemId] = itemId;
        return this;
    }

    public defaultViewItem(itemId:number):TodoItemComponent {
        GroupListComponent.fullViewedItem[itemId] = null;
        return this;
    }
}
