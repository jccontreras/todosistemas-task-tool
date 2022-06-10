import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/commons/model/User';
import { ApiUsersService } from 'src/app/commons/service/api-users/api-users.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersList: BehaviorSubject<IUser[]>;
  
  constructor(private _apiUserService: ApiUsersService) { 
    this._usersList = new BehaviorSubject<IUser[]>([]);
  }

  get userList() {
    return this._usersList;
  }

  public getUserList(): Promise<void> {
    return new Promise((resolve) => {
      this._apiUserService.getList().subscribe((resp) => {
        this.userList.next(resp);
        resolve();
      });
    });
  }

  public createUser(user: IUser) {
    this._apiUserService.create(user).subscribe({
      next: (resp) => {
        this.getUserList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public updateUser(user: IUser) {
    this._apiUserService.update(user).subscribe({
      next: (resp) => {
        this.getUserList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
