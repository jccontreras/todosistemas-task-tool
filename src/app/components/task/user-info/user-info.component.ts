import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/commons/model/User';
import { ApiUsersService } from 'src/app/commons/service/api-users/api-users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public user: IUser = {};
  constructor(
    public dialogRef: MatDialogRef<UserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private _apiUserService: ApiUsersService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo() {
    if (this.data.id != undefined) {
      this._apiUserService.get(this.data.id).subscribe((resp) => {
        this.user = resp;
      })
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
