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
    public static ITEMS_URL = 'http://org.loc/royal/todo/item/';

    public static items:Array<TodoItem> = [];
    protected static temp:Array<any> = [];
    protected static ajaxAllowed:boolean = true;

    constructor (protected http:Http) {
        this.preloder = new PreloaderComponent();
    }

    public getItems():Array<any> {
        if (!TodoItemService.items.length) {
            this.requestItems();
            for (let i = TodoItemService.temp.length - 1; i >= 0; i--) {
                let item = TodoItemService.temp[i];

                TodoItemService.items.push(
                    new TodoItem(
                        item['id'],
                        item['title'],
                        item['content'],
                        item['status'],
                        item['userId'],
                        item['createdAt'],
                        item['updatedAt']
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
        this.http.get(TodoItemService.ITEMS_URL)
            .map(res => res.json())
            .subscribe(
                success => (function (success, preloder) {
                    TodoItemService.temp = success.items;
                    ConfigService.get('0').token = success.token;

                    TodoItemService.ajaxAllowed = true;
                    preloder.hide();
                })(success, this.preloder),
                error => (function (error, preloder) {
                    alert("Error: \"" + (error.message || "unknown error") + "\" with code: " + error.status);
                    preloder.hide();
                })(error, this.preloder),
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