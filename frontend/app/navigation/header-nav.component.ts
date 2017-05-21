import { Component } from 'angular2/core';
import { MoreAppsService } from '../services/more-apps.service';
import { TodoItemService } from '../services/todo-item.service';

@Component({
    selector: 'header',
    templateUrl: 'src/templates/navigation/header-nav.html',
    providers: [
        MoreAppsService,
        TodoItemService
    ]
})

export class HeaderNavComponent {
    public moreApps:MoreAppsService;
    public todoItem:TodoItemService;

    constructor () {
        this.moreApps = new MoreAppsService();
        this.todoItem = new TodoItemService();
    }

    public activeFilter(status:number):string {
        return TodoItemService.filter == status ? 'active' : '';
    }

    public countItems(statuses:number[]):number {
        let count:number = 0;
        let items = this.todoItem.getItems();

        for (let item of items) {
            if (~statuses.indexOf(item.status)) {
                count++;
            }
        }

        return count;
    }

    public setFilter(status:number) {
        TodoItemService.filter = status;
    }
}
