import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from 'src/app/commons/model/Task';
import { IUser } from 'src/app/commons/model/User';
import { ApiUsersService } from 'src/app/commons/service/api-users/api-users.service';
import { TaskService } from '../../task/service/task.service';
import { CreateUpdateUserComponent } from '../create-update/create-update-user.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private _usersList: IUser[] = [];
  private _tasksList: ITask[] = [];
  private _user: IUser = {};
  displayedColumns: string[] = ['id', 'employeeId', 'name', 'dni', 'contactNumber', 'email', 'actions'];
  dataSource = new MatTableDataSource<IUser>(this._usersList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _service: UserService,
    private _taskService: TaskService,
    public dialog: MatDialog,
    private _apiUserService: ApiUsersService) { }

  ngOnInit(): void {
    this._getUserList();
    this._getTaskList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private _getTaskList() {
    this._taskService.getTasksList();
    this._taskService.tasksList.subscribe((resp) => {
      if (resp) {
        this._tasksList = resp;
      }
    });
  }

  private _getUserList() {
    this._service.getUserList();
    this._service.userList.subscribe((resp) => {
      if (resp) {
        this._usersList = resp;
        this._fillDataSource();
      }
    });
  }

  deleteUser(element: IUser) {
    if (element.id != undefined) {
      this._apiUserService.delete(element.id).subscribe({
        next: (resp) => {
          this._service.getUserList();
        }
      });
    }
  }

  editUser(element: IUser) {
    this._user = element;
    this.openCreateUpdateDialog();
  }

  private _fillDataSource() {
    this.dataSource.data = this._usersList;
    this.dataSource.paginator = this.paginator;
  }

  public openCreateUpdateDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent, {
      width: '600px',
      data: this._user,
    });
    dialogRef.afterClosed().subscribe(result => {
      this._user = {};
      this._service.getUserList();
    });
  }

  public userHasTask(employee: IUser) {
    let userTasks = this._tasksList.filter((task) => task.employee == employee.id && task.state != 'D');
    if (userTasks.length > 0) {
      return true;
    }
    return false;
  }
}
