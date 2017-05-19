export class TodoItem {
    public static STATUS_ACTIVE = 4;
    public static STATUS_POSTPONED = 3;
    public static STATUS_DONE = 2;
    public static STATUS_DELETED = 1;

    public id:number;
    public title:string;
    public content:string;
    public status:number;
    public userId:number;
    public createdAt:number;
    public updatedAt:number;

    public constructor (
        id:number,
        title:string,
        content:string,
        status:number,
        userId:number,
        createdAt:number,
        updatedAt:number
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.status = status;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getStatusClass():string {
        switch (this.status) {
            case TodoItem.STATUS_ACTIVE:
                return "r-item-active";
            case TodoItem.STATUS_POSTPONED:
                return "r-item-postponed";
            case TodoItem.STATUS_DONE:
                return "r-item-done";
        }

        return "";
    }

    public isActive():boolean {
        return this.status == TodoItem.STATUS_ACTIVE;
    }

    public isPostponed():boolean {
        return this.status == TodoItem.STATUS_POSTPONED;
    }

    public isDone():boolean {
        return this.status == TodoItem.STATUS_DONE;
    }

    public isDeleted():boolean {
        return this.status == TodoItem.STATUS_DELETED;
    }
}
