import {Component, Input} from 'angular2/core';
import {Headers, Http, RequestOptions} from "angular2/http";
import {TodoItemService} from "../../services/todo-item.service";
import {ConfigService} from "../../services/config.service";
import {PreloaderComponent} from "../preloader.component";
import {TodoItem} from "../../entities/todo-item";

@Component({
    selector: '.r-item-form',
    templateUrl: 'src/templates/body/items/item-form.html',
})

export class ItemFormComponent {
    protected static ajaxAllowed:boolean = true;

    @Input() id:number = 0;
    @Input() title:string = '';
    @Input() content:string = '';
    @Input() status:number = 4;

    public preloder:PreloaderComponent;

    protected hidden = true;

    constructor (protected http:Http) {
        this.preloder = new PreloaderComponent();
    }

    public submitClick():void {
        if (this.isHidden()) {
            this.hidden = false;
            return;
        }

        if (this.id) {
            this.submitFormEdit();
        } else {
            this.submitFormCreate()
        }
    }

    public isHidden():boolean {
        return this.hidden;
    }

    public hideForm():void {
        this.hidden = true;
    }

    public isValid():boolean {
        if (this.title.length < 3) {
            return false;
        }
        if (this.content.length < 3) {
            return false;
        }

        // TODO: add validation.
        return true;
    }

    protected submitFormEdit():void {
        // TODO: AJAX-submit.
    }

    protected submitFormCreate():void {
        let url:string = TodoItemService.ITEMS_URL + "new";
        let body:string = this.getFormBody();
        let headers:Headers = new Headers();

        headers.append("Accept", '*/*');
        headers.append("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');

        let options:RequestOptions = new RequestOptions({ headers: headers });


        ItemFormComponent.ajaxAllowed = false;
        this.preloder.show();

        console.log(body, ConfigService.get('0').token);
        this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe(
                success => (function (success, preloder) {

                    let item = success.item;

                    TodoItemService.items.unshift(new TodoItem(
                        item['id'],
                        item['title'],
                        item['content'],
                        item['status'],
                        item['userId'],
                        item['createdAt'],
                        item['updatedAt']
                    ));
                    TodoItemService.initFilter();

                    ItemFormComponent.ajaxAllowed = true;
                    preloder.hide();
                })(success, this.preloder),
                error => (function (error, preloder) {
                    alert("Error: \"" + (error.message || "unknown error") + "\" with code: " + error.status);
                    preloder.hide();
                })(error, this.preloder),
                () => this.preloder.hide()
            );
    }

    protected getFormBody():string {
        let body = new URLSearchParams();

        if (this.id) {
            body.set("royal_todobundle_item[id]", this.id.toString());
        }
        body.set('royal_todobundle_item[title]', this.title);
        body.set('royal_todobundle_item[content]', this.content);
        body.set('royal_todobundle_item[status]', this.status.toString());

        // body.set('royal_todobundle_item[_token]', ConfigService.get('0').token);

        return body.toString();
    }
}
