import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent }      from './employee/employee.component';
import { WorklogComponent }      from './worklog/worklog.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'worklog/:employeeId/:week', component: WorklogComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}