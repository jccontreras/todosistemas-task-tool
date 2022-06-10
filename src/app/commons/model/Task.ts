export interface ITask {
    id?: number;
    name?: string;
    description?: string;
    state?: string;
    employee?: number;
    creationDate?: Date;
    toDoDate?: Date;
}