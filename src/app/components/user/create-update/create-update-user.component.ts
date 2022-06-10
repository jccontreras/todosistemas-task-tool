import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/commons/model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {

  public title = "Create Task";
  public buttonLabel = "Create";
  public usersList: IUser[] = []; 
  
  constructor(private _service: UserService,
    public dialogRef: MatDialogRef<CreateUpdateUserComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) { }

  public userForm: FormGroup = this._formBuilder.group({
    id: [],
    name: ['',Validators.required],
    dni: ['',Validators.required],
    contactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email:['', [Validators.required, Validators.email]],
    employeeId: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.data.id != undefined) {
      this.title = "Edit Task";
      this.buttonLabel = "Update";
      this.userForm.patchValue({...this.data});
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
    this.userForm.reset();
    this.dialogRef.close();
  }

  OnSubmitClick() {
    if (this.buttonLabel == "Create") {
      this._service.createUser(this.userForm.value);
    } else {
     this._service.updateUser(this.userForm.value);
    }
    
    console.log(this.userForm.value,'data')
  }

}
