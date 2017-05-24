import { Injectable } from 'angular2/core';
import { TodoItem } from '../entities/todo-item';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map'
import {ConfigService} from "./config.service";
import {PreloaderComponent} from "../body/preloader.component";

@Injectable()

export class TodoItemService {
    public preloder:PreloaderComponent;

    public static filter:number = 0;
    public static GET_ITEMS_URL = 'http://localhost/learn/organizer/web/royal/todo/item/';

    protected static items:TodoItem[] = [];
    protected static temp:object = [];
    protected static ajaxAllowed:boolean = true;

    constructor (protected http:Http) {
        this.preloder = new PreloaderComponent();
    }

    public getItems():TodoItem[] {
        if (!TodoItemService.items.length) {
            this.requestItems();
            for (let item of TodoItemService.temp) {
                TodoItemService.items.push(
                    new TodoItem(
                        item['id'],
                        item['title'],
                        item['content'],
                        item['status'],
                        item['userId'],
                        item['createdAt'],
                        item['updatedAt'],
                    )
                )
            }
        }

        return TodoItemService.items;
    }

    protected requestItems() {
        if (!TodoItemService.ajaxAllowed) {
            return;
        }

        this.preloder.show();
        TodoItemService.ajaxAllowed = false;
        this.http.get(TodoItemService.GET_ITEMS_URL)
            .map(res => res.json())
            .subscribe(
                success => (function (success) {
                    TodoItemService.temp = success.items;
                    ConfigService.get('0').token = success.token;

                    TodoItemService.ajaxAllowed = true;
                })(success),
                error => console.error("Error: \"" + (error.message || "unknown error") + "\""),
                () => this.preloder.hide()
            );
    }

    public static initFilter():void {
        let filter:number = +localStorage.getItem('status-filter');
        if (filter) {
            TodoItemService.filter = filter;
        }
    }

    public static setFilter(status:number):void {
        TodoItemService.filter = status;
        localStorage.setItem('status-filter', status.toString());
    }
}