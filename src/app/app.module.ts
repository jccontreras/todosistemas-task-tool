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

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    TaskListComponent,
    CreateUpdateTaskComponent
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
