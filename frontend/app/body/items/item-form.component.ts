import {Component, Input} from 'angular2/core';
import {Headers, Http} from "angular2/http";
import {TodoItemService} from "../../services/todo-item.service";
import {ConfigService} from "../../services/config.service";
import {PreloaderComponent} from "../preloader.component";

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

        // TODO: add validation.
        return true;
    }

    protected submitFormEdit():void {
        // TODO: AJAX-submit.
    }

    protected submitFormCreate():void {
        let url = TodoItemService.ITEMS_URL + "new";
        let body = JSON.stringify(this.getFormBody());
        let head = new Headers({
            'Content-Type': 'application/json'
        });

        console.log(body);
        ItemFormComponent.ajaxAllowed = false;
        this.preloder.show();

        this.http.post(url, body, head)
            .map(res => res.json())
            .subscribe(
                success => (function (success, preloder) {

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

    protected getFormBody():Object {
        let body = {
            "royal_todobundle_item[id]": this.id,
            "royal_todobundle_item[title]": this.title,
            "royal_todobundle_item[content]": this.content,
            // status: this.status,
            "royal_todobundle_item[_token]": ConfigService.get('0').token
        };

        return body;
    }
}
