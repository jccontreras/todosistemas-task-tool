import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
  ) { }

  public taskForm: FormGroup = this._formBuilder.group({
    id: [],
    name: ['',Validators.required],
    description: ['',Validators.required],
    employee: ['', Validators.required],
    toDoDate:['', [Validators.required, Validators.pattern(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/)]],
    state: ['C']
  });

  ngOnInit(): void {
    if (this.data.id != undefined) {
      this.title = "Edit Task";
      this.buttonLabel = "Update";
      this.taskForm.patchValue({...this.data});
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
    this.taskForm.reset();
    this.dialogRef.close();
  }

  OnSubmitClick() {
    if (this.buttonLabel == "Create") {
      this._service.createTask(this.taskForm.value);
    } else {
      this._service.updateTask(this.taskForm.value);
    }
    
    console.log(this.taskForm.value,'data')
  }
}