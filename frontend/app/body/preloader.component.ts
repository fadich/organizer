import { Component } from 'angular2/core';

@Component({
    selector: 'preloader',
    templateUrl: 'src/templates/body/preloader.html',
})

export class PreloaderComponent {
    public static shows:number = 0;

    public show() {
        PreloaderComponent.shows++;
    }

    public hide() {
        if (PreloaderComponent.shows > 0) {
            PreloaderComponent.shows--;
        }
    }

    public isHidden():boolean {
        return !PreloaderComponent.shows;
    }
}
