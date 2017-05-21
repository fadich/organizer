import { Injectable } from 'angular2/core';
import { TodoItem } from '../entities/todo-item';

@Injectable()

export class TodoItemService {
    public static filter:number = 0;

    protected items:TodoItem[] = [];

    public getItems():TodoItem[] {
        if (!this.items.length) {
            let items = TodoItemService.requestItems();
            for (let item of items) {
                this.items.push(
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

        return this.items;
    }

    protected static requestItems():object[] {
        return [
            {
                id: 1,
                title: "Some item",
                content: "Item content........",
                status: 2,
                userId: 0,
                createdAt: 666,
                updatedAt: 777,
            },
            {
                id: 2,
                title: "Second item Second item Second item Second item",
                content: "Item contentItem contentItem contentItem contentItem contentItem content" +
                          "Item contentItem contentItem contentItem contentItem contentItem content" +
                          "Item contentItem contentItem contentItem contentItem contentItem content",
                status: 4,
                userId: 0,
                createdAt: 123456,
                updatedAt: 1234567,
            },
            {
                id: 5,
                title: "Fifth item Fifth item Fifth item Fifth item Fifth item Fifth item",
                content: null,
                status: 4,
                userId: 0,
                createdAt: 0,
                updatedAt: 99999999,
            },
            {
                id: 10,
                title: "Tenth item",
                content: "Tenth item content.",
                status: 3,
                userId: 0,
                createdAt: 1111111666,
                updatedAt: 2222222777,
            },
        ];
    }
}