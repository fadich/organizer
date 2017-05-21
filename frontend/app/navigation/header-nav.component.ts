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

    constructor () {
        this.moreApps = new MoreAppsService();
    }

    public static activeFilter(status:number):string {
        return TodoItemService.filter == status ? 'active' : '';
    }
}