import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimesheetService {

  private tasks: ProjectTaskEntry[] = [{
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

  constructor() { }

  getTasks() {
    return from<ProjectTaskEntry>(this.tasks);
  }
}

export interface ProjectTaskEntry {
  client: string;
  projectName: string;
  projectCode: string;
  task: string ;
  minutes: number;
  note: string;
}
