import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WorklogService } from "../services/worklog.service";
import { EmployeeService } from "../services/employee.service";
import { TaskService } from "../services/task.service";
import { WorklogRequest } from "./worklog-model";

@Component({
  selector: "app-worklog",
  templateUrl: "./worklog.component.html",
  styleUrls: ["../app.component.scss"]
})
export class WorklogComponent implements OnInit {
  worklogs: any;
  employees: any;
  employeeName: string;
  week: number;
  employeeId: number;
  show: boolean;
  worklogRequest: WorklogRequest;
  tasks: any = [];
  startDate: Date;
  endDate: Date;
  worklogRequests: any = [];

  constructor(
    private worklogService: WorklogService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get("employeeId"));
      this.week = parseInt(params.get("week"), 10);
    });

    this.loadEmployee(this.employeeId);

    this.employeeService.getallemployees().subscribe(data => {
      this.employees = data;
      this.employeeName = this.employees.filter(o => {
        return o.id == this.employeeId;
      })[0].name;
    });

    this.taskService.getalltasks().subscribe(data => {
      this.tasks = data;
    });
  }

  weekNavigate(val) {
    this.week = this.week + val;
    this.loadEmployee(this.employeeId);
  }

  loadEmployee(employeeId) {
    this.worklogService
      .getemployeeworklog(employeeId, this.week)
      .subscribe(data => {
        this.worklogs = data;
        this.employeeId = employeeId;

        let d = this.dateFromWeekNumber(new Date().getFullYear(), this.week);

        this.startDate = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate() - 1
        );

        this.endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 5);
      });
    this.router.navigate(["/worklog/" + employeeId + "/" + this.week]);
  }

  logWork() {
    this.show = true;
    this.worklogRequest = new WorklogRequest();
    this.worklogRequest.employeeId = this.employeeId;
  }

  dateFromWeekNumber(year, week) {
    var d = new Date(year, 0, 1);
    var dayNum = d.getDay();
    var diff = --week * 7;

    // If 1 Jan is Friday to Sunday, go to next week
    if (!dayNum || dayNum > 4) {
      diff += 7;
    }

    // Add required number of days
    d.setDate(d.getDate() - d.getDay() + ++diff);
    return d;
  }

  addWorklogItem() {
    this.worklogRequests.push(this.worklogRequest);
    this.worklogRequest = new WorklogRequest();
    this.show = false;
  }

  submitWorkLogs() {
    this.addWorklogItem(); //Can be used to store objects locally and perform bulk save operatin in database.

    this.worklogService
      .submitWorkLogs(this.worklogRequests)
      .subscribe(result => {
        this.loadEmployee(this.employeeId);
      });
    this.worklogRequests = [];
  }
}
