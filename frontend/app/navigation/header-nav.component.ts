import {Component} from 'angular2/core';
import { MoreAppsService } from './more-apps.service';

@Component({
    selector: 'header',
    templateUrl: 'src/templates/navigation/header-nav.html',
    providers: [
        MoreAppsService
    ]
})

export class HeaderNavComponent {
    public moreApps:MoreAppsService;

    constructor () {
        this.moreApps = new MoreAppsService();
    }
}