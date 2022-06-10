import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from 'src/app/commons/model/Task';
import { ApiTaksService } from 'src/app/commons/service/api-tasks/api-taks.service';
import { CreateUpdateTaskComponent } from '../create-edit/create-update-task.component';
import { TaskService } from '../service/task.service';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  private _tasksList: ITask[] = [];
  private _task: ITask = {};
  displayedColumns: string[] = ['id', 'name', 'description', 'state', 'creationDate', 'toDoDate', 'delay', 'user', 'actions'];
  dataSource = new MatTableDataSource<ITask>(this._tasksList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _service: TaskService,
    public dialog: MatDialog,
    private _apiTaskService: ApiTaksService) {
  }

  ngOnInit(): void {
    this._getTaskList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private _getTaskList() {
    this._service.getTasksList();
    this._service.tasksList.subscribe((resp) => {
      if (resp) {
        this._tasksList = resp;
        this._fillDataSource();
      }
    });
  }

  public getState(state: string) {
    var stateDesc = "";
    switch (state) {
      case "C":
        stateDesc = "Created"
        break;
      case "P":
        stateDesc = "In Progress"
        break;
      case "D":
        stateDesc = "Done"
        break;
    }
    return stateDesc;
  }

  public getStateStyle(state: string) {
    var style = "";
    switch (state) {
      case "C":
        style = "color: blue;"
        break;
      case "P":
        style = "color: orangered;"
        break;
      case "D":
        style = "color: green;"
        break;
    }
    return style
  }

  public getDelayDays(element: ITask) {
    if (element.state != "D") {
      let actualDate = new Date();
      let array = element.toDoDate?.toString().split('-');
      let toDoDate;
      if (array != undefined) {
        toDoDate = new Date(Number(array[0]), Number(array[1]) - 1, Number(array[2]));
      }
      let miliseg = 24 * 60 * 60 * 1000;
      let milsegtrans;
      let daysTrans;
      if (toDoDate != undefined) {
        milsegtrans = Math.abs(actualDate.getTime() - toDoDate.getTime());
        daysTrans = Math.round(milsegtrans / miliseg);
        if (toDoDate.getTime() > actualDate.getTime()) {
          return 0;
        }
      }
      return daysTrans;
    }
    return 0;
  }

  deleteTask(element: ITask) {
    if (element.id != undefined) {
      this._apiTaskService.delete(element.id).subscribe({
        next: (resp) => {
          this._service.getTasksList();
        }
      });
    }
  }

  editTask(element: ITask) {
    this._task = element;
    this.openCreateUpdateDialog();
  }

  nextTaskStep(element: ITask) {
    switch (element.state) {
      case "C":
        element.state = "P";
        this._service.updateTask(element);
        break;
      case "P":
        element.state = "D";
        this._service.updateTask(element);
        break;
    }
  }

  userTask() {

  }

  private _fillDataSource() {
    this.dataSource.data = this._tasksList;
    this.dataSource.paginator = this.paginator;
  }

  public openCreateUpdateDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateTaskComponent, {
      width: '600px',
      data: this._task,
    });
    dialogRef.afterClosed().subscribe(result => {
      this._task = {};
      this._service.getTasksList();
    });
  }

  public openUserInfoDialog(element: ITask): void {
    const dialogRef = this.dialog.open(UserInfoComponent, {
      width: '500px',
      data: {id: element.employee},
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}