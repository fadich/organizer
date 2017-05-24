import { Component } from 'angular2/core';
import { MoreAppsService } from '../services/more-apps.service';
import { TodoItemService } from '../services/todo-item.service';
import {GroupListComponent} from "../body/items/group-list.component";

@Component({
    selector: 'header',
    templateUrl: 'src/templates/navigation/header-nav.html',
    providers: [
        MoreAppsService,
        TodoItemService
    ]
})

export class HeaderNavComponent {
    protected columnsCounter:Array<number, number> = [];

    constructor (
        public moreApps:MoreAppsService,
        public todoItem:TodoItemService
    ) {
        TodoItemService.initFilter();
    }

    public activeFilter(status:number):string {
        return TodoItemService.filter == status ? 'active' : '';
    }

    public countItems(statuses:number[]):number {
        let count:number = 0;

        for (let status of statuses) {
            if (!(status in this.columnsCounter) || !this.columnsCounter[status]) {
                this.columnsCounter[status] = this._countItems(status);
            }
            count += this.columnsCounter[status];
        }

        return count;
    }

    public setFilter(status:number) {
        if (status && !this.countItems([status])) {
            status = 0;
        }

        TodoItemService.setFilter(status);
        GroupListComponent.resetFullItemsView();
    }

    protected _countItems(status:number):number {
        let count:number = 0;
        let items = this.todoItem.getItems();

        for (let item of items) {
            if (item.status == status) {
                count++;
            }
        }

        return count;
    }
}
