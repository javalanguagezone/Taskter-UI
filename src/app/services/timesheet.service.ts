import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private tasks: ITask[] = [{
    client: 'Tacta',
    projectName: 'Taskter - Time tracking' ,
    projectCode: 'TASKTER-TIME',
    task: 'Design',
    minutes: 60,
    note: 'Lorem ipsum dolor sit amet'
},
{
  client: 'Tacta',
  projectName: 'Taskter - Time tracking' ,
  projectCode: 'TASKTER-TIME',
  task: 'Programming',
  minutes: 30,
  note: 'Lorem ipsum dolor sit amet'
},
{
  client: 'Tacta',
  projectName: 'Taskter - Time tracking' ,
  projectCode: 'TASKTER-TIME',
  task: 'Analaysis',
  minutes: 70,
  note: 'Lorem ipsum dolor sit amet'

}];
  constructor(private http: HttpClient) { }
  getTasks() {
    return this.tasks;
  }
}



export interface ITask {
  client: string;
  projectName: string;
  projectCode: string;
  task: string ;
  minutes: number;
  note: string;
}
