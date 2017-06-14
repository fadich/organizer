import { Injectable } from 'angular2/core';
import { Application } from '../entities/application';

@Injectable()

export class MoreAppsService {
    protected apps:Application[] = [];

    public getApplications():Application[] {
        if (!this.apps.length) {
            let apps = MoreAppsService.requestApps();
            for (let app of apps) {
                this.apps.push(new Application(app['id'], app['title'], app['url']))
            }
        }

        return this.apps;
    }

    protected static requestApps():Array<any> {
        return [
            {
                id: 1,
                title: "Some app",
                url: "#",
            },
            {
                id: 2,
                title: "Some app 2",
                url: "#",
            },
            {
                id: 3,
                title: "Other",
                url: "#",
            },
            {
                id: 4,
                title: "Application having long title text",
                url: "#",
            },
        ];
    }
}