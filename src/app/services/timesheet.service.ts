import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private timesheetUrl='Taskter-UIsrc/app/time-sheet/timesheets.json'
  constructor(private http:HttpClient) { }

  
}

export interface ITimeSheet {
  client: string;
  projectName: string;
  projectCode: string;
  tasks:string [];
  
}