import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/commons/model/Task';
import { IUser } from 'src/app/commons/model/User';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.scss']
})
export class CreateUpdateTaskComponent implements OnInit {

  public title = "Create Task";
  public buttonLabel = "Create";
  public usersList: IUser[] = [];
  
  constructor(private _service: TaskService,
    public dialogRef: MatDialogRef<CreateUpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
  ) { }

  ngOnInit(): void {
    if (this.data.id != undefined) {
      this.title = "Edit Task";
      this.buttonLabel = "Update";
    }
    this._getUserList();
  }

  private _getUserList() {
    this._service.getUserList();
    this._service.userList.subscribe((resp) => {
      if (resp) {
        this.usersList = resp;
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  OnSubmitClick() {
    console.log(this.data.name,'data')
  }
}