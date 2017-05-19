import {Component, Input} from 'angular2/core';
import {TodoItem} from "../../entities/todo-item";

@Component({
    selector: 'item-actions',
    templateUrl: 'src/templates/body/items/actions.html',
})

export class ActionsComponent {
    @Input() item:TodoItem;
}
