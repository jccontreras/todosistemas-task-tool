import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from 'src/app/commons/model/Task';
import { IUser } from 'src/app/commons/model/User';
import { ApiTaksService } from 'src/app/commons/service/api-tasks/api-taks.service';
import { ApiUsersService } from 'src/app/commons/service/api-users/api-users.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasksList: BehaviorSubject<ITask[]>;
  private _usersList: BehaviorSubject<IUser[]>;

  constructor(private _apiTaskService: ApiTaksService, private _apiUserService: ApiUsersService) {
    this._tasksList = new BehaviorSubject<ITask[]>([]);
    this._usersList = new BehaviorSubject<IUser[]>([]);
  }

  get tasksList() {
    return this._tasksList;
  }

  get userList() {
    return this._usersList;
  }

  public getTasksList(): Promise<void> {
    return new Promise((resolve) => {
      this._apiTaskService.getList().subscribe((resp) => {
        this.tasksList.next(resp);
        resolve();
      });
    });
  }

  public getUserList(): Promise<void> {
    return new Promise((resolve) => {
      this._apiUserService.getList().subscribe((resp) => {
        this.userList.next(resp);
        resolve();
      });
    });
  }

  public createTask(task: ITask) {
    this._apiTaskService.create(task).subscribe({
      next: (resp) => {
        this.getTasksList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public updateTask(task: ITask) {
    this._apiTaskService.update(task).subscribe({
      next: (resp) => {
        this.getTasksList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}