export class Application {
    public id:number;
    public title:string;
    public url:string;

    public constructor (id:number, title:string, url:string) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}