import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { WorklogService } from './services/worklog.service';
import { TaskService } from './services/task.service';

import { WorklogComponent } from './worklog/worklog.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    WorklogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    EmployeeService,
    WorklogService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
