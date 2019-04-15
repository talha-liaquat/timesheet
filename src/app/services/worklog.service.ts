import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WorklogService {
    private baseapi = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getemployeeworklog(employeeId,week) {
      return this.http.get(this.baseapi + "/worklog/"+employeeId+"/"+week);
    }

    submitWorkLogs(worklogs){
      return this.http.post(this.baseapi + "/worklog/add", JSON.stringify(worklogs), {
        headers: new HttpHeaders({
            'Content-Type' : 'application/json'
        })
    });
    }    
}