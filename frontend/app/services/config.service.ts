import { Injectable } from 'angular2/core';

@Injectable()

export class ConfigService {
    public token:string;


    protected static config:Array<string, ConfigService> = [];

    public static get(key:string):ConfigService {
        if (ConfigService.config[key] === undefined) {
            ConfigService.config[key] = new ConfigService();
        }

        return ConfigService.config[key];
    }
}