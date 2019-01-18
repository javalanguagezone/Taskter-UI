import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryDialogueService {

  constructor(private http: HttpClient) { }

  addTimeEntry(newEntry: NewEntry) {
    return this.http.post<NewEntry>('/api/entries', newEntry)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProjectsForCurrentUser() {
    return this.http.get<UserProject[]>('/api/users/current/projects').pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');

  }
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
export interface NewEntry {
  userId: number;
  projectTaskId: number;
  durationInMin: number;
  note: string;
  day: number;
  month: number;
  year: number;
}


