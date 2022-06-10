import { DataRowOutlet } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from 'src/app/commons/model/Task';
import { CreateUpdateTaskComponent } from '../create-edit/create-update-task.component';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  private _tasksList: ITask[] = [];
  private _task: ITask={};
  displayedColumns: string[] = ['id', 'name', 'description', 'state', 'creationDate', 'toDoDate', 'delay', 'user', 'actions'];
  dataSource = new MatTableDataSource<ITask>(this._tasksList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("table") table!: MatTableDataSource<ITask>;

  constructor(private _service: TaskService,
    public dialog: MatDialog) {
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

  public getDelayStyle(delay: number) {
    var style = "";
    if (delay > 0) {
      style = "color: red;"
    }
    return style
  }

  deleteTask(element: ITask) {
    if (element.id != undefined) {
      this._service.deleteTask(element.id);
      console.log("entro al if")
      this._getTaskList();
    }
  }

  editTask(element: ITask) {
    console.log(element,'element')
    this._task = element;
    this.openCreateUpdateDialog();
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
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}