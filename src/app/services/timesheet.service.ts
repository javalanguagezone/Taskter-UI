import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TimesheetService {
  constructor(private http: HttpClient) { }

  getTasks(year: number, month: number, day: number) {
    return this.http.get<ProjectTaskEntry[]>(`/api/users/current/entries/${year}/${month}/${day}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
    }
  getProjectsForCurrentUser() {
    return this.http.get<UserProject[]>('/api/users/current/projects').pipe(catchError(this.handleError));
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
  projectTask: string;
  durationInMin: number;
  note: string;
}

export interface Task {
  taskID: number;
  name: string;
  billable: boolean;
}
export interface UserProject {
  projectID: number;
  projectName: string;
  clientName: string;
  projectCode: string;
  tasks: Task[];
}
