import {Component, Input} from 'angular2/core';
import {TodoItem} from '../../entities/todo-item';
import { ActionsComponent } from './actions.component';

@Component({
    selector: '.r-item',
    templateUrl: 'src/templates/body/items/todo-item.html',
    directives: [
        ActionsComponent,
    ]
})

export class TodoItemComponent {
    @Input() item:TodoItem;
    public static fullViewedItem:number = 0;

    public fullViewItem(itemId:number):TodoItemComponent {
        TodoItemComponent.fullViewedItem = TodoItemComponent.fullViewedItem == itemId ? 0 : itemId;
        return this;
    }

    public isFullView(itemId:number):boolean {
        return TodoItemComponent.fullViewedItem == itemId;
    }
}
