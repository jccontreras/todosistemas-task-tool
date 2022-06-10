import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './commons/module/shared.module';
import { MainScreenComponent } from './components/main/main-screen.component';
import { TaskListComponent } from './components/task/list/task-list.component';
import { CreateUpdateTaskComponent } from './components/task/create-edit/create-update-task.component';
import { UserInfoComponent } from './components/task/user-info/user-info.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { CreateUpdateUserComponent } from './components/user/create-update/create-update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    TaskListComponent,
    CreateUpdateTaskComponent,
    UserInfoComponent,
    UserListComponent,
    CreateUpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
