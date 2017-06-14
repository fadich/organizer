import {Component, Input} from 'angular2/core';

@Component({
    selector: '.r-item-form',
    templateUrl: 'src/templates/body/items/item-form.html',
})

export class ItemFormComponent {
    @Input() title:string = '';
    @Input() content:string = '';

    protected hidden = true;

    public submitButton():void {
        if (this.isHidden()) {
            this.hidden = false;
            return;
        }

        // TODO: Submit form.
    }

    public isHidden():boolean {
        return this.hidden;
    }

    public hideForm():void {
        this.hidden = true;
    }
}
