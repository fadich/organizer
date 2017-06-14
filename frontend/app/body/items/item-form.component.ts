import {Component, Input} from 'angular2/core';

@Component({
    selector: '.r-item-form',
    templateUrl: 'src/templates/body/items/item-form.html',
})

export class ItemFormComponent {
    @Input() id:number = 0;
    @Input() title:string = '';
    @Input() content:string = '';

    protected hidden = true;

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

        return true;
    }

    protected submitFormEdit():void {
        // TODO: AJAX-submit.
    }

    protected submitFormCreate():void {
        // TODO: AJAX-submit.
    }
}
