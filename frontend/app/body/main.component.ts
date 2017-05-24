import {Component} from 'angular2/core';
import {GroupListComponent} from './items/group-list.component';
import {PreloaderComponent} from "./preloader.component";

@Component({
    selector: 'main',
    templateUrl: 'src/templates/body/main.html',
    directives: [
        GroupListComponent,
        PreloaderComponent,
    ],
})

export class MainComponent { }
