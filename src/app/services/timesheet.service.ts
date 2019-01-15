import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TimesheetService {

  /* private tasks: ProjectTaskEntry[] = [{
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

}]; */

  constructor(private http: HttpClient) { }

  getTasks(day: number, month: number, year: number) {
    return this.http.get<ProjectTaskEntry>('/api/users/current/entries/' + year + '/' + month + '/' + day)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );

  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');

  }
}

export interface ProjectTaskEntry {
  clientName: string;
  projectName: string;
  projectCode: string;
  projectTask: string ;
  durationInMin: number;
  note: string;
}
