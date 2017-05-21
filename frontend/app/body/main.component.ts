import {Component} from 'angular2/core';
import {GroupListComponent} from './items/group-list.component';

@Component({
    selector: 'main',
    templateUrl: 'src/templates/body/main.html',
    directives: [
        GroupListComponent,
    ],
})

export class MainComponent { }
